import { type Garage } from "@/lib/garage";
import GarageHero from "@/components/GarageHero";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ServicesGrid from "@/components/ServicesGrid";
import PricingCards from "@/components/PricingCards";
import OpeningHours from "@/components/OpeningHours";
import EnquiryForm from "@/components/EnquiryForm";
import MapEmbed from "@/components/MapEmbed";
import ContactDetails from "@/components/ui/ContactDetails";
import Reviews from "@/components/ui/Reviews";
import Footer from "@/components/Footer";
import StickyActionsClient from "@/components/StickyActionsClient";
import { getSafeGarage, getSafeContact } from "@/lib/fallbackGarage";

type Props = {
  garage?: Garage | null;
  tier: string;
};

export default function GarageTemplateSupercharged({ garage, tier }: Props) {
  const safeGarage = getSafeGarage(garage);
  const safeContact = getSafeContact(garage);

  return (
    <div className="min-h-screen bg-black">
      {/* Dark dynamic hero section with rotating greeting + 3 headline messages */}
      <GarageHero garage={garage} />

      {/* Reviews carousel stays here */}
      {safeGarage.reviews && safeGarage.reviews.length > 0 && (
        <ReviewsCarousel reviews={safeGarage.reviews} />
      )}

      {/* Service highlights */}
      {safeGarage.services && <ServicesGrid services={safeGarage.services} />}

      {/* MOT & service pricing */}
      <PricingCards pricing={safeGarage.pricing} />

      {/* Opening hours */}
      {safeGarage.openingHours && safeGarage.openingHours.length > 0 && (
        <OpeningHours hours={safeGarage.openingHours} />
      )}

      {/* Mini hero badge - placed between OpeningHours and EnquiryForm */}
      <div className="text-xs uppercase bg-white/10 px-3 py-1 rounded-md text-white text-center w-fit mx-auto mb-6">
        SUPERCHARGED MODE • POWERED BY TORQUESITES
      </div>

      {/* Booking form - scroll anchor for sticky CTA (id="booking-form" is in EnquiryForm) */}
      <EnquiryForm
        garageName={safeGarage.name}
        toEmail={safeContact.email || "info@premium-garage.example"}
        brandPrimary={safeGarage.brand?.primary || "#1A1A1A"}
        garageSlug={safeGarage.slug}
        whatsappNumber={safeContact.whatsapp}
        garageAddress={(garage as any)?.address || safeGarage.branches?.[0]?.address}
      />

      {/* Embedded map */}
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

      {/* Contact details */}
      <ContactDetails phone={safeContact.phone} email={safeContact.email} />

      {/* Full review block (same as Turbo) */}
      {safeGarage.reviews && safeGarage.reviews.length > 0 && (
        <Reviews garage={safeGarage} />
      )}

      {/* Spacer to offset Sticky CTA bar */}
      <div className="h-[88px] sm:h-[72px]" />
      <Footer garage={safeGarage} tier={tier} />
      <StickyActionsClient
        logoPath={safeGarage.logoPath}
        phoneNumber={safeContact.phone}
      />
    </div>
  );
}

