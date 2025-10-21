import 'server-only'
import fs from "fs";
import path from "path";

// ---------- Types ----------

export type Brand = { primary?: string; dark?: string };
export type Contact = { phone?: string; email?: string; whatsapp?: string; facebook?: string; instagram?: string; tiktok?: string };
export type Branch = { name?: string; address?: string; hours?: string; phone?: string };
export type Service = { icon: string; title: string; description: string };
export type PricingEntry = {
  title: string;
  description?: string;
  tagline?: string;
  price: string;
  monthly?: string;
  launchTime?: string;
  features?: string[];
  cta?: {
    text: string;
    href: string;
  } | null;
  cta1?: {
    text: string;
    href: string;
  } | null;
};

export type Pricing = { mot?: string; interimFrom?: string; fullFrom?: string } | PricingEntry[];
export type StripeLinks = { starter?: string; buyout?: string };

export type Garage = {
  slug: string;
  name: string;
  tagline?: string;
  brand?: Brand;
  contact?: Contact;
  address?: string;
  hours?: string;
  openingHours?: Array<{
    day: string;
    hours: string;
    open: boolean;
  }>;
  hero?: {
    greeting?: boolean;
    background?: "solid" | "gradient";
    defaultVariant?: string;
    variants?: Array<{
      key: string;
      label: string;
      type: "solid" | "image";
      src?: string;
      alt?: string;
      headline?: string;
      sub?: string;
    }>;
  };
  chips?: string[];
  services?: Service[];
  pricing?: Pricing;
  branches?: Branch[];
  reviews?: { quote: string; author: string }[];
  logoPath?: string;
  stripeLinks?: StripeLinks;
  mapEmbed?: string;
  geo?: { lat?: number; lng?: number };
  theme?: {
    accent?: string;
    accent2?: string;
    primary?: string;
    secondary?: string;
    textOnPrimary?: 'light' | 'dark';
  };
  content?: {
    heroHeadline?: string;
    heroSub?: string;
    badges?: string[];
    aboutBlurb?: string;
    services?: string[];
    ctaPrimaryText?: string;
    ctaSecondaryText?: string;
    footerTagline?: string;
    reviews?: Array<{
      author: string;
      rating: number;
      text: string;
      date?: string;
      sourceUrl?: string;
    }>;
  };
};

// ---------- Helpers ----------

function isHexColor(v: unknown): boolean {
  return typeof v === "string" && /^#([0-9A-Fa-f]{3}){1,2}$/.test(v);
}

function normalizeStripe(value: string | undefined): string | undefined {
  if (!value) return value;
  const s = value.trim();
  if (!s) return undefined;
  return s.startsWith("stripe:") ? `https://buy.stripe.com/${s.slice(7)}` : s;
}

function overlay<T extends object>(base: T, add?: Partial<T> | null): T {
  if (!add) return base;
  const out: any = Array.isArray(base) ? [...(base as any)] : { ...base };
  for (const [k, v] of Object.entries(add)) {
    if (v === undefined || v === null) continue;
    if (typeof v === "string" && v.trim() === "") continue; // ignore empty strings in overlays
    if (Array.isArray(v)) {
      (out as any)[k] = v.length > 0 ? v : (out as any)[k];
    } else if (typeof v === "object") {
      (out as any)[k] = overlay((out as any)[k] ?? {}, v as any);
    } else {
      (out as any)[k] = v;
    }
  }
  return out;
}

function validateAndNormalize(input: any): Garage | null {
  if (!input || typeof input !== "object") return null;
  const slug = typeof input.slug === "string" ? input.slug.trim() : "";
  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!slug || !name) return null;

  const brand: Brand | undefined = input.brand && typeof input.brand === "object" ? {
    primary: isHexColor(input.brand.primary) ? input.brand.primary : input.brand?.primary ? "#1F4FC9" : undefined,
    dark: isHexColor(input.brand.dark) ? input.brand.dark : input.brand?.dark ? "#0B0B0C" : undefined,
  } : undefined;

  const contact: Contact | undefined = input.contact && typeof input.contact === "object" ? {
    phone: typeof input.contact.phone === "string" ? input.contact.phone : undefined,
    email: typeof input.contact.email === "string" ? input.contact.email : undefined,
    whatsapp: typeof input.contact.whatsapp === "string" ? input.contact.whatsapp : undefined,
  } : undefined;

  const stripeLinks: StripeLinks | undefined = input.stripeLinks && typeof input.stripeLinks === "object" ? {
    starter: normalizeStripe(input.stripeLinks.starter),
    buyout: normalizeStripe(input.stripeLinks.buyout),
  } : undefined;

  const mapEmbed = typeof input.mapEmbed === "string" ? input.mapEmbed : undefined;
  const logoPath = typeof input.logoPath === "string" ? input.logoPath : undefined;

  const hero = input.hero && typeof input.hero === "object" ? {
    greeting: typeof input.hero.greeting === "boolean" ? input.hero.greeting : undefined,
    background: input.hero.background === "gradient" || input.hero.background === "solid" ? input.hero.background : undefined,
    defaultVariant: typeof input.hero.defaultVariant === "string" ? input.hero.defaultVariant : undefined,
    variants: Array.isArray(input.hero.variants)
      ? input.hero.variants.filter(Boolean).map((v: any) => ({
          key: typeof v?.key === "string" ? v.key : "",
          label: typeof v?.label === "string" ? v.label : "",
          type: v?.type === "image" ? "image" : "solid",
          src: typeof v?.src === "string" ? v.src : undefined,
          alt: typeof v?.alt === "string" ? v.alt : undefined,
          headline: typeof v?.headline === "string" ? v.headline : undefined,
          sub: typeof v?.sub === "string" ? v.sub : undefined,
        })).filter((v: any) => v.key)
      : undefined,
  } : undefined;

  const geo = input.geo && typeof input.geo === "object" ? {
    lat: typeof input.geo.lat === "number" ? input.geo.lat : undefined,
    lng: typeof input.geo.lng === "number" ? input.geo.lng : undefined,
  } : undefined;

  return {
    slug,
    name,
    tagline: typeof input.tagline === "string" ? input.tagline : undefined,
    brand,
    contact,
    address: typeof input.address === "string" ? input.address : undefined,
    hours: typeof input.hours === "string" ? input.hours : undefined,
    openingHours: Array.isArray(input.openingHours)
      ? input.openingHours.filter((h: any) => h && typeof h === "object" && typeof h.day === "string" && typeof h.hours === "string" && typeof h.open === "boolean")
      : undefined,
    hero,
    chips: Array.isArray(input.chips) ? input.chips.filter((x: unknown) => typeof x === "string") : undefined,
    services: Array.isArray(input.services) 
      ? input.services.filter((x: any) => x && typeof x === "object" && typeof x.icon === "string" && typeof x.title === "string" && typeof x.description === "string")
      : undefined,
    pricing: Array.isArray(input.pricing)
      ? input.pricing
          .filter((p: any) => p && typeof p === "object")
          .map((p: any) => ({
            title: typeof p.title === "string" ? p.title : "",
            description: typeof p.description === "string" ? p.description : (typeof p.subtitle === "string" ? p.subtitle : undefined),
            price: typeof p.price === "string" ? p.price : "",
            features: Array.isArray(p.features) ? p.features.filter((x: any) => typeof x === "string") : undefined,
            cta1: p.cta1 && typeof p.cta1 === "object" && typeof p.cta1.text === "string" && typeof p.cta1.href === "string" ? { text: p.cta1.text, href: p.cta1.href } : undefined,
          }))
      : (input.pricing && typeof input.pricing === "object" ? {
          mot: typeof input.pricing.mot === "string" ? input.pricing.mot : undefined,
          interimFrom: typeof input.pricing.interimFrom === "string" ? input.pricing.interimFrom : undefined,
          fullFrom: typeof input.pricing.fullFrom === "string" ? input.pricing.fullFrom : undefined,
        } : undefined),
    branches: Array.isArray(input.branches)
      ? input.branches.map((b: any) => ({
          name: typeof b?.name === "string" ? b.name : undefined,
          address: typeof b?.address === "string" ? b.address : undefined,
          hours: typeof b?.hours === "string" ? b.hours : undefined,
          phone: typeof b?.phone === "string" ? b.phone : undefined,
        }))
      : undefined,
    reviews: Array.isArray(input.reviews)
      ? input.reviews
          .filter((r: any) => r && typeof r === "object")
          .map((r: any) => ({
            quote: String(r.quote ?? r.text ?? ""),
            author: String(r.author ?? r.name ?? ""),
          }))
      : undefined,
    logoPath,
    stripeLinks,
    mapEmbed,
    geo,
  };
}

// ---------- Loaders ----------

function readJsonSafe(filePath: string): any | null {
  try {
    const buf = fs.readFileSync(filePath, "utf8");
    return JSON.parse(buf);
  } catch {
    return null;
  }
}

const repoRoot = process.cwd();

export function getAllGarageSlugs(): string[] {
  const basePath = path.join(repoRoot, "data", "garages.json");
  const arr = readJsonSafe(basePath);
  if (!Array.isArray(arr)) return [];
  return arr.map((g: any) => String(g?.slug || "")).filter(Boolean);
}

export async function loadGarage(slug: string): Promise<Garage | undefined> {
  const garages = await import("../data/garages.json");
  const garagesArray = garages.default || garages;
  
  console.log("🧠 Full garages object keys:", Object.keys(garages));
  console.log("🧠 Garages array length:", Array.isArray(garagesArray) ? garagesArray.length : "Not an array");
  
  const garage = Array.isArray(garagesArray) 
    ? garagesArray.find((g: any) => g && g.slug === slug)
    : undefined;

  console.log(`🚦 Loaded garage for slug [${slug}]:`, garage);

  if (!garage) {
    console.warn(`❌ No garage found for slug: ${slug}`);
    return undefined;
  }

  // Transform garages.json data structure to match Garage type
  const transformedGarage = transformGarageData(garage);
  
  const base = validateAndNormalize(transformedGarage);
  if (!base) return undefined;

  // Optional overlay from app/<slug>/garage.json
  const overlayPath = path.join(repoRoot, "app", slug, "garage.json");
  const overrideRaw = readJsonSafe(overlayPath);
  const mergedRaw = overlay({ ...transformedGarage }, overrideRaw || undefined);
  let validated = validateAndNormalize(mergedRaw) || base;

  // Final normalization pass for colors
  if (validated.brand) {
    if (validated.brand.primary && !isHexColor(validated.brand.primary)) validated.brand.primary = "#1F4FC9";
    if (validated.brand.dark && !isHexColor(validated.brand.dark)) validated.brand.dark = "#0B0B0C";
  }

  // Hero variants: use explicitly defined variants from garage.json
  const ensureHero = validated.hero || {};
  const variants: any[] = Array.isArray(ensureHero.variants) ? [...ensureHero.variants] : [];
  const solidExists = variants.some((v) => v.key === "solid");
  const town = validated.branches?.[0]?.address?.split(",")?.[1]?.trim() || validated.branches?.[0]?.address || "your area";
  if (!solidExists) {
    variants.unshift({
      key: "solid",
      label: "Brand",
      type: "solid",
      headline: `MOTs in ${town} — same-day slots.`,
      sub: "DVSA-approved testers. No hidden fees.",
    });
  }
  validated = {
    ...validated,
    hero: {
      greeting: validated.hero?.greeting,
      background: validated.hero?.background,
      defaultVariant: validated.hero?.defaultVariant || "solid",
      variants,
    },
  };

  return validated;
}

// Transform garages.json data structure to match Garage type
function transformGarageData(garage: any): any {
  const transformed = { ...garage };
  
  // Transform services array if it contains strings instead of objects
  if (Array.isArray(garage.services)) {
    transformed.services = garage.services.map((service: any) => {
      if (typeof service === 'string') {
        // Convert string service to object with icon, title, description
        return {
          icon: getServiceIcon(service),
          title: service,
          description: getServiceDescription(service)
        };
      }
      return service;
    });
  }
  
  // Transform reviews if they have 'name' instead of 'author'
  if (Array.isArray(garage.reviews)) {
    transformed.reviews = garage.reviews.map((review: any) => ({
      quote: review.quote || review.text || '',
      author: review.author || review.name || 'Customer'
    }));
  }
  
  // Ensure logoPath is set if not present
  if (!transformed.logoPath) {
    transformed.logoPath = `/logos/${garage.slug}.png`;
  }
  
  return transformed;
}

// Helper function to get appropriate icon for service
function getServiceIcon(service: string): string {
  const iconMap: Record<string, string> = {
    'MOT Testing': 'shield-check',
    'Servicing': 'wrench',
    'Diagnostics': 'settings',
    'Repairs': 'tool',
    'Tyres': 'circle',
    'Brakes': 'square',
    'Air Con': 'wind',
    'Exhausts': 'pipe',
    'Batteries': 'battery',
    'EV & Hybrid': 'zap',
    'EV & Hybrids': 'zap'
  };
  return iconMap[service] || 'wrench';
}

// Helper function to get appropriate description for service
function getServiceDescription(service: string): string {
  const descMap: Record<string, string> = {
    'MOT Testing': 'Fast, certified MOT testing',
    'Servicing': 'Keep your car running smoothly',
    'Diagnostics': 'Clear fault code scanning',
    'Repairs': 'Mechanical and bodywork repairs',
    'Tyres': 'Affordable tyres fitted fast',
    'Brakes': 'Brake inspection and repair',
    'Air Con': 'Air conditioning service',
    'Exhausts': 'Exhaust fitting and repair',
    'Batteries': 'Battery testing and replacement',
    'EV & Hybrid': 'Electric and hybrid vehicle service',
    'EV & Hybrids': 'Electric and hybrid vehicle service'
  };
  return descMap[service] || 'Professional automotive service';
}


