import React from "react";
import { type Pricing, type PricingEntry } from "@/lib/garage";

type Props = {
  pricing: Pricing;
};

export default function PricingCards({ pricing }: Props) {
  console.log("🧪 PricingCards received pricing prop:", pricing);

  const isArrayFormat = Array.isArray(pricing);
  
  if (!pricing || (isArrayFormat && pricing.length === 0)) {
    console.warn("⚠️ PricingCards: No pricing data passed.");
  } else {
    const tierCount = isArrayFormat ? pricing.length : 
      ((pricing as { mot?: string; interimFrom?: string; fullFrom?: string })?.mot ? 1 : 0) +
      ((pricing as { mot?: string; interimFrom?: string; fullFrom?: string })?.interimFrom ? 1 : 0) +
      ((pricing as { mot?: string; interimFrom?: string; fullFrom?: string })?.fullFrom ? 1 : 0);
    console.log(`✅ PricingCards: Rendering ${tierCount} tiers.`);
  }

  // Handle both array and object formats
  
  if (!pricing || (isArrayFormat && pricing.length === 0)) {
    return (
      <div className="bg-zinc-900 text-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2">Pricing</h2>
        <p>No pricing data available.</p>
      </div>
    );
  }

  // Convert to array format for consistent rendering
  let pricingArray: PricingEntry[] = [];
  
  if (isArrayFormat) {
    pricingArray = pricing as PricingEntry[];
  } else {
    // Convert legacy object format to array format
    const legacyPricing = pricing as { mot?: string; interimFrom?: string; fullFrom?: string };
    if (legacyPricing.mot) {
      pricingArray.push({
        title: "MOT Test",
        description: "DVSA-approved MOT testing",
        price: legacyPricing.mot,
        features: ["DVSA-approved", "Comprehensive inspection", "Free re-test"]
      });
    }
    if (legacyPricing.interimFrom) {
      pricingArray.push({
        title: "Interim Service", 
        description: "Essential maintenance service",
        price: `From ${legacyPricing.interimFrom}`,
        features: ["Oil and filter change", "Visual safety checks", "Fluid level checks"]
      });
    }
    if (legacyPricing.fullFrom) {
      pricingArray.push({
        title: "Full Service",
        description: "Comprehensive service covering all major components", 
        price: `From ${legacyPricing.fullFrom}`,
        features: ["Complete oil and filter change", "Air filter replacement", "Full vehicle inspection"]
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-green-500">✅ PricingCards component rendered</div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {pricingArray.map((tier, index) => (
          <div key={index} className="bg-zinc-900 text-white p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-all">
            <h3 className="text-xl font-semibold mb-2">{tier.title}</h3>
            <p className="text-sm mb-4">{tier.description}</p>
            <div className="text-3xl font-bold mb-4">{tier.price}</div>
            <ul className="mb-4 list-disc list-inside space-y-1 text-sm">
              {tier.features?.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            {tier.cta1?.href && tier.cta1?.text && (
              <a
                href={tier.cta1.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                {tier.cta1.text}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
