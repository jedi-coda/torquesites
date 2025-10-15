import { type Garage } from "@/lib/garage";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import EnquiryForm from "@/components/EnquiryForm";
import ContactDetails from "@/components/ui/ContactDetails";
import OpeningHours from "@/components/ui/OpeningHours";
import Reviews from "@/components/ui/Reviews";
import PricingCards from "@/components/PricingCards";
import { getSafeGarage, getSafeContact } from "@/lib/fallbackGarage";

type Props = {
  garage?: Garage | null;
};

// 🛠️ GarageTemplate with shared fallback logic for production scale
// ✅ Uses shared fallbackGarage for consistent defaults
// ✅ 100% safe rendering with null/undefined garage props
// ✅ All child components receive safe data
// ✅ Ready for 1000+ dynamic garage microsites

export default function GarageTemplate({ garage }: Props) {
  const safeGarage = getSafeGarage(garage);
  const safeContact = getSafeContact(garage);
  
  console.log("🚧 GarageTemplate received garage:", garage);
  console.log("🛡️ GarageTemplate using safe garage:", safeGarage);

  // Always render - no early returns that could cause blank pages
  return (
    <div className="min-h-screen bg-black">
      <Hero garage={safeGarage} />
      {safeGarage.services && <ServicesGrid services={safeGarage.services} />}
      <PricingCards pricing={safeGarage.pricing} />
      <EnquiryForm 
        garageName={safeGarage.name} 
        toEmail={safeContact.email || "info@premium-garage.example"}
        brandPrimary={safeGarage.brand?.primary || "#1A1A1A"}
        garageSlug={safeGarage.slug}
      />
      <ContactDetails 
        phone={safeContact.phone} 
        email={safeContact.email} 
      />
      <Reviews garage={safeGarage} />
    </div>
  );
}
