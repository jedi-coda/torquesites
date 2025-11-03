import { type Garage } from "@/lib/garage";
import GarageHero from "@/components/GarageHero";
import ServicesGrid from "@/components/ServicesGrid";
import EnquiryForm from "@/components/EnquiryForm";
import ContactDetails from "@/components/ui/ContactDetails";
import OpeningHours from "@/components/OpeningHours";
import MapEmbed from "@/components/MapEmbed";
import Reviews from "@/components/ui/Reviews";
import PricingCards from "@/components/PricingCards";
import StickyActionsClient from "@/components/StickyActionsClient";
import Footer from "@/components/Footer";
import { getSafeGarage, getSafeContact } from "@/lib/fallbackGarage";

type Props = {
  garage?: Garage | null;
  tier: string;
};

export default function GarageTemplateTurbo({ garage, tier }: Props) {
  const safeGarage = getSafeGarage(garage);
  const safeContact = getSafeContact(garage);

  return (
    <div className="min-h-screen bg-black">
      <div className="fixed top-4 left-4 z-50 px-4 py-1 text-xs font-bold uppercase rounded-full shadow-md bg-white/10 text-white backdrop-blur-md border border-white/20">
        {tier === "turbo" && "TURBO MODE • Powered by TorqueSites"}
        {tier === "supercharged" && "SUPERCHARGED MODE • Powered by TorqueSites"}
        {tier === "hyper" && "HYPER MODE • Powered by TorqueSites"}
      </div>
      <GarageHero garage={garage} />

      {/* Garage Features (DVSA approved, etc.) */}
      {safeGarage.services && <ServicesGrid services={safeGarage.services} />}

      {/* MOT & Servicing Prices */}
      <PricingCards pricing={safeGarage.pricing} />

      {/* Book a Service Form */}
      <EnquiryForm
        garageName={safeGarage.name}
        toEmail={safeContact.email || "info@premium-garage.example"}
        brandPrimary={safeGarage.brand?.primary || "#1A1A1A"}
        garageSlug={safeGarage.slug}
      />

      {/* Garage Opening Hours */}
      {safeGarage.openingHours && safeGarage.openingHours.length > 0 && (
        <OpeningHours hours={safeGarage.openingHours} />
      )}

      {/* Address and Phone Contact */}
      <ContactDetails phone={safeContact.phone} email={safeContact.email} />

      {/* Google Map Embed */}
      <MapEmbed
        name={safeGarage.name}
        address={
          (garage as any)?.address ||
          safeGarage.branches?.[0]?.address ||
          "Address not available"
        }
        mapUrl={safeGarage.mapEmbed}
        garage={garage}
      />

      {/* Customer Reviews (only if present) */}
      {safeGarage.reviews && safeGarage.reviews.length > 0 && (
        <Reviews garage={safeGarage} />
      )}
      {/* Spacer to offset Sticky CTA bar */}
      <div className="h-[88px] sm:h-[72px]" />
      <Footer garage={garage} tier={tier} />
      <StickyActionsClient
        logoPath={safeGarage.logoPath}
        phoneNumber={safeContact.phone}
      />
    </div>
  );
}

