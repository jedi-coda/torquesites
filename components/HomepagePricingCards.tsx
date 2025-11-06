"use client";

import React from "react";
import { motion } from "framer-motion";
import { handleCheckout } from "@/lib/stripe";

// 🏁 HomepagePricingCards - Turbo/Supercharged/Hyper Mode tiers
// ✅ Based on Swift-Motors design with exact layout
// ✅ McLaren × Apple × Porsche aesthetic consistency
// ✅ Production-ready with proper CTAs and links

export default function HomepagePricingCards() {
  const pricingTiers = [
    {
      title: "Turbo",
      tagline: "Built for speed — your garage online, fast.",
      price: "£999",
      monthly: "£99 /mo",
      launchTime: "7 days",
      priceId: "price_1SBxjIRYcQYm7u35pOOsnKnA",
      testDriveNote: "🚀 Includes a 14-Day Test Drive — starts once your site goes live.",
      features: [
        "Lightning-fast, SEO-optimised microsite",
        "Proven TorqueSites layout — precision-engineered to convert",
        "WhatsApp chat + booking form integration",
        "Google Map embedded for instant directions",
        "Mobile-first design for every device",
        "Clear contact info & sticky call-to-action bar",
        "\"Powered by TorqueSites\" footer for early-adopter credibility",
        "Launch in 7 days → then your 14-day Test Drive begins"
      ],
      cta: { text: "Start Your Test Drive →" },
      ctaNote: "(No payment today · Cancel any time before day 14 of your live site)",
      bottomNote: "💬 Most garages start with our Turbo Test Drive to experience the difference before committing.",
      isPopular: true
    },
    {
      title: "Supercharged",
      tagline: "Boost your bookings — engineered for conversion and brand power.",
      price: "£1,999",
      monthly: "£149 /mo",
      launchTime: "14 days",
      priceId: "price_1SNvXZRYcQYm7u35AWCkJAGr",
      launchNote: "⚙️ Launch in 14 days · Upgrade from Turbo any time.",
      features: [
        "Everything in Turbo, plus:",
        "Full colour scheme + brand integration",
        "Upgraded hero section with garage-specific imagery",
        "Facebook / Google reviews embedded for social proof",
        "Stripe-powered online payments (MOT, servicing, etc.)",
        "Trust badges + advanced Google Map integration",
        "Priority updates & premium support"
      ],
      cta: { text: "Shift into Top Gear →" },
      bottomNote: "💬 For garages ready to build a lasting online reputation and maximise conversions.",
      isPopular: false
    }
  ];

  return (
    <div className="space-y-8 py-16">
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FF6B00] text-center mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Choose Your Performance Mode
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lime-400 text-center text-lg md:text-xl font-medium mt-4 max-w-2xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Two precision-engineered packages — built to drive bookings, build trust, and grow your garage.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
        {pricingTiers.map((tier, index) => {
          const isPopular = tier.isPopular;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative p-8 rounded-2xl shadow-2xl hover:scale-[1.02] transition-all duration-300 ${
                isPopular 
                  ? 'bg-gradient-to-br from-[#D0FF00]/10 to-[#D0FF00]/5 border-2 border-[#D0FF00]/50' 
                  : 'bg-gray-900/30 backdrop-blur-sm border border-gray-800 hover:border-[#D0FF00]/30'
              }`}
            >
              {isPopular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="text-black px-4 py-2 rounded-full text-sm font-bold bg-[#D0FF00]">
                    MOST POPULAR
                  </div>
                </motion.div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {tier.title}
                </h3>
                {tier.tagline && (
                  <p className="text-sm italic text-[#FF6B00] mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tier.tagline}
                  </p>
                )}
                <div className="text-4xl font-bold mb-2 text-[#D0FF00]">
                  {tier.price}
                </div>
                {tier.monthly && (
                  <div className="text-lg text-gray-400 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tier.monthly}
                  </div>
                )}
                {tier.launchTime && (
                  <div className="text-sm text-gray-500 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Launch in {tier.launchTime}
                  </div>
                )}
                {tier.testDriveNote && (
                  <div className="text-sm text-[#D0FF00] mb-2 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tier.testDriveNote}
                  </div>
                )}
                {tier.launchNote && (
                  <div className="text-sm text-gray-400 mb-2 mt-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tier.launchNote}
                  </div>
                )}
              </div>
              
              <ul className="mb-8 space-y-3">
                {tier.features?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0 bg-[#D0FF00]"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => handleCheckout(tier.priceId)}
                className="mt-auto w-full text-center px-4 py-2 font-semibold text-white bg-[#FF6B00] border border-[#FF6B00] rounded-md hover:bg-[#e65f00] transition-colors duration-200"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {tier.cta.text}
              </button>
              {tier.ctaNote && (
                <p className="mt-2 text-xs text-gray-400 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {tier.ctaNote}
                </p>
              )}
              {tier.bottomNote && (
                <p className="mt-4 text-sm text-gray-400 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {tier.bottomNote}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-12"
      >
        <p className="text-gray-400 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
          All plans include UK hosting, SSL, and DVSA-aligned design standards.<br />
          Setup fees are one-time only.<br />
          Test Drive sites are hosted under TorqueSites domains during the trial and migrated to your own domain upon activation.
        </p>
      </motion.div>
    </div>
  );
}
