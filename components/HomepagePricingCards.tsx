"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// 🏁 HomepagePricingCards - Turbo/Supercharged/Hyper Mode tiers
// ✅ Based on Swift-Motors design with exact layout
// ✅ McLaren × Apple × Porsche aesthetic consistency
// ✅ Production-ready with proper CTAs and links

export default function HomepagePricingCards() {
  const pricingTiers = [
    {
      title: "Launch Ready",
      tagline: "Built for speed — your garage online, fast.",
      price: "£999",
      monthly: "£99/mo",
      launchTime: "5 days",
      features: [
        "Lightning-fast, SEO-optimised microsite",
        "Polished TorqueSites layout — proven to convert",
        "WhatsApp chat + booking form integration",
        "Google Map embedded for instant directions",
        "Mobile-first design for every device",
        "Clear contact info and sticky call-to-action bar",
        "\"Powered by TorqueSites\" footer for early-adopter credibility",
        "Go live in 5 days"
      ],
      cta: { text: "Start Your Engine →", href: "#contact" },
      isPopular: false
    },
    {
      title: "Supercharged",
      tagline: "Boost your bookings — engineered for conversion.",
      price: "£1,999",
      monthly: "£149/mo",
      launchTime: "10 days",
      features: [
        "Everything in Turbo, plus:",
        "Full colour scheme & brand integration",
        "Upgraded hero section with garage-specific imagery",
        "Facebook or Google reviews embedded for social proof",
        "Stripe-powered online payments (MOT, servicing, etc.)",
        "Trust badges + Google Map integration",
        "Priority updates & premium support",
        "Live in 10 days"
      ],
      cta: { text: "Shift into Top Gear →", href: "#contact" },
      isPopular: true
    },
    {
      title: "Hyper Mode",
      tagline: "Enter Hyper Mode — where performance meets prestige.",
      price: "£2,999",
      monthly: "£199/mo",
      launchTime: "20 days",
      features: [
        "Everything in Supercharged, plus:",
        "Cinematic hero section with motion and video integration",
        "Custom animations + Framer Motion effects",
        "Advanced SEO + analytics setup",
        "Tailored on-brand copywriting & messaging",
        "Dedicated design collaboration with our creative team",
        "Enhanced performance tuning & speed optimisation",
        "Exclusive early-access features before public release",
        "Live in 20 days"
      ],
      cta: { text: "Enter Hyper Mode →", href: "#contact" },
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
          className="text-center text-white text-5xl md:text-6xl font-extrabold tracking-tight leading-tight"
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
          Three precision-engineered packages — built for speed, conversion, and reputation.
        </motion.p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
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
              </div>
              
              <ul className="mb-8 space-y-3">
                {tier.features?.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center text-gray-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                    <div className="w-2 h-2 rounded-full mr-3 flex-shrink-0 bg-[#D0FF00]"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                href={tier.cta.href}
                className={`block w-full text-center py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#D0FF00] text-[#0E0E0E] transform hover:scale-105 hover:bg-[#C4FF00] shadow-lg hover:shadow-[0_0_20px_rgba(208,255,0,0.3)]'
                    : 'bg-gray-900/50 text-white border border-[#D0FF00]/50 hover:bg-[#D0FF00]/10 hover:border-[#D0FF00]'
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {tier.cta.text}
              </Link>
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
          All plans include UK hosting, SSL, and DVSA-aligned designs. Setup fees are one-time only.
        </p>
      </motion.div>
    </div>
  );
}
