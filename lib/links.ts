// lib/links.ts

// Normalize "stripe:<id>" -> "https://buy.stripe.com/<id>"
function normalize(v: string | undefined): string {
  const s = (v ?? "").trim();
  if (!s) return "";
  return s.startsWith("stripe:") ? `https://buy.stripe.com/${s.slice(7)}` : s;
}

/**
 * Hard fallbacks (LIVE) — used only if NEXT_PUBLIC_* is missing.
 * Keeps CTAs working in Production even if envs are misconfigured.
 */
const DEFAULT_PUBLIC_STARTER  = "https://buy.stripe.com/fZuaEZcyH8CheM09b0eQM0b";
const DEFAULT_PUBLIC_BUYOUT   = "https://buy.stripe.com/8x28wReGP5q5bzO2MCeQM03";
const DEFAULT_PARTNER_STARTER = "https://buy.stripe.com/6oU4gB8ir9GlfQ4af4eQM05";
const DEFAULT_PARTNER_BUYOUT  = "https://buy.stripe.com/14AdRbcyHdWB7jy5YOeQM0c";

// Read NEXT_PUBLIC_* at build time (Next.js inlines these on the client)
const ENV_PUBLIC_STARTER   = normalize(process.env.NEXT_PUBLIC_STRIPE_LINK_PUBLIC_STARTER);
const ENV_PUBLIC_BUYOUT    = normalize(process.env.NEXT_PUBLIC_STRIPE_LINK_PUBLIC_BUYOUT);
const ENV_PARTNER_STARTER  = normalize(process.env.NEXT_PUBLIC_STRIPE_LINK_PARTNER_STARTER);
const ENV_PARTNER_BUYOUT   = normalize(process.env.NEXT_PUBLIC_STRIPE_LINK_PARTNER_BUYOUT);

// Prefer env; fall back to hard defaults so SSR always ships a real URL
const PUBLIC_STARTER   = ENV_PUBLIC_STARTER   || DEFAULT_PUBLIC_STARTER;
const PUBLIC_BUYOUT    = ENV_PUBLIC_BUYOUT    || DEFAULT_PUBLIC_BUYOUT;
const PARTNER_STARTER  = ENV_PARTNER_STARTER  || DEFAULT_PARTNER_STARTER;
const PARTNER_BUYOUT   = ENV_PARTNER_BUYOUT   || DEFAULT_PARTNER_BUYOUT;

export const links = {
  // Public (marketing) site
  publicStarter:  PUBLIC_STARTER,
  publicBuyout:   PUBLIC_BUYOUT,

  // Partner page
  partnerStarter: PARTNER_STARTER,
  partnerBuyout:  PARTNER_BUYOUT,
};

export function telLink(phone?: string): string {
  if (!phone) return "#contact";
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function mailtoLink(email?: string): string {
  if (!email) return "#contact";
  return `mailto:${email}`;
}

export function stripeLink(url?: string): string {
  return url && /^https?:\/\//.test(url) ? url : "#enquiry";
}

// Optional: dev console warning if any env is missing (helps future you)
if (process.env.NODE_ENV !== "production") {
  [
    ["NEXT_PUBLIC_STRIPE_LINK_PUBLIC_STARTER", ENV_PUBLIC_STARTER],
    ["NEXT_PUBLIC_STRIPE_LINK_PUBLIC_BUYOUT", ENV_PUBLIC_BUYOUT],
    ["NEXT_PUBLIC_STRIPE_LINK_PARTNER_STARTER", ENV_PARTNER_STARTER],
    ["NEXT_PUBLIC_STRIPE_LINK_PARTNER_BUYOUT", ENV_PARTNER_BUYOUT],
  ].forEach(([key, val]) => {
    if (!val) {
      // eslint-disable-next-line no-console
      console.warn(`[links] Missing ${key}; using hardcoded fallback.`);
    }
  });
}
