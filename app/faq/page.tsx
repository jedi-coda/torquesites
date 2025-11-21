import React from "react";

export const metadata = {
  title: "FAQ | TorqueSites",
  description: "Frequently asked questions about TorqueSites.",
};

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

      <h2 className="text-2xl font-semibold mb-2">What is TorqueSites?</h2>
      <p className="mb-6">
        TorqueSites builds high-performance websites for UK garages.
      </p>

      <h2 className="text-2xl font-semibold mb-2">Do I need to pay upfront?</h2>
      <p className="mb-6">
        Turbo includes a 14-day test drive. Supercharged requires full payment.
      </p>

      <h2 className="text-2xl font-semibold mb-2">How long does it take to launch?</h2>
      <p className="mb-6">
        Turbo: 7 days. Supercharged: 10–14 days.
      </p>
    </div>
  );
}

