import React from "react";

export const metadata = {
  title: "Terms of Service | TorqueSites",
  description: "Terms of Service for TorqueSites, a trading name of MOT Match Ltd.",
  lastUpdated: "November 2025",
};

export default function TermsPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last updated: November 2025</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. What We Provide</h2>
      <p className="mb-4">
        TorqueSites is a trading name of MOT Match Ltd (company number: 14829863).
        We build, host, and maintain high-performance websites for UK garages.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Customer Responsibilities</h2>
      <p className="mb-4">
        You agree to supply accurate information, provide lawful content, and comply with UK law.
        You must keep your details updated and treat our team professionally.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Ownership</h2>
      <p className="mb-4">
        You own your content (text, images, branding). TorqueSites owns the design, templates,
        platform, and code. If you cancel, we can provide a content export on request, but the
        platform and design remain the property of MOT Match Ltd.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Payments & Billing</h2>
      <p className="mb-4">
        Turbo includes a 14-day test drive. You must cancel before day 14 to avoid charges.
        Supercharged and VIP-Exclusive plans are paid upfront. Subscriptions renew automatically
        unless cancelled.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Failed Payments</h2>
      <p className="mb-4">
        If billing fails, you have a 7-day grace period. After this, your site is paused or
        unpublished until payment is resolved.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Termination</h2>
      <p className="mb-4">
        We may suspend service if you breach terms, misuse the platform, or fail to pay.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">7. Limitation of Liability</h2>
      <p className="mb-4">
        We are not liable for indirect losses or outages caused by third-party providers.
        Our liability is limited to the amount paid in the last 12 months.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">8. Contact</h2>
      <p className="mb-4">support@torquesites.co.uk</p>
    </div>
  );
}

