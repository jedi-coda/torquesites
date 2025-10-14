import { type Garage } from "@/lib/garage";
import GarageHero from "@/components/GarageHero";
import EnquiryForm from "@/components/EnquiryForm";
import ContactDetails from "@/components/ui/ContactDetails";
import OpeningHours from "@/components/ui/OpeningHours";
import Reviews from "@/components/ui/Reviews";
import PricingCards from "@/components/PricingCards";

type Props = {
  garage: Garage;
};

export default function GarageTemplate({ garage }: Props) {
  // ✅ Insert at the top of GarageTemplate.tsx
  console.log("🚧 Garage object received by GarageTemplate:", garage);
  
  // ✅ Confirms garage was loaded
  console.log("🚦 Loaded garage for slug [newtown-garage]:", garage);

  // ✅ Confirms if pricing data is available
  if (!garage) {
    console.warn("❌ No garage object returned — check slug in garages.json");
  } else if (!garage.pricing) {
    console.warn("⚠️ No pricing found for garage [newtown-garage]");
  } else {
    console.log("✅ Pricing found:", garage.pricing);
  }

  console.log("📦 Garage object at render time:", garage);

  if (!garage || !garage.pricing) {
    console.warn("⏳ Garage or pricing not ready yet");
    return <div className="text-yellow-500">⏳ Loading garage details...</div>;
  }

  return (
    <div className="space-y-10">
      <GarageHero garage={garage} />

      {/* ✅ Directly before the PricingCards render line */}
      <>
        <div className="text-green-500">✅ PricingCards prop passed</div>
        <PricingCards pricing={garage.pricing} />
      </>

      <EnquiryForm 
        garageName={garage.name} 
        toEmail={garage.contact?.email || ""}
        garageSlug={garage.slug}
      />

      <div className="space-y-10"> {/* Updated from grid to vertical stacking */}
        <ContactDetails 
          phone={garage.contact?.phone} 
          email={garage.contact?.email} 
        />
        <OpeningHours />
        <Reviews />
      </div>
    </div>
  );
}
