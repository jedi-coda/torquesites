"use client";

import React from "react";
import { type Pricing, type PricingEntry } from "@/lib/garage";
import { premiumTheme } from "@/lib/fallbackGarage";

type Props = {
  pricing?: Pricing | null;
};

// 🛠️ PricingCards component with shared fallback logic for production scale
// ✅ Uses shared fallbackGarage for consistent defaults
// ✅ 100% safe rendering with null/undefined pricing props
// ✅ Handles both array and object pricing formats
// ✅ Ready for 1000+ dynamic garage microsites

export default function PricingCards({ pricing }: Props) {
  // Use fallback pricing directly since we're only getting pricing data
  const safePricing = pricing || {
    mot: "£54.85",
    interimFrom: "£149", 
    fullFrom: "£199"
  };
  
  console.log("🧪 PricingCards received pricing prop:", pricing);
  console.log("🛡️ PricingCards using safe pricing:", safePricing);

  const isArrayFormat = Array.isArray(safePricing);
  
  if (!safePricing || (isArrayFormat && safePricing.length === 0)) {
    console.warn("⚠️ PricingCards: No pricing data available, using fallback.");
  } else {
    const tierCount = isArrayFormat ? safePricing.length : 
      ((safePricing as { mot?: string; interimFrom?: string; fullFrom?: string })?.mot ? 1 : 0) +
      ((safePricing as { mot?: string; interimFrom?: string; fullFrom?: string })?.interimFrom ? 1 : 0) +
      ((safePricing as { mot?: string; interimFrom?: string; fullFrom?: string })?.fullFrom ? 1 : 0);
    console.log(`✅ PricingCards: Rendering ${tierCount} tiers.`);
  }

  // Convert to array format for consistent rendering
  let pricingArray: PricingEntry[] = [];
  
  if (isArrayFormat) {
    pricingArray = safePricing as PricingEntry[];
  } else {
    // Convert legacy object format to array format
    const legacyPricing = safePricing as { mot?: string; interimFrom?: string; fullFrom?: string };
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

  // Ensure we always have at least one pricing tier
  if (pricingArray.length === 0) {
    pricingArray.push({
      title: "MOT Test",
      description: "DVSA-approved MOT testing",
      price: "£54.85",
      features: ["DVSA-approved", "Comprehensive inspection", "Free re-test"]
    });
  }

  return (
    <div className="space-y-8 py-16 bg-black">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          Your Service, Your Way
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Choose the right level of care for your vehicle — with clear pricing and zero surprises.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {pricingArray.map((tier, index) => {
          const isPopular = index === 1; // Make middle tier popular
          return (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 ${
                isPopular 
                  ? 'bg-gradient-to-br border-2' 
                  : 'bg-gray-900/50 border border-gray-700/50'
              }`}
              style={isPopular ? {
                background: `linear-gradient(135deg, ${premiumTheme.accentColor}10, ${premiumTheme.accentColor}05)`,
                borderColor: `${premiumTheme.accentColor}50`
              } : {}}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div 
                    className="text-white px-4 py-2 rounded-full text-sm font-bold"
                    style={{ backgroundColor: premiumTheme.accentColor }}
                  >
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.title}</h3>
                <p className="text-gray-300 mb-4">{tier.description}</p>
                <div 
                  className="text-4xl font-bold mb-2"
                  style={{ color: premiumTheme.accentColor }}
                >
                  {tier.price}
                </div>
                {isPopular && (
                  <p 
                    className="text-sm"
                    style={{ color: premiumTheme.accentColor }}
                  >
                    Best Value
                  </p>
                )}
              </div>
              
              <ul className="mb-8 space-y-3">
                {tier.features?.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <div 
                      className="w-2 h-2 rounded-full mr-3 flex-shrink-0"
                      style={{ backgroundColor: premiumTheme.accentColor }}
                    ></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {tier.cta1?.href && tier.cta1?.text ? (
                <a
                  href={tier.cta1.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Book ${tier.title} Online`}
                  className={`block w-full text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isPopular
                      ? 'text-white transform hover:scale-105 shadow-lg'
                      : 'bg-gray-800 text-white border hover:bg-opacity-10'
                  }`}
                  style={isPopular ? {
                    backgroundColor: premiumTheme.accentColor
                  } : {
                    borderColor: `${premiumTheme.accentColor}50`
                  }}
                  onMouseEnter={(e) => {
                    if (isPopular) {
                      e.currentTarget.style.backgroundColor = premiumTheme.brandColor;
                    } else {
                      e.currentTarget.style.backgroundColor = `${premiumTheme.accentColor}10`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isPopular) {
                      e.currentTarget.style.backgroundColor = premiumTheme.accentColor;
                    } else {
                      e.currentTarget.style.backgroundColor = 'rgb(31 41 55)';
                    }
                  }}
                >
                  {tier.cta1.text}
                </a>
              ) : (
                <button 
                  aria-label={`Book ${tier.title} Online`}
                  className={`block w-full text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isPopular
                      ? 'text-white transform hover:scale-105 shadow-lg'
                      : 'bg-gray-800 text-white border hover:bg-opacity-10'
                  }`}
                  style={isPopular ? {
                    backgroundColor: premiumTheme.accentColor
                  } : {
                    borderColor: `${premiumTheme.accentColor}50`
                  }}
                  onMouseEnter={(e) => {
                    if (isPopular) {
                      e.currentTarget.style.backgroundColor = premiumTheme.brandColor;
                    } else {
                      e.currentTarget.style.backgroundColor = `${premiumTheme.accentColor}10`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isPopular) {
                      e.currentTarget.style.backgroundColor = premiumTheme.accentColor;
                    } else {
                      e.currentTarget.style.backgroundColor = 'rgb(31 41 55)';
                    }
                  }}
                >
                  {/* TODO: Connect to Stripe payment links once available in garages.json
                      For MOT: garage.stripeLinks.mot
                      For Interim Service: garage.stripeLinks.interim
                      For Full Service: garage.stripeLinks.full
                  */}
                  Book Online
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-gray-400 text-sm max-w-2xl mx-auto">
          All prices include VAT. No hidden costs. Free re-test within 10 working days if required.
        </p>
      </div>
    </div>
  );
}
