import React from "react";

export const metadata = {
  title: "FAQ | TorqueSites",
  description: "Frequently asked questions about TorqueSites.",
  lastUpdated: "November 2025",
};

export default function FAQPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <h2 className="text-2xl font-semibold mb-2">What is TorqueSites?</h2>
      <p className="mb-6">
        TorqueSites builds premium, high-performance websites for UK garages – fast, modern,
        and engineered for conversions.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Do I need to pay upfront?</h2>
      <p className="mb-6">
        Turbo includes a 14-day test drive with no upfront payment. Supercharged plans require
        full payment at checkout.
      </p>

      <h2 className="text-2xl font-semibold mb-2">How long does it take to launch?</h2>
      <p className="mb-6">
        Turbo launches in 7 days. Supercharged sites launch in 10–14 days.
      </p>

      <h2 className="text-2xl font-semibold mb-2">What happens if I cancel?</h2>
      <p className="mb-6">
        Your site is paused/unpublished. You can request a copy of your content at any time.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Do I own my website?</h2>
      <p className="mb-6">
        You own your content. TorqueSites owns the templates, design, code, and platform.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Can I use my own domain?</h2>
      <p className="mb-6">
        Yes — we can connect it for you.
      </p>
    </div>
  );
}

