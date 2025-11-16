import { type Garage } from "@/lib/garage";
import GarageHero from "@/components/GarageHero";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import ServicesGrid from "@/components/ServicesGrid";
import PricingCards from "@/components/PricingCards";
import OpeningHours from "@/components/OpeningHours";
import EnquiryForm from "@/components/EnquiryForm";
import MiniHeroSection from "@/components/MiniHeroSection";
import MapEmbed from "@/components/MapEmbed";
import ContactDetails from "@/components/ui/ContactDetails";
import Reviews from "@/components/ui/Reviews";
import Footer from "@/components/Footer";
import StickyActionsClient from "@/components/StickyActionsClient";

type Props = {
  garage: Garage;
  tier: "supercharged";
};

export default function GarageTemplateSupercharged({ garage, tier }: Props) {
  // Extract data from garage prop
  const garageName = garage.name;
  const contact = garage.contact || {};
  const brand = garage.brand || {};
  const services = garage.services || [];
  const reviews = garage.reviews || [];
  const pricing = garage.pricing;
  const openingHours = garage.openingHours || [];
  const address = garage.address || garage.branches?.[0]?.address;
  const mapEmbed = garage.mapEmbed;
  const logoPath = garage.logoPath;
  const stripeLinks = garage.stripeLinks;
  const tagline = garage.tagline;
  const content = garage.content || {};
  
  // Calculate average rating from reviews if available
  const reviewsWithRatings = reviews.filter((r: any) => typeof r.rating === 'number');
  const averageRating = reviewsWithRatings.length > 0
    ? (reviewsWithRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / reviewsWithRatings.length).toFixed(1)
    : undefined;
  
  // Extract Google review data if available (from content or garage metadata)
  const googleReviewCount = (garage as any)?.googleReviewCount;
  const googleReviewLink = (garage as any)?.googleReviewLink;

  return (
    <div className="min-h-screen bg-black">
      {/* Dark dynamic hero section with rotating greeting + 3 headline messages */}
      <GarageHero garage={garage} />

      {/* Reviews carousel - only render if reviews exist */}
      {reviews.length > 0 && (
        <ReviewsCarousel reviews={reviews} />
      )}

      {/* Service highlights - only render if services exist */}
      {services.length > 0 && (
        <ServicesGrid services={services} />
      )}

      {/* MOT & service pricing */}
      {pricing && <PricingCards pricing={pricing} />}

      {/* Opening hours - only render if opening hours exist */}
      {openingHours.length > 0 && (
        <OpeningHours hours={openingHours} />
      )}

      {/* Mini hero badge - placed between OpeningHours and EnquiryForm */}
      <div className="text-xs uppercase bg-white/10 px-3 py-1 rounded-md text-white text-center w-fit mx-auto mb-6">
        SUPERCHARGED MODE • POWERED BY TORQUESITES
      </div>

      {/* Booking form - scroll anchor for sticky CTA (id="booking-form" is in EnquiryForm) */}
      <EnquiryForm
        garageName={garageName}
        toEmail={contact.email || "info@premium-garage.example"}
        brandPrimary={brand.primary || "#1A1A1A"}
        garageSlug={garage.slug}
        whatsappNumber={contact.whatsapp}
        garageAddress={address}
      />

      {/* Mini hero section - trust-building content with dynamic messaging */}
      <MiniHeroSection
        messaging={{
          heading: content.aboutBlurb ? undefined : "Trusted by Local Drivers",
          subtext: content.aboutBlurb || tagline || "Our experienced technicians provide honest, high-quality service that keeps our customers coming back. You're in safe hands — just ask the locals."
        }}
        brand={brand}
        meta={{
          garageName: garageName,
          location: address?.split(',')?.[address.split(',').length - 2]?.trim() || undefined
        }}
      />

      {/* Embedded map */}
      {mapEmbed && (
        <MapEmbed
          name={garageName}
          address={address}
          mapUrl={mapEmbed}
          garage={garage}
        />
      )}

      {/* Contact details */}
      {(contact.phone || contact.email) && (
        <ContactDetails phone={contact.phone} email={contact.email} />
      )}

      {/* Full review block - only render if reviews exist */}
      {reviews.length > 0 && (
        <Reviews
          garage={garage}
          googleReviewCount={googleReviewCount}
          googleReviewLink={googleReviewLink}
          averageRating={averageRating}
        />
      )}

      {/* Spacer to offset Sticky CTA bar */}
      <div className="h-[88px] sm:h-[72px]" />
      <Footer garage={garage} tier={tier} />
      <StickyActionsClient
        logoPath={logoPath}
        phoneNumber={contact.phone}
        stripeLinks={stripeLinks}
      />
    </div>
  );
}

