import React from "react";

export const metadata = {
  title: "Privacy Policy | TorqueSites",
  description: "How TorqueSites collects and manages user data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        TorqueSites (a trading name of MOT Match Ltd) is committed to protecting your privacy.
        This policy explains how we collect, use, and store your personal information.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Account and contact details</li>
        <li>Website usage analytics</li>
        <li>Payment information (processed securely by Stripe)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. How We Use Data</h2>
      <p className="mb-4">
        We use your information to deliver services, process payments, and improve
        our platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Contact</h2>
      <p>
        For privacy questions: <strong>support@torquesites.co.uk</strong>
      </p>
    </div>
  );
}

