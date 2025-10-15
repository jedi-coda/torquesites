import { redirect } from "next/navigation";
import GarageMicrosite from "@/components/GarageMicrosite";
import { getAllGarageSlugs, loadGarage } from "@/lib/garage";
import { decodeSlug } from "@/lib/slug";
import { titleFor, descriptionFor, localBusinessJsonLd } from "@/lib/seo";
import { garageServices } from "@/lib/servicesConfig";

// Ensure static generation of known slugs
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllGarageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const garage = await loadGarage(decodeSlug(slug));
  if (!garage) return {};
  return {
    title: titleFor(garage),
    description: descriptionFor(garage),
  };
}

export default async function GaragePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const decoded = decodeSlug(slug);

  const garage = await loadGarage(decoded);
  if (!garage) redirect("/pricing");

  // Inject per-garage services from config
  const servicesFor = garageServices?.[decoded as keyof typeof garageServices] ?? [];

  // JSON-LD for SEO
  const ld = localBusinessJsonLd(garage);

  // Define garage data for the modular component using actual garage data
  const garageData = {
    name: garage.name,
    phone: garage.contact?.phone || "01494 123456",
    emailFallback: garage.contact?.email || "info@newtown-garage.co.uk",
    address: garage.branches?.[0]?.address || "123 Main Street, Chesham",
    heroLine: garage.tagline || "Your trusted local garage.",
    heroImage: garage.hero?.variants?.[0]?.src || "/hero/customer.jpg",
    colors: { primary: "#22aabb", secondary: "#000000" },
    logo: "/logos/newtown.png",
    services: garage.services || [
      {
        name: "MOT Testing",
        desc: "Fast, reliable MOT tests",
        image: "/services/mot.jpg"
      },
      {
        name: "Servicing",
        desc: "Complete vehicle servicing",
        image: "/services/service.jpg"
      }
    ],
    hours: garage.branches?.[0]?.hours ? [{ day: "Monday", open: "08:00", close: "18:00" }] : [
      { day: "Monday", open: "08:00", close: "18:00" },
      { day: "Tuesday", open: "08:00", close: "18:00" }
    ],
    priceId: "price_1234567890"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <GarageMicrosite data={garageData} />
    </>
  );
}
