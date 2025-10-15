"use client";

import { motion } from "framer-motion";
import Hero from "@/components/Hero";
import ServicesGrid from "@/components/ServicesGrid";
import OpeningHours from "@/components/OpeningHours";
import PricingCards from "@/components/PricingCards";
import EnquiryForm from "@/components/EnquiryForm";
import Reviews from "@/components/ui/Reviews";
import GarageMap from "@/components/GarageMap";
import Footer from "@/components/Footer";
import StickyActionBar from "@/components/StickyActions";

type GarageData = {
  name: string;
  phone: string;
  emailFallback: string;
  address: string;
  heroLine: string;
  heroImage: string;
  colors: { primary: string; secondary: string };
  logo: string;
  services: { icon?: string; title?: string; description?: string; name?: string; desc?: string; image?: string; price?: number }[];
  hours: { day: string; open: string; close: string }[];
  priceId?: string; // Stripe priceId
};

export default function GarageMicrosite({ data }: { data: GarageData }) {
  if (!data) return <p>Garage not found</p>;

  const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });

  // Transform services data - handle both new and legacy formats
  const transformedServices = data.services.map(service => {
    // Handle new format with icon, title, description
    if (service.icon && service.title && service.description) {
      return {
        icon: service.icon,
        title: service.title,
        description: service.description
      };
    }
    // Handle legacy format with name, desc
    else if (service.name && service.desc) {
      return {
        icon: getServiceIcon(service.name),
        title: service.name,
        description: service.desc
      };
    }
    // Fallback
    return {
      icon: 'wrench',
      title: 'Service',
      description: 'Professional automotive service'
    };
  }).filter(service => service.title && service.description);

  // Transform opening hours
  const transformedHours = data.hours.map(hour => {
    const cleanDay = hour.day.trim().toLowerCase();
    const isToday = cleanDay === today.toLowerCase();

    return {
      day: hour.day.trim(),
      hours: `${hour.open}${hour.close ? ` - ${hour.close}` : ''}`,
      open: isToday
    };
  });

  return (
    <main className="font-sans text-gray-900">
      {/* Hero Section */}
      <section id="hero" data-section="hero">
        <Hero />
      </section>

      {/* GarageServices */}
      <ServicesGrid services={transformedServices} />

      {/* TransparentPricing */}
      <PricingCards />

      {/* CustomerReviews */}
      <Reviews garage={{
        slug: data.name.toLowerCase().replace(/\s+/g, '-'),
        name: data.name,
        reviews: [
          { quote: "Excellent service and professional team. They fixed my car quickly and explained everything clearly. Highly recommended!", author: "Sarah M." },
          { quote: "Quick, reliable, and great value for money. The team at Newtown Garage really knows their stuff. Will definitely be back!", author: "John D." },
          { quote: "Friendly staff and quality work. They took the time to explain what needed doing and gave me a fair price. Very professional!", author: "Emma R." }
        ]
      }} />

      {/* OpeningHours */}
      <OpeningHours 
        customSchedule={transformedHours.map(hour => ({
          day: hour.day,
          hours: hour.hours,
          isClosed: !hour.open
        }))}
        brandColor="#22aabb"
        phone={data.phone}
      />

      {/* GoogleMap */}
      <GarageMap 
        src="https://www.google.com/maps?q=Newtown+Garage+Chesham&output=embed"
        height={400}
        borderColor="#e5e7eb"
      />

      {/* Contact Details / Enquiry Form */}
      <section id="enquiry" data-section="enquiry">
        <EnquiryForm 
          garageName={data.name}
          toEmail={data.emailFallback}
          brandPrimary={data.colors.primary}
          garageSlug={data.name.toLowerCase().replace(/\s+/g, '-')}
        />
      </section>

      {/* Footer */}
      <Footer />

      {/* Sticky Action Bar */}
      <StickyActionBar 
        logoPath="/logos/newtown-logo.png"
        phoneNumber={data.phone}
        onBook={() => {
          const el = document.getElementById("enquiry");
          el?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
        onCall={() => {
          window.location.href = `tel:${data.phone.replace(/\s/g, '')}`;
        }}
        onPartnerSlot={() => {
          window.open("https://www.torquesites.co.uk/partnership", "_blank", "noopener,noreferrer");
        }}
      />

    </main>
  );
}

// Helper function for icon selection
function getServiceIcon(serviceName: string): string {
  const name = serviceName.toLowerCase();
  if (name.includes('mot') || name.includes('test')) return 'wrench';
  if (name.includes('service') || name.includes('servicing')) return 'oil';
  if (name.includes('tyre') || name.includes('tire')) return 'car';
  if (name.includes('brake')) return 'alert-circle';
  if (name.includes('diagnostic') || name.includes('repair')) return 'alert-circle';
  if (name.includes('air') || name.includes('conditioning')) return 'alert-circle';
  return 'wrench';
}
