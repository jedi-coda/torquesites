import React from "react";

export const metadata = {
  title: "Terms of Service | TorqueSites",
  description: "Terms of Service for TorqueSites, a trading name of MOT Match Ltd.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

      <p className="mb-4">
        TorqueSites is a trading name of MOT Match Ltd (company number: 14829863).
        By using this website or any TorqueSites services, you agree to the following terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Service Overview</h2>
      <p className="mb-4">
        TorqueSites provides website design, hosting, and digital tools for UK garages.
        All services are delivered as described at the time of purchase.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Payments</h2>
      <p className="mb-4">
        Payments are processed securely via Stripe. Subscription fees renew automatically
        unless cancelled.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Cancellations</h2>
      <p className="mb-4">
        You may cancel at any time. Cancellation stops future payments but does not
        refund past payments.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. Contact</h2>
      <p>
        For support, email: <strong>support@torquesites.co.uk</strong>
      </p>
    </div>
  );
}

