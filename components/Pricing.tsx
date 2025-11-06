"use client";
import { useMemo } from "react";
import { Check } from "lucide-react";

const features = {
  launch: [
    "Branded microsite (basic)",
    "Email booking requests",
    "Own your customer data",
    "Basic analytics",
    "Early adopter perks (priority roadmap input)",
  ],
  pro: [
    "0% commission on bookings",
    "Branded microsite + online payments",
    "Instant Stripe payouts (you keep 100%)",
    "SMS & email reminders (at cost)",
    "Priority onboarding & support",
    "Lifetime price-lock (£99/mo)",
    "ROI: ~4 MOTs/month typically covers the fee",
  ],
  partner: [
    "Custom branding & multi-site analytics",
    "Roles & permissions",
    "API / data export",
    "Dedicated account manager & SLAs",
  ],
};

export default function Pricing() {
  // For now keep this static; later can wire to DB
  const earlyPartnerSlotsRemaining = useMemo(() => 100, []);

  return (
    <section id="pricing" className="relative py-20 bg-brand-gray">
      <div className="container">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-brand-navy">
            Choose Your Performance Mode
          </h2>
          <p className="mt-3 text-brand-navy/70">
            Two precision-engineered packages — built for speed, conversion, and reputation.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-2 items-stretch">
          {/* Launch */}
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 p-6 flex flex-col">
            <div className="mb-3 text-sm font-medium text-brand-navy">Launch (Beta)</div>
            <div className="mb-1 text-3xl font-semibold text-brand-navy">£0</div>
            <div className="mb-6 text-sm text-brand-navy/70">per month (beta)</div>
            <ul className="space-y-3 mb-6">
              {features.launch.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-5 w-5 mt-0.5 text-brand-pink" />
                  <span className="text-brand-navy/80">{f}</span>
                </li>
              ))}
            </ul>
            <button className="mt-auto inline-flex justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white bg-brand-navy hover:opacity-90 transition">
              Reserve Free Beta Slot
            </button>
          </div>

          {/* Pro (Early Partner Offer) */}
          <div className="relative rounded-2xl bg-white shadow-[0_0_0_2px_rgba(216,27,96,0.25)] p-6 flex flex-col">
            <span className="absolute -top-3 left-6 rounded-full bg-brand-pink text-white text-xs font-semibold px-2 py-1 shadow">
              Early Partner Offer
            </span>
            <div className="mb-3 text-sm font-medium text-brand-navy">Pro — Recommended</div>
            <div className="mb-1 text-3xl font-semibold text-brand-navy">
              £99<span className="text-base font-normal text-brand-navy/60">/month</span>
            </div>
            <div className="mb-2 text-brand-navy/70">
              <span className="line-through mr-2">£1,499</span>
              <span className="font-semibold text-brand-pink">£999 setup</span> for first{" "}
              <span className="font-semibold">{earlyPartnerSlotsRemaining}</span> garages
            </div>
            <div className="mb-6 text-xs text-brand-navy/60">Price-lock for life.</div>
            <ul className="space-y-3 mb-6">
              {features.pro.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="h-5 w-5 mt-0.5 text-brand-pink" />
                  <span className="text-brand-navy/80">{f}</span>
                </li>
              ))}
            </ul>
            <button className="mt-auto inline-flex justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white bg-brand-pink hover:opacity-90 transition">
              Secure Early Partner Package
            </button>
          </div>
        </div>

        {/* Trust & ROI */}
        <div className="mt-8 grid gap-4 md:grid-cols-3 text-center text-sm text-brand-navy/70">
          <div>🔒 Lifetime price-lock</div>
          <div>✅ 60-day onboarding guarantee</div>
          <div>⚡ ~4 extra MOTs/month covers the fee</div>
        </div>

        {/* Fine print */}
        <p className="mt-6 text-xs text-center text-brand-navy/50">
          Payments processed by Stripe at standard UK rates. SMS reminders billed at cost.
        </p>
      </div>
    </section>
  );
}

