// app/[slug]/page.tsx
import { redirect } from "next/navigation";
import GarageTemplate from "@/components/GarageTemplate";
import { getAllGarageSlugs, loadGarage } from "@/lib/garage";
import { decodeSlug } from "@/lib/slug";
import { titleFor, descriptionFor, localBusinessJsonLd } from "@/lib/seo";

// Types are enforced by the loader

// Prebuild known demo slugs
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllGarageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const garage = await loadGarage(decodeSlug(slug));
  if (!garage) return {};
  return { title: titleFor(garage), description: descriptionFor(garage) };
}

export default async function GaragePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const decoded = decodeSlug(slug);
  const garage = await loadGarage(decoded);
  if (!garage) redirect("/pricing");
  const ld = localBusinessJsonLd(garage);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <GarageTemplate garage={garage} />
    </>
  );
}
