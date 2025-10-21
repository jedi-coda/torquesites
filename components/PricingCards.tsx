"use client";

import React from "react";
import { type Pricing, type PricingEntry } from "@/lib/garage";
import { fallbackGarage } from "@/lib/fallbackGarage";

type Props = {
  pricing?: Pricing | null;
};

// 🛠️ PricingCards component with shared fallback logic for production scale
// ✅ Uses shared fallbackGarage for consistent defaults
// ✅ 100% safe rendering with null/undefined pricing props
// ✅ Handles both array and object pricing formats
// ✅ Ready for 1000+ dynamic garage microsites

export default function PricingCards({ pricing }: Props) {
  // Use pricing from prop or fallback to fallbackGarage pricing
  const pricingTiers = Array.isArray(pricing) ? pricing : fallbackGarage.pricing as any[];

  console.log("🧪 PricingCards: Rendering", pricingTiers.length, "pricing tiers");

  return (
    <div className="space-y-8 py-16 bg-dark-bg">
      <div className="text-center mb-12">
        <div className="inline-block px-4 py-2 border border-torque-orange/30 rounded-full mb-4 bg-torque-orange/20">
          <span className="text-sm font-medium tracking-wide text-torque-orange">
            TRANSPARENT PRICING
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
          TorqueSites <span className="text-torque-orange">Pricing</span>
        </h2>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
          Choose your performance level. All plans include hosting, SSL, and DVSA-aligned designs.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {pricingTiers.map((tier, index) => {
          const isPopular = tier.isPopular || (pricingTiers.length === 3 && index === 1);
          
          // Extract icon from title (first emoji)
          const icon = tier.title?.match(/^[\u{1F300}-\u{1F9FF}]/u)?.[0] || "🛞";
          return (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 ${
                isPopular 
                  ? 'bg-gradient-to-br from-torque-orange/10 to-torque-orange/5 border-2 border-torque-orange/50' 
                  : 'bg-card-surface border border-neutral-700/50'
              }`}
            >
              {isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="text-white px-4 py-2 rounded-full text-sm font-bold bg-torque-orange">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                  <span className="text-3xl">{icon}</span>
                  <span>{tier.title || "Service"}</span>
                </h3>
                {tier.tagline && (
                  <p className="text-sm italic text-neutral-400 mb-4">{tier.tagline}</p>
                )}
                {tier.description && !tier.tagline && (
                  <p className="text-sm italic text-neutral-400 mb-4">{tier.description}</p>
                )}
                <div className="text-4xl font-bold mb-2 text-torque-orange">
                  {tier.price || "POA"}
                </div>
                {tier.monthly && (
                  <div className="text-lg text-neutral-400 mb-2">
                    {tier.monthly}
                  </div>
                )}
                {tier.launchTime && (
                  <div className="text-sm text-neutral-500 mb-2">
                    Launch in {tier.launchTime}
                  </div>
                )}
                {isPopular && (
                  <p className="text-sm text-torque-orange">
                    Most Popular
                  </p>
                )}
              </div>
              
              <ul className="mb-8 space-y-3">
                {tier.features?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center text-neutral-400">
                    <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0 bg-torque-orange"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              {tier.cta?.href && tier.cta?.text ? (
                <a
                  href={tier.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isPopular
                      ? 'bg-torque-orange text-white transform hover:scale-105 hover:bg-lime-accent shadow-lg'
                      : 'bg-card-surface text-white border border-torque-orange/50 hover:bg-torque-orange/10'
                  }`}
                >
                  {tier.cta.text}
                </a>
              ) : tier.cta1?.href && tier.cta1?.text ? (
                <a
                  href={tier.cta1.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isPopular
                      ? 'bg-torque-orange text-white transform hover:scale-105 hover:bg-lime-accent shadow-lg'
                      : 'bg-card-surface text-white border border-torque-orange/50 hover:bg-torque-orange/10'
                  }`}
                >
                  {tier.cta1.text}
                </a>
              ) : (
                <button 
                  className={`block w-full text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                    isPopular
                      ? 'bg-torque-orange text-white transform hover:scale-105 hover:bg-lime-accent shadow-lg'
                      : 'bg-card-surface text-white border border-torque-orange/50 hover:bg-torque-orange/10'
                  }`}
                >
                  {tier.title?.includes('Turbo') ? 'Join Turbo' : 
                   tier.title?.includes('Supercharged') ? 'Join Supercharged' :
                   tier.title?.includes('Hyper') ? 'Join Hyper Mode' : 'Book Now'}
                </button>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-neutral-400 text-sm">
          All plans include UK hosting, SSL, and DVSA-aligned designs. Setup fees are one-time only.
        </p>
      </div>
    </div>
  );
}
