import { redirect } from "next/navigation";
import GarageTemplate from "@/components/GarageTemplate";
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
  const servicesFor = garageServices?.[decoded] ?? [];

  // JSON-LD for SEO
  const ld = localBusinessJsonLd(garage);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <GarageTemplate
        garage={garage}
        garageSlug={decoded}
        services={servicesFor}
      />
    </>
  );
}
