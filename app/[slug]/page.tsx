import GarageTemplateHyper from "@/components/templates/GarageTemplateHyper";
import GarageTemplateSupercharged from "@/components/templates/GarageTemplateSupercharged";
import GarageTemplateTurbo from "@/components/templates/GarageTemplateTurbo";
import garages from "@/data/garages.json";

export default function Page({ params }: { params: { slug: string } }) {
  const garage = garages.find((g) => g.slug === params.slug);
  
  if (!garage) return <div>Garage not found</div>;

  // Extract and normalize tier from garage data
  const tier = (garage.tier || "turbo").toLowerCase();

  // Debug: Log tier for troubleshooting
  // console.log('Garage:', garage.slug, 'Tier:', tier);

  if (tier === "hyper") {
    return <GarageTemplateHyper garage={garage as any} tier={tier} />;
  }

  if (tier === "supercharged") {
    return <GarageTemplateSupercharged garage={garage as any} tier={tier} />;
  }

  // Default fallback is Turbo
  return <GarageTemplateTurbo garage={garage as any} tier={tier || "turbo"} />;
}
