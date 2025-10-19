import { type Garage } from "./garage";
import { newtownGarageBrand } from "../brands/newtownGarageBrand";

/**
 * Shared fallback garage data for consistent defaults across all components
 * This ensures 100% safe rendering when garage props are null/undefined
 * Essential for scaling to 1000+ dynamic garage microsites
 * 
 * Uses Newtown Garage brand configuration for premium, professional styling
 */
export const fallbackGarage: Garage = {
  slug: newtownGarageBrand.slug,
  name: newtownGarageBrand.name,
  tagline: newtownGarageBrand.tagline,
  brand: {
    primary: newtownGarageBrand.brandColor, // Deep garage blue
    dark: "#000000"     // Deep black for contrast
  },
  theme: {
    accent: newtownGarageBrand.accentColor,      // CTA blue accent
    accent2: "#FFD700",     // Bright gold highlight
    primary: newtownGarageBrand.brandColor,     // Brand primary
    secondary: "#333333",   // Secondary dark
    textOnPrimary: "light"  // White text on dark backgrounds
  },
  contact: {
    phone: newtownGarageBrand.contact.phone,
    email: newtownGarageBrand.contact.email
  },
  hours: "Mon–Fri 8:00–18:00, Sat 8:00–13:00",
  openingHours: [
    { day: "Monday", hours: "08:00 – 18:00", open: true },
    { day: "Tuesday", hours: "08:00 – 18:00", open: true },
    { day: "Wednesday", hours: "08:00 – 18:00", open: true },
    { day: "Thursday", hours: "08:00 – 18:00", open: true },
    { day: "Friday", hours: "08:00 – 18:00", open: true },
    { day: "Saturday", hours: "08:00 – 13:00", open: true },
    { day: "Sunday", hours: "Closed", open: false }
  ],
  hero: {
    greeting: true,
    background: "gradient",
    defaultVariant: "customer",
    variants: [
      {
        key: "customer",
        label: "Customer Service", 
        type: "image",
        src: "/hero/customer.jpg",
        alt: "Newtown Garage customer service",
        headline: newtownGarageBrand.heroTagline,
        sub: newtownGarageBrand.heroSubtext
      },
      {
        key: "tech",
        label: "Advanced Technology",
        type: "image",
        src: "/hero/tech.jpg", 
        alt: "State-of-the-art technology",
        headline: "Cutting-Edge Diagnostic Equipment",
        sub: "Latest technology for precise diagnostics and reliable service for all makes and models."
      },
      {
        key: "prestige",
        label: "Prestige Service",
        type: "image",
        src: "/hero/prestige.jpg",
        alt: "Premium prestige service", 
        headline: "Expert Care for Your Vehicle",
        sub: "Professional service with attention to every detail in Chesham"
      }
    ]
  },
  chips: newtownGarageBrand.usps,
  services: newtownGarageBrand.services,
  pricing: {
    mot: "£54.85",
    interimFrom: "£179",
    fullFrom: "£249"
  },
  branches: [
    {
      name: "Main Branch",
      address: "123 Fallback Street, Sample Town, ST1 2AB",
      hours: "Mon–Fri 8:00–17:00",
      phone: "01234 567890"
    }
  ],
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2472.112204883971!2d-0.615266606199233!3d51.712689699305876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48765d057ffc1b21%3A0x3808012303af4373!2sNewtown%20Garage%20Chesham!5e0!3m2!1sen!2suk!4v1759496050521!5m2!1sen!2suk",
  reviews: newtownGarageBrand.testimonials.map(t => ({ quote: t.quote, author: t.author }))
};

/**
 * Helper function to safely get garage data with fallback
 * Usage: const safeGarage = getSafeGarage(garage);
 * Only uses fallback when garage is null/undefined, otherwise preserves actual data
 */
export function getSafeGarage(garage?: Garage | null): Garage {
  if (!garage) {
    return fallbackGarage;
  }
  
  // Merge actual garage data with fallback for missing fields only
  return {
    ...fallbackGarage,
    ...garage,
    // Preserve actual garage's nested objects
    brand: garage.brand || fallbackGarage.brand,
    contact: garage.contact || fallbackGarage.contact,
    hero: garage.hero || fallbackGarage.hero,
    theme: garage.theme || fallbackGarage.theme,
    // Preserve actual garage's arrays
    chips: garage.chips || fallbackGarage.chips,
    services: garage.services || fallbackGarage.services,
    pricing: garage.pricing || fallbackGarage.pricing,
    branches: garage.branches || fallbackGarage.branches,
    reviews: garage.reviews || fallbackGarage.reviews,
    openingHours: garage.openingHours || fallbackGarage.openingHours,
  };
}

/**
 * Helper function to safely get hero variants with fallback
 * Usage: const variants = getSafeHeroVariants(garage);
 */
export function getSafeHeroVariants(garage?: Garage | null) {
  const safeGarage = getSafeGarage(garage);
  return safeGarage.hero?.variants || fallbackGarage.hero!.variants!;
}

/**
 * Helper function to safely get pricing data with fallback
 * Usage: const pricing = getSafePricing(garage);
 */
export function getSafePricing(garage?: Garage | null) {
  const safeGarage = getSafeGarage(garage);
  return safeGarage.pricing || fallbackGarage.pricing!;
}

/**
 * Helper function to safely get contact info with fallback
 * Usage: const contact = getSafeContact(garage);
 */
export function getSafeContact(garage?: Garage | null) {
  if (!garage) {
    return fallbackGarage.contact!;
  }
  
  // Use actual garage contact data, fall back to default only if missing
  return garage.contact || fallbackGarage.contact!;
}

/**
 * Helper function to safely get theme colors with fallback
 * Usage: const theme = getSafeTheme(garage);
 */
export function getSafeTheme(garage?: Garage | null) {
  const safeGarage = getSafeGarage(garage);
  return safeGarage.theme || fallbackGarage.theme!;
}

/**
 * Newtown Garage brand theme constants for consistent styling
 */
export const premiumTheme = {
  brandColor: newtownGarageBrand.brandColor,
  accentColor: newtownGarageBrand.accentColor, 
  heroImage: "/hero/customer.jpg",
  text: "#FFFFFF",
  background: "#000000",
  cardBackground: "#1A1A1A",
  cardBorder: newtownGarageBrand.accentColor,
  inputBackground: "#2A2A2A",
  inputBorder: newtownGarageBrand.accentColor,
  buttonPrimary: newtownGarageBrand.brandColor,
  buttonAccent: newtownGarageBrand.accentColor
};
