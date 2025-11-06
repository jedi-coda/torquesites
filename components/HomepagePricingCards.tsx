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
      priceDisplay: "💰 Full package £999 setup + £49/mo",
      priceSubtext: "(Billed only after your 14-day Test Drive ends)",
      priceId: "price_1SBxjIRYcQYm7u35pOOsnKnA",
      badgeText: "14-Day Test Drive Included",
      testDriveHighlight: {
        title: "🟢 Test Drive for Free",
        description: "Experience your live TorqueSite for 14 days after launch — no payment, no risk."
      },
      experienceFeatures: [
        "Launch your new site in 7 days and start taking bookings fast.",
        "Transform first impressions with premium design built for trust.",
        "See how your new TorqueSite is built to turn local searches into calls, MOTs, and repeat business once live."
      ],
      whatsInsideFeatures: [
        "Lightning-fast, SEO-optimised microsite",
        "WhatsApp chat + booking form integration",
        "Google Map embedded for instant directions",
        "Mobile-first design for every device",
        "Clear contact info & sticky call-to-action bar",
        "\"Powered by TorqueSites\" footer for early-adopter credibility"
      ],
      cta: { text: "Start Your Free Test Drive →" },
      ctaNote: "(No payment today · Cancel any time before day 14 of your live site)",
      bottomNote: "💬 Most garages start with our Turbo Test Drive to experience the difference before committing.",
      isPopular: true
    },
    {
      title: "Supercharged",
      tagline: "Boost your bookings — engineered for conversion and brand power.",
      priceDisplay: "💰 £1,999 setup + £99/mo",
      priceSubtext: "(Launch in 14 days · Upgrade from Turbo any time)",
      priceId: "price_1SNvXZRYcQYm7u35AWCkJAGr",
      performanceUpgrade: {
        title: "⚙️ Performance Upgrade",
        description: "For garages ready to build a lasting online reputation and maximise conversions."
      },
      experienceFeatures: [
        "Enhanced design tailored to your brand's colours and imagery",
        "Showcase real reviews from Facebook or Google for instant credibility",
        "Accept online payments for MOTs and services directly on your site"
      ],
      whatsInsideFeatures: [
        "Everything in Turbo, plus:",
        "Full colour scheme + brand integration",
        "Upgraded hero section with garage-specific imagery",
        "Embedded Facebook / Google reviews for social proof",
        "Stripe-powered online payments (MOT, servicing, etc.)",
        "Trust badges + advanced Google Map integration",
        "Priority updates & premium support"
      ],
      cta: { text: "Shift into Top Gear →" },
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lime-400 text-center text-lg md:text-xl font-medium mt-4 max-w-2xl mx-auto"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <p className="mb-2">Experience your garage's future — before you pay a penny.</p>
          <p>Two precision-engineered packages built to drive bookings, build trust, and grow your garage.</p>
        </motion.div>
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
                  whileHover={{ scale: 1.05 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                  animate={{ 
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3
                  }}
                >
                  <div className="text-black px-4 py-2 rounded-full text-sm font-bold bg-[#D0FF00] shadow-lg shadow-[#D0FF00]/50">
                    {tier.badgeText || "MOST POPULAR"}
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
                {tier.testDriveHighlight && (
                  <div className="mt-4 mb-4 p-3 rounded-lg bg-[#D0FF00]/10 border border-[#D0FF00]/30">
                    <div className="text-base font-bold text-[#D0FF00] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {tier.testDriveHighlight.title}
                    </div>
                    <div className="text-sm text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {tier.testDriveHighlight.description}
                    </div>
                  </div>
                )}
                {tier.performanceUpgrade && (
                  <div className="mt-4 mb-4 text-left">
                    <div className="text-base font-bold text-[#FF6B00] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {tier.performanceUpgrade.title}
                    </div>
                    <div className="text-sm text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {tier.performanceUpgrade.description}
                    </div>
                  </div>
                )}
                {tier.priceDisplay && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-4 pt-4 border-t border-gray-700/50"
                  >
                    <div className="text-base md:text-lg font-medium text-gray-300 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {tier.priceDisplay}
                    </div>
                    {tier.priceSubtext && (
                      <div className="text-xs text-gray-400 opacity-80" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {tier.priceSubtext}
                      </div>
                    )}
                  </motion.div>
                )}
                {!tier.priceDisplay && tier.priceSubtext && (
                  <div className="text-sm text-gray-400 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tier.priceSubtext}
                  </div>
                )}
              </div>
              
              {tier.experienceFeatures && tier.experienceFeatures.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#D0FF00] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    What You'll Experience:
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {tier.experienceFeatures.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start text-gray-300 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <div className="w-2 h-2 rounded-full mr-3 mt-1.5 flex-shrink-0 bg-[#D0FF00]"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {tier.whatsInsideFeatures && tier.whatsInsideFeatures.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#D0FF00] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    What's Inside:
                  </h4>
                  <ul className="space-y-2">
                    {tier.whatsInsideFeatures.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start text-gray-300 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <div className="w-2 h-2 rounded-full mr-3 mt-1.5 flex-shrink-0 bg-[#D0FF00]"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <motion.button
                onClick={() => handleCheckout(tier.priceId)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                animate={!isPopular ? {
                  boxShadow: [
                    "0 0 0px rgba(255, 107, 0, 0)",
                    "0 0 12px rgba(255, 107, 0, 0.4)",
                    "0 0 0px rgba(255, 107, 0, 0)"
                  ]
                } : {}}
                transition={!isPopular ? {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                } : {}}
                className={`mt-auto w-full text-center px-4 py-2 font-semibold text-white bg-[#FF6B00] border border-[#FF6B00] rounded-md hover:bg-[#e65f00] transition-all duration-200 ${
                  isPopular ? 'hover:ring-2 hover:ring-[#D0FF00] hover:ring-offset-2 hover:ring-offset-gray-900' : ''
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {tier.cta.text}
              </motion.button>
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
