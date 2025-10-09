import type { Garage } from "@/lib/garage";
import type { HeroVariant } from "@/components/Hero";

const COOKIE = "hv_ab";
const VALID_VARIANTS: HeroVariant[] = ['customer', 'prestige', 'tech'];

export function chooseHeroDefault(garage: Garage): { key: HeroVariant; source: "cookie" | "ab" | "default" } {
  if (typeof document !== "undefined") {
    const m = document.cookie.match(new RegExp(`${COOKIE}=([^;]+)`));
    const val = m?.[1];
    if (val && VALID_VARIANTS.includes(val as HeroVariant)) {
      return { key: val as HeroVariant, source: "cookie" };
    }
  }
  
  // A/B logic: A = default, B = first available image variant
  const defaultVariant = garage.hero?.defaultVariant || "prestige";
  const validDefault = VALID_VARIANTS.includes(defaultVariant as HeroVariant) ? defaultVariant as HeroVariant : "prestige";
  
  // For A/B testing, alternate between default and first image variant
  const imageVariants = VALID_VARIANTS.filter(v => v !== validDefault);
  const abVariant = imageVariants[0] || validDefault;
  
  return { key: abVariant, source: "ab" };
}

export function setAbCookie(key: HeroVariant) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE}=${encodeURIComponent(key)}; Path=/; Expires=${expires}`;
}


