import Link from "next/link";
import EnquiryForm from "./EnquiryForm";
import GarageMap from "./GarageMap";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import BrandTheme from "@/components/BrandTheme";
import { AccentCard } from "@/components/ui/AccentCard";
import { PricingCards } from "@/components/PricingCards";
import ReviewsCarousel from "@/components/ReviewsCarousel";
import CTARail from "@/components/CTARail";
import { Wrench, BadgeCheck, Fuel, Zap, Shield, Clock } from "lucide-react";
import type { Garage } from "@/lib/garage";
import { telLink, mailtoLink } from "@/lib/links";
import StickyActions from "@/components/StickyActions";

/* ------------ types ------------ */

// Types now imported from lib/garage

/* ------------ helpers (no client state) ------------ */

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function safeColor(hex?: string, fallback = "#1F4FC9") {
  if (!hex) return fallback;
  const ok = /^#([0-9A-Fa-f]{3}){1,2}$/.test(hex);
  return ok ? hex : fallback;
}

function softFromHex(hex: string, alpha = 0.12) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/* ------------ component (server) ------------ */

export default function GarageTemplate({ garage }: { garage: Garage }) {
  const accent = safeColor(garage.brand?.primary);
  const dark = safeColor(garage.brand?.dark, "#0B0B0C");
  const accentSoft = softFromHex(accent);

  const bgStyle =
    garage.hero?.background === "gradient"
      ? { background: `linear-gradient(135deg, ${accent} 0%, ${dark} 100%)` }
      : { backgroundColor: dark };

  const phoneHref = telLink(garage.contact?.phone) || undefined;

  const whatsappHref = garage.contact?.whatsapp
    ? `https://wa.me/${garage.contact.whatsapp.replace(/\D/g, "")}`
    : undefined;

  return (
            <BrandTheme garage={garage}>
              <main className="pb-28 md:pb-32">
                <div className="min-h-screen bg-white text-neutral-900 max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Partner banner */}
      <div className="w-full text-xs sm:text-sm bg-neutral-900 text-white py-2 text-center">
        <span className="font-semibold">Partner 10:</span>{" "}
        10 Partner slots available this month.{" "}
        <Link
          href="/partnership"
          className="underline decoration-2 underline-offset-2"
        >
          Secure yours today.
        </Link>
      </div>

              <Hero 
                garageName={garage.name}
                brandSlug={garage.slug}
                theme={{
                  primary: garage.theme?.accent || garage.brand?.primary || '#0a4bff',
                  secondary: garage.theme?.accent2 || garage.brand?.dark,
                  textOnPrimary: 'light'
                }}
                hero={{
                  variant: 'image',
                  images: [
                    {
                      id: `${garage.slug}-prestige`,
                      src: '/hero/prestige.jpg',
                      alt: `${garage.name} prestige service`,
                      variant: 'prestige',
                      objectPosition: 'center right'
                    },
                    {
                      id: `${garage.slug}-customer`,
                      src: '/hero/customer.jpg',
                      alt: `${garage.name} customer service`,
                      variant: 'customer',
                      objectPosition: 'center right'
                    },
                    {
                      id: `${garage.slug}-tech`,
                      src: '/hero/tech.jpg',
                      alt: `${garage.name} diagnostics`,
                      variant: 'tech',
                      objectPosition: 'center right'
                    },
                    {
                      id: `${garage.slug}-solid`,
                      src: '/hero/prestige.jpg',
                      alt: `${garage.name} service`,
                      variant: 'prestige',
                      objectPosition: 'center right'
                    }
                  ]
                }}
                contact={garage.contact}
              />

      {/* SWIFT-STYLE UTILITY BAR */}
      <section className="bg-white border-b border-neutral-200">
        <div className="container mx-auto px-4 py-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 items-center">
            {garage.hours && (
              <span
                className="text-sm px-3 py-1 rounded-full border"
                style={{ borderColor: accent }}
              >
                {garage.hours}
              </span>
            )}
            {garage.contact?.email && (
              <a
                href={mailtoLink(garage.contact.email)}
                className="text-sm px-3 py-1 rounded-full border hover:bg-neutral-50"
              >
                {garage.contact.email}
              </a>
            )}
            {garage.contact?.whatsapp && (
              <a
                href={whatsappHref}
                target="_blank"
                className="text-sm px-3 py-1 rounded-full border hover:bg-neutral-50"
              >
                WhatsApp us
              </a>
            )}
          </div>

          {garage.contact?.phone && (
            <a
              href={phoneHref}
              className="text-sm font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: accent, color: "#fff" }}
            >
              {garage.contact.phone}
            </a>
          )}
        </div>
      </section>

                {/* BOOKING + WHY CHOOSE */}
                <section className="py-10 md:py-12">
                  <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Why Choose */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              Why Choose {garage.name.split(" ")[0]}?
            </h2>
            <p className="text-neutral-600 mb-6">
              {garage.content?.aboutBlurb?.trim() ||
                "With over 25 years' experience, our team delivers honest, transparent care for any make, any model."}
            </p>

            {garage.chips && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {garage.chips.slice(0, 6).map((c, i) => (
                  <AccentCard key={i} garage={garage} className="p-5 md:p-6">
                    <div className="flex items-start gap-3">
                      <BadgeCheck className="h-5 w-5" style={{ color: 'var(--ts-accent)' }} />
                      <div>
                        <h3 className="font-semibold truncate" title={c}>{c}</h3>
                        <p className="text-sm text-slate-600">Trusted expertise</p>
                      </div>
                    </div>
                  </AccentCard>
                ))}
                {/* hidden for microsite polish */}
                {garage.chips.length > 6 && (
                  <div className="col-span-full text-center text-sm text-neutral-500 py-4">
                    +{garage.chips.length - 6} more services available
                  </div>
                )}
              </div>
            )}

            {/* Services */}
            {(garage.content?.services?.length ? garage.content.services : garage.services)?.length && (
              <>
                <h3 className="text-2xl md:text-3xl font-bold mt-10 mb-6">Our Services</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {(garage.content?.services?.length ? garage.content.services : garage.services)!
                    .filter(s => ['MOT', 'Servicing', 'Diagnostics', 'EV/Hybrid'].includes(s) || s.includes('Tyres'))
                    .slice(0, 4)
                    .map((s, i) => (
                    <AccentCard key={i} garage={garage} className="p-5 md:p-6">
                      <div className="flex items-start gap-3">
                        <Wrench className="h-5 w-5" style={{ color: 'var(--ts-accent)' }} />
                        <div>
                          <h3 className="font-semibold">{s}</h3>
                          <p className="text-sm text-slate-600">Professional service</p>
                        </div>
                      </div>
                    </AccentCard>
                  ))}
                </div>
              </>
            )}

            {/* Pricing */}
            {garage.pricing && (
              <>
                <h3 className="text-2xl md:text-3xl font-bold mt-10 mb-6">
                  Straightforward pricing
                </h3>
                <PricingCards 
                  items={[
                    { 
                      title: "MOT (Class 4)", 
                      price: garage.pricing.mot || "£54.85", 
                      badge: "DVSA Approved",
                      include: ["Full inspection", "Certificate", "Free re-test if needed"]
                    },
                    { 
                      title: "Interim Service", 
                      price: `from ${garage.pricing.interimFrom ?? "£89"}`,
                      note: "Oil & filter, checks",
                      include: ["Oil change", "Filter replacement", "Basic checks"]
                    },
                    { 
                      title: "Full Service", 
                      price: `from ${garage.pricing.fullFrom ?? "£149"}`,
                      note: "Manufacturer schedule",
                      include: ["Complete service", "All filters", "Comprehensive checks"]
                    }
                  ]} 
                  garage={garage} 
                />
              </>
            )}
          </div>

        {/* Right: Booking (client form inside) */}
        <aside id="booking" className="lg:col-span-1">
          <div
            className="rounded-2xl bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border shadow-sm sticky top-6 p-5 md:p-6"
            style={{ borderColor: 'var(--ts-border)', borderWidth: 1 }}
          >
            <h3 className="text-xl font-bold mb-4">Quick booking</h3>

            <EnquiryForm
              garageName={garage.name}
              toEmail={garage.contact?.email ?? ""}
              brandPrimary="var(--ts-accent)"
            />

            {garage.contact?.phone && (
              <p className="text-xs text-neutral-500 mt-2">
                Or call:{" "}
                <a className="underline" href={phoneHref}>
                  {garage.contact.phone}
                </a>
              </p>
            )}
          </div>
                  </aside>
                </div>
                  </div>
                </section>

                {/* Reviews */}
                {garage.reviews && garage.reviews.length > 0 && (
                  <section className="py-10 md:py-12">
                    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                      <h3 className="text-2xl md:text-3xl font-bold mb-6">What Our Customers Say</h3>
                      <ReviewsCarousel
                        reviews={garage.reviews.map((r: any) => ({ quote: r.quote, author: r.author }))}
                        garage={garage}
                      />
                    </div>
                  </section>
                )}

                {/* Branches + Map */}
                <section className="py-10 md:py-12">
                  <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl md:text-3xl font-bold mb-6">Find Us</h3>

        {garage.branches && garage.branches.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {garage.branches.map((b, i) => (
              <AccentCard key={i} garage={garage} className="p-5">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5" style={{ color: 'var(--ts-accent)' }} />
                  <div>
                    <div className="font-semibold">{b.name}</div>
                    {b.address && (
                      <div className="text-sm text-neutral-600">{b.address}</div>
                    )}
                    {b.hours && (
                      <div className="text-sm text-neutral-600 mt-1">{b.hours}</div>
                    )}
                    <div className="mt-3 flex gap-2">
                      {b.phone && (
                        <a
                          href={telLink(b.phone)}
                          className="rounded-lg px-3 py-1.5 text-sm text-white"
                          style={{ backgroundColor: 'var(--ts-accent)' }}
                        >
                          Call {b.phone}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </AccentCard>
            ))}
          </div>
        )}

                    {garage.mapEmbed && (
                      <GarageMap src={garage.mapEmbed} borderColor="var(--ts-border)" height={400} />
                    )}
                  </div>
                </section>

                {/* CTA Rail */}
                <CTARail garage={garage} />

                {/* Contact band (dark) with client form */}
                <section className="py-10 md:py-12">
                  <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-6 bg-black/20 border border-white/10">
            <h4 className="text-xl font-bold mb-3">Call or Email</h4>
            <p className="text-white/80 mb-4">
              Fastest way to book your MOT, service or repair.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {garage.contact?.phone && (
                <a
                  href={phoneHref}
                  className="rounded-lg px-5 py-3 font-semibold"
                  style={{ backgroundColor: 'var(--ts-accent)', color: 'var(--ts-contrast)' }}
                >
                  {garage.contact.phone}
                </a>
              )}
              {garage.contact?.email && (
                <a
                  href={mailtoLink(garage.contact.email)}
                  className="rounded-lg px-5 py-3 font-semibold bg-white text-neutral-900"
                >
                  Email Us
                </a>
              )}
            </div>
            {garage.branches?.[0]?.address && (
              <p className="mt-4 text-sm text-white/80">
                {garage.branches[0].address}
              </p>
            )}
          </div>

          <div className="rounded-2xl p-6 bg-black/20 border border-white/10">
            <h4 className="text-xl font-bold mb-3">Quick Enquiry</h4>

            <EnquiryForm
              garageName={garage.name}
              toEmail={garage.contact?.email ?? ""}
              brandPrimary="var(--ts-accent)"
            />
          </div>
        </div>
      </div>
    </section>

    <StickyActions slug={garage.slug} phone={garage.contact?.phone} brand={garage.brand ?? {}} starterHref={garage.stripeLinks?.starter} />
      </div>
    </main>
  </BrandTheme>
  );
}

/* ------------ simple pricing card (no event handlers) ------------ */

function CardPrice({
  title,
  price,
  subtitle,
}: {
  title: string;
  price?: string;
  subtitle?: string;
}) {
  return (
    <div
      className="rounded-2xl border bg-white p-6 flex flex-col"
      style={{ borderColor: "rgba(0,0,0,0.06)" }}
    >
      <div className="text-sm text-neutral-500">{title}</div>
      <div className="mt-2 text-3xl font-extrabold">{price ?? "£—"}</div>
      {subtitle && <div className="text-xs text-neutral-500 mt-1">{subtitle}</div>}
      <div className="mt-auto">
        <a
          href="#booking"
          className="inline-flex mt-4 rounded-lg px-4 py-2 font-semibold text-white bg-neutral-900"
        >
          Book now
        </a>
      </div>
    </div>
  );
}


