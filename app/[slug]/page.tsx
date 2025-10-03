import { notFound } from "next/navigation";
import garagesData from "@/data/garages.json";
import EnquiryForm from "@/components/EnquiryForm"; // ✅ use the client form

type Garage = {
  slug: string;
  name: string;
  brand: { primary: string; dark: string };
  contact: { phone: string; email: string; whatsapp?: string };
  hours: string;
  hero: { greeting: boolean; background: "solid" | "gradient" };
  chips: string[];
  services: string[];
  pricing: { mot: string; interimFrom: string; fullFrom: string };
  branches: { name: string; address?: string; hours?: string; phone?: string }[];
  reviews: { quote: string; author: string }[];
  mapEmbed: string;
};

const garages = garagesData as Garage[];

export function generateStaticParams() {
  return garages.map((g) => ({ slug: g.slug }));
}

export const dynamic = "force-static";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning, welcome to";
  if (hour < 18) return "Good afternoon, welcome to";
  return "Good evening, welcome to";
}

export default function GaragePage({ params }: { params: { slug: string } }) {
  const garage = garages.find((g) => g.slug === params.slug);
  if (!garage) return notFound();

  const primary = garage.brand?.primary ?? "#E91E63";
  const dark = garage.brand?.dark ?? "#0B0B0C";
  const greeting = garage.hero?.greeting ? getGreeting() : `Welcome to`;
  const heroIsGradient = garage.hero?.background === "gradient";

  return (
    <main className="min-h-screen bg-white text-neutral-900">
      {/* Partner banner */}
      <div className="w-full bg-neutral-900 text-white text-sm py-2 text-center">
        <span className="font-semibold">Partner 10:</span>{" "}
        10 Partner slots available this month.{" "}
        <a
          href="/partnership"
          className="underline underline-offset-4 decoration-white/60 hover:decoration-white"
        >
          Secure yours today.
        </a>
      </div>

      {/* Hero */}
      <section
        className="relative"
        style={{
          background: heroIsGradient
            ? `linear-gradient(90deg, ${primary} 0%, ${dark} 100%)`
            : dark,
        }}
      >
        <div className="absolute inset-0 bg-black/35" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white">
            {greeting}{" "}
            <span className="inline-block" style={{ color: primary }}>
              {garage.name.split(" ").slice(0, -1).join(" ") || garage.name}
            </span>{" "}
            <span className="text-white">{garage.name.split(" ").slice(-1).join(" ")}</span>
          </h1>

          <p className="mt-4 text-white/90 max-w-2xl">
            Worthing’s trusted experts in MOTs, servicing & full vehicle care.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`tel:${garage.contact.phone.replace(/\s+/g, "")}`}
              className="px-5 py-3 rounded-md font-semibold"
              style={{
                backgroundColor: primary,
                color: "#111",
                boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.2)",
              }}
            >
              Call {garage.contact.phone}
            </a>

            <a
              href="#reviews"
              className="px-5 py-3 rounded-md font-semibold border border-white/30 text-white hover:bg-white/10"
            >
              Read Reviews
            </a>

            <a
              href={`/partnership?garage=${encodeURIComponent(garage.slug)}`}
              className="px-5 py-3 rounded-md font-semibold bg-white text-neutral-900 hover:bg-white/90"
            >
              Secure Partner Slot
            </a>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <div className="w-full border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap gap-3 items-center">
          <span className="px-3 py-1 rounded-full bg-neutral-100 text-sm">{garage.hours}</span>
          <a
            href={`mailto:${garage.contact.email}`}
            className="px-3 py-1 rounded-full bg-neutral-100 text-sm hover:bg-neutral-200"
          >
            {garage.contact.email}
          </a>
          <a
            href={`tel:${garage.contact.phone.replace(/\s+/g, "")}`}
            className="ms-auto px-3 py-1 rounded-full text-sm font-medium"
            style={{ backgroundColor: primary, color: "#111" }}
          >
            {garage.contact.phone}
          </a>
        </div>
      </div>

      {/* Why choose */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Why Choose {garage.name.split(" ")[0]}?
        </h2>
        <p className="mt-2 text-neutral-600 max-w-3xl">
          With over 25 years’ experience, our team delivers honest, transparent care for any make,
          any model. Proud members of the Good Garage Scheme with excellent customer satisfaction.
        </p>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {garage.chips.map((chip, i) => (
            <div
              key={i}
              className="rounded-xl border bg-white py-4 px-5 flex items-center gap-3"
              style={{ borderColor: `${primary}33` }}
            >
              <span
                className="inline-block w-7 h-[3px] rounded-full"
                style={{ backgroundColor: primary }}
              />
              <span className="font-medium">{chip}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <h3 className="text-2xl font-bold">Our Services</h3>
        <p className="text-neutral-600 mt-1">
          From MOTs to diagnostics and repairs, we keep your vehicle running smoothly.
        </p>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {garage.services.map((svc, i) => (
            <div key={i} className="rounded-xl border bg-white p-5" style={{ borderColor: `${primary}33` }}>
              <div className="font-semibold">{svc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-8">
        <h3 className="text-2xl font-bold">Straightforward pricing</h3>
        <div className="mt-6 grid sm:grid-cols-3 gap-4">
          {[
            { title: "MOT (Class 4)", price: garage.pricing.mot },
            { title: "Interim Service", price: `from ${garage.pricing.interimFrom}` },
            { title: "Full Service", price: `from ${garage.pricing.fullFrom}` },
          ].map((card, i) => (
            <div key={i} className="rounded-xl border bg-white p-6" style={{ borderColor: `${primary}33` }}>
              <div className="text-sm font-semibold text-neutral-600">{card.title}</div>
              <div className="mt-2 text-3xl font-extrabold">{card.price}</div>
              <div className="mt-4">
                <a
                  href={`tel:${garage.contact.phone.replace(/\s+/g, "")}`}
                  className="px-4 py-2 rounded-md font-semibold inline-block"
                  style={{ backgroundColor: primary, color: "#111" }}
                >
                  Book now
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h3 className="text-2xl font-bold">What customers say</h3>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            {garage.reviews.map((r, i) => (
              <blockquote key={i} className="rounded-xl bg-neutral-900/70 p-5 border border-white/10">
                <p>“{r.quote}”</p>
                <footer className="mt-2 text-white/70">— {r.author}</footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Map & Contact */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h3 className="text-2xl font-bold">Find us</h3>

        <div className="mt-6 rounded-xl overflow-hidden border" style={{ borderColor: `${primary}33` }}>
          <iframe
            src={garage.mapEmbed}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6 bg-neutral-950 text-white rounded-2xl p-6">
          <div className="space-y-3">
            <h4 className="text-lg font-semibold">Call or Email</h4>
            <a
              href={`tel:${garage.contact.phone.replace(/\s+/g, "")}`}
              className="inline-block w-full sm:w-auto px-5 py-3 rounded-md font-semibold"
              style={{ backgroundColor: primary, color: "#111" }}
            >
              {garage.contact.phone}
            </a>
            <a
              href={`mailto:${garage.contact.email}`}
              className="inline-block w-full sm:w-auto ms-0 sm:ms-3 px-5 py-3 rounded-md font-semibold bg-white text-neutral-900 hover:bg-white/90"
            >
              {garage.contact.email}
            </a>
            {garage.branches?.[0]?.name && (
              <div className="text-white/80 pt-2">
                {garage.branches[0].name}
                {garage.branches[0].address ? `, ${garage.branches[0].address}` : ""}
              </div>
            )}
          </div>

          {/* ✅ Client-side enquiry form (no handlers in Server Component) */}
          <EnquiryForm
            garageName={garage.name}
            toEmail={garage.contact.email}
            brandPrimary={primary}
          />
        </div>
      </section>
    </main>
  );
}
