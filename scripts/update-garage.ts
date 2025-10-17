/**
 * scripts/update-garage.ts
 *
 * Auto-populate parts of /app/<slug>/garage.json from a live site (best-effort).
 *
 * Usage:
 *   npx ts-node scripts/update-garage.ts --slug <slug> --url https://example.com [--apply] [--verbose]
 *
 * Behavior:
 * - Reads existing /app/<slug>/garage.json as baseline.
 * - Fetches --url (undici), parses HTML with cheerio.
 * - Extracts: name, phone, email, address lines/town/postcode, openingHours.
 * - Optionally fills content.heroHeadline, content.heroSub, content.aboutBlurb when obvious.
 * - Geocodes via OpenStreetMap Nominatim (1s delay, polite UA) if geo.lat/lng are 0 and we have a postcode or full address.
 * - Merge strategy: only overwrite when fetched value is non-empty and different. Never touch brand, stripe, or pricing.
 * - Default (dry run): colorized diff (before -> after) + changed keys summary. No write.
 * - With --apply: writes backup app/<slug>/garage.json.bak.<timestamp>, then saves pretty JSON, prints a success message.
 */

import fs from "fs/promises";
import path from "path";
import process from "process";
import { setTimeout as delay } from "timers/promises";
import { fetch } from "undici";
import cheerio from "cheerio";

type OpeningHours = { mon?: string; tue?: string; wed?: string; thu?: string; fri?: string; sat?: string; sun?: string };

type GarageJson = any; // Use runtime checks; we avoid changing schema here

function parseArgs(argv: string[]) {
  const out: { slug?: string; url?: string; apply?: boolean; verbose?: boolean } = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--apply") out.apply = true;
    else if (a === "--verbose") out.verbose = true;
    else if (a === "--slug") out.slug = argv[++i];
    else if (a === "--url") out.url = argv[++i];
  }
  return out;
}

const color = {
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
};

function safeJsonParse(text: string) {
  try { return JSON.parse(text); } catch { return null; }
}

function firstNonEmpty(...vals: Array<string | undefined | null>): string {
  for (const v of vals) {
    const s = (v ?? "").toString().trim();
    if (s) return s;
  }
  return "";
}

const UK_POSTCODE_RE = /\b[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}\b/i;
const EMAIL_RE = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
const PHONE_RE = /\+?\d[\d\s().-]{7,}/; // lenient; we prefer tel: when present

function dottedPaths(obj: any, prefix = ""): string[] {
  const out: string[] = [];
  if (!obj || typeof obj !== "object") return out;
  for (const k of Object.keys(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (obj[k] && typeof obj[k] === "object" && !Array.isArray(obj[k])) {
      out.push(...dottedPaths(obj[k], p));
    } else {
      out.push(p);
    }
  }
  return out;
}

function setAtPath(target: any, pathStr: string, value: any) {
  const parts = pathStr.split(".");
  let cur = target;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (typeof cur[key] !== "object" || cur[key] === null) cur[key] = {};
    cur = cur[key];
  }
  cur[parts[parts.length - 1]] = value;
}

function getAtPath(target: any, pathStr: string): any {
  const parts = pathStr.split(".");
  let cur = target;
  for (const key of parts) {
    if (cur == null) return undefined;
    cur = cur[key];
  }
  return cur;
}

function diffObject(before: any, after: any): Array<{ path: string; before: any; after: any }> {
  const keys = new Set([...dottedPaths(before), ...dottedPaths(after)]);
  const changes: Array<{ path: string; before: any; after: any }> = [];
  for (const k of keys) {
    const b = getAtPath(before, k);
    const a = getAtPath(after, k);
    const bNorm = typeof b === "string" ? b.trim() : b;
    const aNorm = typeof a === "string" ? a.trim() : a;
    if (JSON.stringify(bNorm) !== JSON.stringify(aNorm)) {
      changes.push({ path: k, before: b, after: a });
    }
  }
  return changes;
}

async function geocodeIfNeeded(base: any, addrText: string, verbose = false) {
  try {
    const lat = Number(base?.geo?.lat ?? 0);
    const lng = Number(base?.geo?.lng ?? 0);
    const haveCoords = !!lat && !!lng;
    if (haveCoords) return {};
    if (!addrText.trim()) return {};
    if (verbose) console.log(color.cyan("[geo] waiting 1s before Nominatim request..."));
    await delay(1000);
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addrText)}&format=json&addressdetails=1&limit=1`;
    const res = await fetch(url, { headers: { "User-Agent": "torquesites-populator/1.0 (contact: you@example.com)" } });
    if (!res.ok) return {};
    const arr = await res.json() as any[];
    const first = Array.isArray(arr) ? arr[0] : undefined;
    if (!first) return {};
    const out = {
      geo: {
        lat: Number(first.lat) || 0,
        lng: Number(first.lon) || 0,
      },
    };
    return out;
  } catch {
    return {};
  }
}

function extractFromJsonLd($: cheerio.CheerioAPI) {
  const out: any = {};
  const scripts = $('script[type="application/ld+json"]').toArray();
  for (const s of scripts) {
    const text = $(s).contents().text();
    const data = safeJsonParse(text);
    const nodes = Array.isArray(data) ? data : data ? [data] : [];
    for (const node of nodes) {
      if (!node || typeof node !== "object") continue;
      const type = (node["@type"] || node["type"]) as string | string[] | undefined;
      const types = Array.isArray(type) ? type : type ? [type] : [];
      if (types.includes("LocalBusiness") || types.includes("AutomotiveBusiness") || types.includes("AutoRepair")) {
        if (node.name && typeof node.name === "string") out.name = node.name;
        if (node.telephone && typeof node.telephone === "string") out.phone = node.telephone;
        if (node.email && typeof node.email === "string") out.email = node.email;
        const addr = node.address;
        if (addr && typeof addr === "object") {
          out.addressLine1 = firstNonEmpty(addr.streetAddress, addr["street-address"]);
          out.town = firstNonEmpty(addr.addressLocality, addr["address-locality"], addr.addressRegion);
          out.postcode = firstNonEmpty(addr.postalCode, addr["postal-code"]);
        }
        const oh = node.openingHoursSpecification;
        if (Array.isArray(oh)) {
          const hours: OpeningHours = {};
          for (const spec of oh) {
            const days = spec.dayOfWeek;
            const open = spec.opens;
            const close = spec.closes;
            if (!open || !close) continue;
            const value = `${open}-${close}`;
            const apply = (d: string) => {
              const key = d.slice(0, 3).toLowerCase() as keyof OpeningHours;
              (hours as any)[key] = value;
            };
            const dayArr = Array.isArray(days) ? days : days ? [days] : [];
            for (const d of dayArr) {
              if (typeof d === "string") apply(d);
              else if (typeof d === "object" && typeof d["@id"] === "string") apply(String(d["@id"]).split("/").pop() || "");
            }
          }
          if (Object.keys(hours).length) out.openingHours = hours;
        }
      }
    }
  }
  return out;
}

function extractFromDom($: cheerio.CheerioAPI) {
  const out: any = {};
  const title = ($("title").first().text() || "").trim();
  const ogSiteName = ( $('meta[property="og:site_name"]').attr("content") || "" ).trim();
  const siteTitle = ($(".site-title").first().text() || "").trim();
  out.name = firstNonEmpty(title, ogSiteName, siteTitle);

  const telHref = $('a[href^="tel:"]').first().attr("href");
  if (telHref) out.phone = telHref.replace(/^tel:/, "").trim();
  if (!out.phone) {
    const text = $("body").text();
    const m = text.match(PHONE_RE);
    if (m) out.phone = m[0].trim();
  }

  const mailHref = $('a[href^="mailto:"]').first().attr("href");
  if (mailHref) out.email = mailHref.replace(/^mailto:/, "").trim();
  if (!out.email) {
    const text = $("body").text();
    const m = text.match(EMAIL_RE);
    if (m) out.email = m[0].trim();
  }

  const bodyText = $("body").text();
  const pc = bodyText.match(UK_POSTCODE_RE);
  if (pc) out.postcode = pc[0].toUpperCase();

  // Heuristic address blocks
  const candidates = ["address", ".address", ".contact-address", ".footer-address", "[itemprop='address']"];
  for (const sel of candidates) {
    const t = $(sel).first().text().replace(/\s+/g, " ").trim();
    if (t && (!out.addressLine1 || !out.town)) {
      const parts = t.split(",").map((s) => s.trim()).filter(Boolean);
      out.addressLine1 = out.addressLine1 || parts[0];
      out.town = out.town || parts[1];
    }
  }

  // opening hours visible table/list heuristic
  const hours: OpeningHours = {};
  $("table, ul, ol").each((_i, el) => {
    const text = $(el).text();
    ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].forEach((d) => {
      const re = new RegExp(`${d}[^\n\r]*?([0-2]?[0-9]:[0-5][0-9]).*?([0-2]?[0-9]:[0-5][0-9])`, "i");
      const m = text.match(re);
      if (m) (hours as any)[d.slice(0,3).toLowerCase()] = `${m[1]}-${m[2]}`;
    });
  });
  if (Object.keys(hours).length) out.openingHours = hours;

  // Content snippets (best-effort, keep empty if not obvious)
  const h1 = $("h1").first().text().trim();
  if (h1 && h1.length <= 120) out.content = { ...(out.content||{}), heroHeadline: h1 };
  const metaDesc = $('meta[name="description"]').attr("content");
  const p = $("p").first().text().trim();
  const heroSub = firstNonEmpty(metaDesc, p);
  if (heroSub && heroSub.length <= 180) out.content = { ...(out.content||{}), heroSub };
  const about = $("section:contains('About') p").first().text().trim();
  if (about && about.length > 40) out.content = { ...(out.content||{}), aboutBlurb: about };

  return out;
}

function mergeBestEffort(base: GarageJson, fetched: any, verbose = false) {
  const out = JSON.parse(JSON.stringify(base));
  const changedKeys: string[] = [];

  function consider(pathStr: string, value: any) {
    if (value === undefined || value === null) return;
    const str = typeof value === "string" ? value.trim() : value;
    const isEmpty = (v: any) => v == null || (typeof v === "string" && v.trim() === "");
    if (isEmpty(str)) return;
    const current = getAtPath(out, pathStr);
    if (JSON.stringify(current) !== JSON.stringify(str)) {
      // Guardrails: do not change certain roots
      if (pathStr.startsWith("brand") || pathStr.startsWith("stripe") || pathStr.startsWith("pricing") || pathStr.startsWith("stripeLinks") ) {
        if (verbose) console.log(color.yellow(`[skip] ${pathStr}`));
        return;
      }
      setAtPath(out, pathStr, str);
      changedKeys.push(pathStr);
    }
  }

  consider("name", fetched.name);
  consider("contact.phone", fetched.phone);
  consider("contact.email", fetched.email);

  consider("addressLine1", fetched.addressLine1);
  consider("addressLine2", fetched.addressLine2);
  consider("town", fetched.town);
  consider("postcode", fetched.postcode);

  if (fetched.openingHours && typeof fetched.openingHours === "object") {
    for (const d of ["mon","tue","wed","thu","fri","sat","sun"]) {
      consider(`openingHours.${d}`, fetched.openingHours[d as keyof OpeningHours]);
    }
  }

  if (fetched.content && typeof fetched.content === "object") {
    consider("content.heroHeadline", fetched.content.heroHeadline);
    consider("content.heroSub", fetched.content.heroSub);
    consider("content.aboutBlurb", fetched.content.aboutBlurb);
  }

  // Geocode merge only if base has geo with zeros or missing
  if (fetched.geo && typeof fetched.geo === "object") {
    const baseLat = Number(getAtPath(out, "geo.lat") ?? 0);
    const baseLng = Number(getAtPath(out, "geo.lng") ?? 0);
    if (!(baseLat && baseLng)) {
      consider("geo.lat", fetched.geo.lat);
      consider("geo.lng", fetched.geo.lng);
    }
  }

  return { merged: out, changedKeys };
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.slug) {
    console.error(color.red("Error: --slug is required"));
    process.exit(1);
  }
  if (!args.url) {
    console.error(color.red("Error: --url is required"));
    process.exit(1);
  }

  const repoRoot = process.cwd();
  const jsonPath = path.join(repoRoot, "app", args.slug, "garage.json");
  try {
    await fs.stat(jsonPath);
  } catch {
    console.error(color.red(`Error: garage.json not found for slug '${args.slug}' at ${jsonPath}`));
    process.exit(1);
  }

  const raw = await fs.readFile(jsonPath, "utf8");
  const base = safeJsonParse(raw) || {};

  if (args.verbose) console.log(color.cyan(`[fetch] GET ${args.url}`));
  let html = "";
  try {
    const res = await fetch(args.url, { headers: { "User-Agent": "torquesites-populator/1.0 (contact: you@example.com)" } });
    html = await res.text();
  } catch (e) {
    console.warn(color.yellow(`[warn] fetch failed: ${(e as Error).message}`));
  }

  const $ = cheerio.load(html || "");
  const fromJsonLd = extractFromJsonLd($);
  const fromDom = extractFromDom($);
  const combined: any = { ...fromJsonLd, ...fromDom };

  // Build address string for geocoding
  const addrParts = [combined.addressLine1, combined.town, combined.postcode].filter(Boolean).join(", ");
  const geo = await geocodeIfNeeded(base, addrParts || combined.postcode || "", !!args.verbose);
  Object.assign(combined, geo);

  const { merged, changedKeys } = mergeBestEffort(base, combined, !!args.verbose);

  const changes = diffObject(base, merged).filter(c => changedKeys.includes(c.path));
  if (!args.apply) {
    if (changes.length === 0) {
      console.log(color.green("No changes. Baseline already up to date."));
      return;
    }
    console.log(color.cyan("Proposed changes (dry run):"));
    for (const c of changes) {
      const before = typeof c.before === "string" ? JSON.stringify(c.before) : JSON.stringify(c.before);
      const after = typeof c.after === "string" ? JSON.stringify(c.after) : JSON.stringify(c.after);
      console.log(`  ${c.path}: ${color.red(before)} ${color.yellow("->")} ${color.green(after)}`);
    }
    console.log(color.cyan("Changed keys:"), changedKeys.join(", "));
    return;
  }

  // Apply mode
  const backupPath = `${jsonPath}.bak.${Date.now()}`;
  await fs.copyFile(jsonPath, backupPath);
  await fs.writeFile(jsonPath, JSON.stringify(merged, null, 2) + "\n", "utf8");
  console.log(color.green(`Wrote ${path.relative(repoRoot, jsonPath)} (backup created)`));
}

main().catch((e) => {
  console.error(color.red((e as Error).stack || (e as Error).message));
  process.exit(1);
});


