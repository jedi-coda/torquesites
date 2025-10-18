import { notFound } from "next/navigation";
import GarageTemplate from "@/components/GarageTemplate";
import { getAllGarageSlugs, loadGarage } from "@/lib/garage";

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
  const garage = await loadGarage(slug);
  
  if (!garage) {
    return {
      title: "Garage Not Found",
      description: "The requested garage microsite could not be found.",
    };
  }

  return {
    title: `${garage.name} - MOT Testing & Servicing`,
    description: garage.tagline || `Professional MOT testing and vehicle servicing at ${garage.name}.`,
  };
}

export default async function GaragePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  // Load garage data from garages.json
  const garage = await loadGarage(slug);
  
  // If garage not found, show 404
  if (!garage) {
    notFound();
  }

  // Render the garage microsite using GarageTemplate
  return <GarageTemplate garage={garage} />;
}