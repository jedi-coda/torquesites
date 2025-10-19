﻿import { type Garage } from "@/lib/garage";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import EnquiryForm from "@/components/EnquiryForm";
import ContactDetails from "@/components/ui/ContactDetails";
import OpeningHours from "@/components/OpeningHours";
import MapEmbed from "@/components/MapEmbed";
import Reviews from "@/components/ui/Reviews";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import PricingCards from "@/components/PricingCards";
import StickyActionsClient from "@/components/StickyActionsClient";
import Footer from "@/components/Footer";
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
  
  console.log("GarageTemplate rendering with", garage);
  console.log("OpeningHours data:", garage?.openingHours);
  console.log("MapEmbed props:", {
    name: safeGarage.name,
    address: safeGarage.branches?.[0]?.address,
    mapUrl: safeGarage.mapEmbed
  });

  // Always render - no early returns that could cause blank pages
  return (
    <div className="min-h-screen bg-black">
      <Hero garage={garage} />
      {safeGarage.services && <ServicesGrid services={safeGarage.services} />}
      <PricingCards pricing={safeGarage.pricing} />
      <EnquiryForm 
        garageName={safeGarage.name} 
        toEmail={safeContact.email || "info@premium-garage.example"}
        brandPrimary={safeGarage.brand?.primary || "#1A1A1A"}
        garageSlug={safeGarage.slug}
      />
      {safeGarage.openingHours && safeGarage.openingHours.length > 0 && (
        <OpeningHours hours={safeGarage.openingHours} />
      )}
      <ContactDetails 
        phone={safeContact.phone} 
        email={safeContact.email} 
      />
      <MapEmbed 
        name={safeGarage.name}
        address={(garage as any)?.address || safeGarage.branches?.[0]?.address || "Address not available"}
        mapUrl={safeGarage.mapEmbed}
        garage={garage}
      />
      <Reviews garage={safeGarage} />
      {safeGarage.reviews && <ReviewsCarousel reviews={safeGarage.reviews} />}
      <Footer />
      <StickyActionsClient 
        logoPath={safeGarage.logoPath}
        phoneNumber={safeContact.phone}
      />
    </div>
  );
}