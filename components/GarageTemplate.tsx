import Link from "next/link";
import EnquiryForm from "./EnquiryForm";

/* ------------ types ------------ */

type Brand = { primary?: string; dark?: string };
type Contact = { phone?: string; email?: string; whatsapp?: string };

type Branch = {
  name?: string;
  address?: string;
  hours?: string;
  phone?: string;
};

type Review = { quote: string; author: string };

type Garage = {
  slug: string;
  name: string;
  brand?: Brand;
  contact?: Contact;
  hours?: string;
  hero?: { greeting?: boolean; background?: "solid" | "gradient" };
  chips?: string[];
  services?: string[];
  pricing?: { mot?: string; interimFrom?: string; fullFrom?: string };
  branches?: Branch[];
  reviews?: Review[];
  mapEmbed?: string;
};

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

  const phoneHref = garage.contact?.phone
    ? `tel:${garage.contact.phone.replace(/\s+/g, "")}`
    : undefined;

  const whatsappHref = garage.contact?.whatsapp
    ? `https://wa.me/${garage.contact.whatsapp.replace(/\D/g, "")}`
    : undefined;

  return (
    <div className="min-h-screen bg-white text-neutral-900">
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

      {/* HERO */}
      <header
        className="relative w-full flex items-center"
        style={{ ...bgStyle, minHeight: "55vh" }}
      >
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <h1 className="text-white text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow">
            {garage.hero?.greeting !== false ? `${greeting()}, ` : ""}welcome to{" "}
            <span style={{ color: accent }}>{garage.name}</span>
          </h1>
          <p className="mt-4 text-white/90 text-base sm:text-lg max-w-2xl">
            Worthing’s trusted experts in MOTs, servicing & full vehicle care.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            {garage.contact?.phone && (
              <a
                href={phoneHref}
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white shadow-md"
                style={{ backgroundColor: accent }}
              >
                Call {garage.contact.phone}
              </a>
            )}

            <a
              href="#reviews"
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold bg-white/10 text-white border border-white/30 backdrop-blur"
            >
              Read Reviews
            </a>

            <a
              href={`/partnership?garage=${encodeURIComponent(garage.slug)}`}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold bg-white text-neutral-900 border border-neutral-200"
            >
              Secure Partner Slot
            </a>
          </div>
        </div>
      </header>

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
                href={`mailto:${garage.contact.email}`}
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
      <section className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Why Choose */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Why Choose {garage.name.split(" ")[0]}?
          </h2>
          <p className="text-neutral-600 mb-6">
            With over 25 years’ experience, our team delivers honest, transparent care
            for any make, any model. Proud members of the Good Garage Scheme with
            excellent customer satisfaction.
          </p>

          {garage.chips && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {garage.chips.map((c, i) => (
                <div
                  key={i}
                  className="rounded-xl border bg-white p-4"
                  style={{ borderColor: accentSoft, boxShadow: "0 1px 0 rgba(0,0,0,0.02)" }}
                >
                  <div className="h-1 w-8 rounded" style={{ backgroundColor: accent }} />
                  <div className="mt-3 font-medium">{c}</div>
                </div>
              ))}
            </div>
          )}

          {/* Services */}
          {garage.services && (
            <>
              <h3 className="text-2xl font-bold mt-10 mb-4">Our Services</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {garage.services.map((s, i) => (
                  <div
                    key={i}
                    className="rounded-xl border bg-white p-5 hover:shadow-sm transition"
                    style={{ borderColor: accentSoft }}
                  >
                    <div className="h-1 w-8 rounded" style={{ backgroundColor: accent }} />
                    <div className="mt-3 font-medium">{s}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Pricing */}
          {garage.pricing && (
            <>
              <h3 className="text-2xl font-bold mt-10 mb-4">Straightforward pricing</h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <CardPrice title="MOT (Class 4)" price={garage.pricing.mot} />
                <CardPrice
                  title="Interim Service"
                  price={`from ${garage.pricing.interimFrom ?? "£—"}`}
                  subtitle="Oil & filter, checks"
                />
                <CardPrice
                  title="Full Service"
                  price={`from ${garage.pricing.fullFrom ?? "£—"}`}
                  subtitle="Manufacturer schedule"
                />
              </div>
            </>
          )}
        </div>

        {/* Right: Booking (client form inside) */}
        <aside id="booking" className="lg:col-span-1">
          <div
            className="rounded-2xl border bg-white p-6 sticky top-4"
            style={{ borderColor: accentSoft }}
          >
            <h3 className="text-xl font-bold mb-4">Quick booking</h3>

            <EnquiryForm
              garageName={garage.name}
              toEmail={garage.contact?.email ?? ""}
              brandPrimary={accent}
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
      </section>

      {/* Reviews (dark band) */}
      {garage.reviews && garage.reviews.length > 0 && (
        <section
          id="reviews"
          className="py-14"
          style={{ backgroundColor: dark, color: "#fff" }}
        >
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-6">What Our Customers Say</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {garage.reviews.slice(0, 3).map((r, i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <p className="italic">“{r.quote}”</p>
                  <p className="mt-3 text-sm text-white/80">— {r.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Branches + Map */}
      <section className="container mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-4">Find Us</h3>

        {garage.branches && garage.branches.length > 0 && (
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {garage.branches.map((b, i) => (
              <div
                key={i}
                className="rounded-xl border bg-white p-5"
                style={{ borderColor: accentSoft }}
              >
                <div className="font-semibold">{b.name}</div>
                {b.address && <div className="text-sm text-neutral-600">{b.address}</div>}
                {b.hours && <div className="text-sm text-neutral-600 mt-1">{b.hours}</div>}
                <div className="mt-3 flex gap-2">
                  {b.phone && (
                    <a
                      href={`tel:${b.phone.replace(/\s+/g, "")}`}
                      className="rounded-lg px-3 py-1.5 text-sm text-white"
                      style={{ backgroundColor: accent }}
                    >
                      Call {b.phone}
                    </a>
                  )}
                  <a
                    href="#booking"
                    className="rounded-lg px-3 py-1.5 text-sm border"
                    style={{ borderColor: accentSoft }}
                  >
                    Book MOT
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {garage.mapEmbed && (
          <div
            className="w-full rounded-xl overflow-hidden border"
            style={{ borderColor: accentSoft }}
          >
            <iframe
              src={garage.mapEmbed}
              width="100%"
              height="400"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            />
          </div>
        )}
      </section>

      {/* Contact band (dark) with client form */}
      <section className="py-12" style={{ backgroundColor: dark, color: "#fff" }}>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl p-6 bg-black/20 border border-white/10">
            <h4 className="text-xl font-bold mb-3">Call or Email</h4>
            <p className="text-white/80 mb-4">Fastest way to book your MOT, service or repair.</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {garage.contact?.phone && (
                <a
                  href={phoneHref}
                  className="rounded-lg px-5 py-3 font-semibold"
                  style={{ backgroundColor: accent, color: "#fff" }}
                >
                  {garage.contact.phone}
                </a>
              )}
              {garage.contact?.email && (
                <a
                  href={`mailto:${garage.contact.email}`}
                  className="rounded-lg px-5 py-3 font-semibold bg-white text-neutral-900"
                >
                  Email Us
                </a>
              )}
            </div>
            {garage.branches?.[0]?.address && (
              <p className="mt-4 text-sm text-white/80">{garage.branches[0].address}</p>
            )}
          </div>

          <div className="rounded-2xl p-6 bg-black/20 border border-white/10">
            <h4 className="text-xl font-bold mb-3">Quick Enquiry</h4>

            <EnquiryForm
              garageName={garage.name}
              toEmail={garage.contact?.email ?? ""}
              brandPrimary={accent}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-neutral-50 border-t">
        <div className="container mx-auto px-4 text-center">
          <div className="flex gap-4 justify-center text-sm text-neutral-600">
            <span>🔒 SSL Secured</span>
            <span>🇬🇧 UK Support</span>
            <span>⚡ Fast Hosting</span>
            <span>✅ No Hidden Fees</span>
          </div>
          <p className="mt-6 text-neutral-500 text-sm">
            Built for independent garages — everything you need to win bookings and look
            world-class online.
          </p>
          <p className="mt-2 text-neutral-400 text-xs">
            © {new Date().getFullYear()} <span className="font-semibold">TorqueSites</span>.
            All rights reserved.
          </p>
        </div>
      </footer>

      {/* Sticky mobile CTA (anchors only) */}
      {garage.contact?.phone && (
        <div className="fixed bottom-3 left-0 right-0 px-3 md:hidden">
          <div className="mx-auto max-w-md grid grid-cols-2 gap-2">
            <a
              href={phoneHref}
              className="text-center rounded-full py-3 font-semibold text-white"
              style={{ backgroundColor: accent }}
            >
              Call
            </a>
            <a
              href="#booking"
              className="text-center rounded-full py-3 font-semibold border bg-white"
              style={{ borderColor: accentSoft }}
            >
              Book
            </a>
          </div>
        </div>
      )}
    </div>
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
