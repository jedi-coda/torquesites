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
          className="text-center text-lg md:text-xl font-medium mt-4 max-w-2xl mx-auto space-y-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <p className="text-white">Experience your garage's future — before you pay a penny.</p>
          <p className="text-[#C4FF00]">Two precision-engineered packages built to drive bookings, build trust, and grow your garage.</p>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-6">
        {pricingTiers.map((tier, index) => {
          const isPopular = tier.isPopular;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index === 0 ? 0.2 : 0.4, duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.08)',
                y: -4,
              }}
              className={`relative p-8 rounded-2xl flex flex-col ${
                isPopular 
                  ? 'bg-[#111111] border-2 border-[#C4FF00] shadow-[0_0_12px_#C4FF00]' 
                  : 'bg-[#111111] border-[1.5px] border-orange-500'
              }`}
            >
              {/* Headline */}
              <h3 className="text-2xl font-bold text-white mb-3 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                {tier.title}
              </h3>
              
              {/* Badge (Turbo only) */}
              {isPopular && tier.badgeText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (index * 0.2), duration: 0.4 }}
                  className="mb-4 flex justify-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="bg-[#C4FF00] text-black text-xs px-3 py-1 rounded-full shadow-inner font-semibold">
                    {tier.badgeText}
                  </span>
                </motion.div>
              )}
              
              {/* Tagline */}
              {tier.tagline && (
                <p className="text-sm italic text-[#FF6B00] mb-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {tier.tagline}
                </p>
              )}
              
              {/* Test Drive Highlight (Turbo only) */}
              {tier.testDriveHighlight && (
                <div className="mb-6 text-center">
                  <div className="text-base font-bold text-[#C4FF00] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tier.testDriveHighlight.title}
                  </div>
                  <div className="text-sm text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tier.testDriveHighlight.description}
                  </div>
                </div>
              )}
              
              {/* Performance Upgrade (Supercharged only) */}
              {tier.performanceUpgrade && (
                <div className="mb-6 text-left">
                  <div className="text-base font-bold text-[#FF6B00] mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tier.performanceUpgrade.title}
                  </div>
                  <div className="text-sm text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {tier.performanceUpgrade.description}
                  </div>
                </div>
              )}
              
              {/* What You'll Experience */}
              {tier.experienceFeatures && tier.experienceFeatures.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#C4FF00] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    What You'll Experience:
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {tier.experienceFeatures.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start text-gray-300 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <div className="w-2 h-2 rounded-full mr-3 mt-1.5 flex-shrink-0 bg-[#C4FF00]"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* What's Inside */}
              {tier.whatsInsideFeatures && tier.whatsInsideFeatures.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-[#C4FF00] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    What's Inside:
                  </h4>
                  <ul className="space-y-2">
                    {tier.whatsInsideFeatures.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start text-gray-300 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                        <div className="w-2 h-2 rounded-full mr-3 mt-1.5 flex-shrink-0 bg-[#C4FF00]"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* CTA Button */}
              <motion.button
                onClick={() => handleCheckout(tier.priceId)}
                whileHover={
                  isPopular
                    ? {
                        backgroundColor: '#C4FF00',
                        color: '#000000',
                        scale: 1.03,
                        boxShadow: '0 0 20px rgba(196,255,0,0.6), 0 0 30px rgba(196,255,0,0.3)',
                      }
                    : {
                        backgroundColor: '#EA580C',
                        color: '#FFFFFF',
                        scale: 1.03,
                        boxShadow: '0 0 12px rgba(234,88,12,0.5)',
                      }
                }
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`mt-auto w-full text-center px-4 py-2 font-semibold rounded-md transition-colors duration-300 ${
                  isPopular
                    ? 'bg-orange-500 text-black hover:bg-[#C4FF00] hover:text-black focus:ring-2 focus:ring-[#C4FF00] focus:ring-offset-2 focus:ring-offset-black'
                    : 'bg-orange-500 text-black hover:bg-orange-600 hover:text-white focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 focus:ring-offset-black'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {tier.cta.text}
              </motion.button>
              
              {/* Cancellation Fine Print */}
              {tier.ctaNote && (
                <p className="mt-2 text-xs text-gray-400 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {tier.ctaNote}
                </p>
              )}
              
              {/* Bottom Note */}
              {tier.bottomNote && (
                <p className="mt-4 text-sm text-gray-400 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {tier.bottomNote}
                </p>
              )}
              
              {/* Horizontal Rule */}
              <hr className="opacity-40 my-4" />
              
              {/* Price Block */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + (index * 0.2), duration: 0.5 }}
              >
                {isPopular ? (
                  <p className="text-sm text-gray-400 mt-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                    £999 setup + £49/mo — billed only after your 14-day Test Drive ends.
                  </p>
                ) : (
                  <p className="text-sm text-gray-400 mt-4 text-center" style={{ fontFamily: "'Inter', sans-serif" }}>
                    £1,999 setup + £99/mo — launch in 14 days · upgrade from Turbo any time.
                  </p>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8"
      >
        <p className="text-xs text-center text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>
          All plans include UK hosting, SSL, and DVSA-aligned design standards.<br />
          Setup fees are one-time only.<br />
          Test Drive sites are hosted under TorqueSites domains during the trial and migrated to your own domain upon activation.
        </p>
      </motion.div>
    </div>
  );
}
