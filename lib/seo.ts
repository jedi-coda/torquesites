import type { Garage } from "@/lib/garage";

function truncate(s: string, n = 160) {
  if (s.length <= n) return s;
  return s.slice(0, n - 1).trimEnd() + "…";
}

export function titleFor(garage: Garage): string {
  const town = garage.branches?.[0]?.address?.split(",")?.[1]?.trim() || "your area";
  return `MOT in ${town} | ${garage.name}`;
}

export function descriptionFor(garage: Garage): string {
  const src = garage.content?.aboutBlurb?.trim() || "Trusted MOTs, servicing & repairs near you.";
  return truncate(src, 160);
}

export function localBusinessJsonLd(garage: Garage): any {
  const addr = garage.branches?.[0];
  return {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: garage.name,
    telephone: garage.contact?.phone,
    address: addr
      ? {
          "@type": "PostalAddress",
          streetAddress: addr.address,
          addressLocality: addr.name,
        }
      : undefined,
    geo:
      garage.geo?.lat && garage.geo.lng
        ? { "@type": "GeoCoordinates", latitude: garage.geo.lat, longitude: garage.geo.lng }
        : undefined,
    url: typeof window !== "undefined" ? window.location.href : undefined,
  };
}


