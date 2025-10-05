// lib/links.ts

// Normalize "stripe:<id>" -> "https://buy.stripe.com/<id>"
function normalize(v: string | undefined): string {
  const s = (v ?? "").trim();
  if (!s) return "";
  return s.startsWith("stripe:") ? `https://buy.stripe.com/${s.slice(7)}` : s;
}

// Use LITERAL keys so Next.js can inline these at build time on the client
const PUBLIC_STARTER   = normalize(process.env.NEXT_PUBLIC_STRIPE_LINK_PUBLIC_STARTER);
const PUBLIC_BUYOUT    = normalize(process.env.NEXT_PUBLIC_STRIPE_LINK_PUBLIC_BUYOUT);
const PARTNER_STARTER  = normalize(process.env.NEXT_PUBLIC_STRIPE_LINK_PARTNER_STARTER);
const PARTNER_BUYOUT   = normalize(process.env.NEXT_PUBLIC_STRIPE_LINK_PARTNER_BUYOUT);

export const links = {
  publicStarter:  PUBLIC_STARTER,
  publicBuyout:   PUBLIC_BUYOUT,
  partnerStarter: PARTNER_STARTER,
  partnerBuyout:  PARTNER_BUYOUT,
};

