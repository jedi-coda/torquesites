import React from "react";

export const metadata = {
  title: "Privacy Policy | TorqueSites",
  description: "How TorqueSites collects and manages user data.",
  lastUpdated: "November 2025",
};

export default function PrivacyPage() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: November 2025</p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">1. Introduction</h2>
      <p className="mb-4">
        TorqueSites is a trading name of MOT Match Ltd. We comply with UK GDPR and are committed
        to protecting your privacy. This policy explains how we collect, use, and safeguard data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">2. Data Controller</h2>
      <p className="mb-4">
        MOT Match Ltd, 14/2e Docklands Business Centre, 10–16 Tiller Road, London E14 8PX.
        Contact: support@torquesites.co.uk.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">3. Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Account details and contact information</li>
        <li>Business information and branding</li>
        <li>Payment info (processed via Stripe)</li>
        <li>Website usage analytics & cookies</li>
        <li>Form submissions from TorqueSites-built websites</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-3">4. How We Use Data</h2>
      <p className="mb-4">
        We use data to deliver and maintain your website, process payments, improve performance,
        provide support, and meet legal obligations.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">5. Third-Party Processors</h2>
      <p className="mb-4">
        We work with payment, hosting, and analytics providers including Stripe, Supabase, Vercel,
        Resend, and Google Analytics. We do not sell personal data.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">6. Your Rights</h2>
      <p className="mb-4">
        You may request access, correction, deletion, or data export. Contact:
        support@torquesites.co.uk.
      </p>
    </div>
  );
}

