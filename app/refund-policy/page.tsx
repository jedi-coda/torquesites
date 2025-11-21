import React from "react";

export const metadata = {
  title: "Refund Policy | TorqueSites",
  description: "Refund and cancellation policy for TorqueSites.",
};

export default function RefundPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Refund & Cancellation Policy</h1>

      <p className="mb-4">
        We aim to deliver an exceptional experience with every TorqueSite.
        This policy outlines your rights regarding refunds and cancellations.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Setup Fees</h2>
      <p className="mb-4">
        Setup fees are one-time and non-refundable once work has begun.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Monthly Subscriptions</h2>
      <p className="mb-4">
        Subscriptions renew automatically. You may cancel at any time to prevent
        future charges.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Contact</h2>
      <p>
        Email: <strong>support@torquesites.co.uk</strong>
      </p>
    </div>
  );
}

