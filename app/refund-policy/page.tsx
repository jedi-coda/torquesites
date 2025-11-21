import React from "react";

export const metadata = {
  title: "Refund Policy | TorqueSites",
  description: "Refund and cancellation policy for TorqueSites.",
  lastUpdated: "November 2025",
};

export default function RefundPolicyPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Refund & Cancellation Policy</h1>
      <p className="mb-4">Last updated: November 2025</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Setup Fees</h2>
      <p className="mb-4">
        Setup fees cover design, build, configuration, integrations, and launch. Once work
        begins, setup fees are non-refundable.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Turbo — 14-Day Test Drive</h2>
      <p className="mb-4">
        Turbo customers must cancel before Day 14 to avoid charges. If not cancelled, the setup
        fee is automatically billed on Day 15. Subscription billing begins 30 days later.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Supercharged & VIP-Exclusive</h2>
      <p className="mb-4">
        These plans are paid upfront and are non-refundable unless required by law. Discounts
        cannot be applied retroactively.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Subscription Charges</h2>
      <p className="mb-4">
        Subscriptions renew automatically. Cancellation stops future payments but does not
        refund previous charges.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Failed Payments</h2>
      <p className="mb-4">
        If a payment fails, Stripe retries automatically. You receive a 7-day grace period.
        After this, the site is paused until payment is resolved.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Cancelling Your Account</h2>
      <p className="mb-4">
        You may cancel anytime via your Stripe customer portal or by emailing:
        support@torquesites.co.uk.
      </p>
    </div>
  );
}

