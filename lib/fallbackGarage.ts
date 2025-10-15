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
  reviews: newtownGarageBrand.testimonials.map(t => ({ quote: t.quote, author: t.author }))
};

/**
 * Helper function to safely get garage data with fallback
 * Usage: const safeGarage = getSafeGarage(garage);
 */
export function getSafeGarage(garage?: Garage | null): Garage {
  return garage || fallbackGarage;
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
  const safeGarage = getSafeGarage(garage);
  return safeGarage.contact || fallbackGarage.contact!;
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
