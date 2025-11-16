import { notFound } from "next/navigation";
import GarageTemplateHyper from "@/components/templates/GarageTemplateHyper";
import GarageTemplateSupercharged from "@/components/templates/GarageTemplateSupercharged";
import GarageTemplateTurbo from "@/components/templates/GarageTemplateTurbo";
import { loadGarage } from "@/lib/garage";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const garage = await loadGarage(slug);

  if (!garage) {
    notFound();
  }

  // Extract tier from garage data (default to "turbo" if not specified)
  const tier = garage.tier?.toLowerCase() || "turbo";

  // Render the correct template based on tier
  if (tier === "hyper") {
    return <GarageTemplateHyper garage={garage} tier={tier} />;
  }

  if (tier === "supercharged") {
    return <GarageTemplateSupercharged garage={garage} tier={tier} />;
  }

  // Default fallback is Turbo
  return <GarageTemplateTurbo garage={garage} tier={tier} />;
}
