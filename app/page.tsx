"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Smartphone,
  ShieldCheck,
  Search,
  Calendar,
  Headphones,
  TrendingUp,
  Phone,
  Star,
} from "lucide-react";
import Link from "next/link";
import { links } from "@/lib/links";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DesignPhilosophy from "@/components/DesignPhilosophy";
import PrecisionSection from "@/components/PrecisionSection";
import HomepagePricingCards from "@/components/HomepagePricingCards";
import VIPSection from "@/components/VIPSection";

// Analytics tracking placeholder
const trackClick = (event: string, location: string) => {
  // Placeholder for Vercel Analytics / Google Analytics integration
  console.log(`Analytics: ${event} clicked from ${location}`);
  // TODO: Replace with actual analytics tracking
  // gtag('event', event, { location });
};

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-[#0E0E0E] to-[#1A1A1A] backdrop-blur-md min-h-screen">
    <main className="font-sans text-white">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />

      {/* PRECISION SECTION - Porsche 911 Dynamic Hero */}
      <PrecisionSection />

      {/* FEATURES */}
      <section className="py-16 md:py-20 px-6 bg-dark-bg">
        <h2 className="text-5xl sm:text-6xl font-bold text-white text-center">
          Performance in practice
        </h2>
        <p className="mt-2 text-lg text-[#C4FF00] text-center">
          Every detail built to convert attention into action.
        </p>
        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Feature
            icon={<Smartphone size={28} strokeWidth={2} />}
            title="Mobile-first Design"
            text="Look brilliant on every device. Your customers check you on their phone first — make it count."
            isDvsa={false}
          />
          <Feature
            icon={<Calendar size={28} strokeWidth={2} />}
            title="Smart Booking System"
            text="Simple booking forms that turn online searches into real customers. No fuss, just bookings."
            isDvsa={false}
          />
          <Feature
            icon={<ShieldCheck size={28} strokeWidth={2} />}
            title="Secure UK Hosting"
            text="Fast, reliable hosting with SSL built in. Always live, always safe, always British."
            isDvsa={false}
          />
          <Feature
            icon={<Search size={28} strokeWidth={2} />}
            title="SEO Optimised"
            text="Show up when customers search locally. Proper SEO that actually works for UK garages."
            isDvsa={false}
          />
          <Feature
            icon={<Wrench size={28} strokeWidth={2} />}
            title="Garage Focused"
            text="Every feature designed for MOTs, servicing, and repairs. Built by people who understand garages."
            isDvsa={true}
          />
          <Feature
            icon={<Headphones size={28} strokeWidth={2} />}
            title="Ongoing Support"
            text="We handle updates so your site always feels fresh. No technical headaches, just results."
            isDvsa={false}
          />
        </div>
      </section>

      {/* ROI SECTION */}
      <section className="py-24 md:py-32 bg-[#0E0E0E]">
        <div className="space-y-16 max-w-6xl mx-auto text-center px-6">
          <div>
            <h2 className="text-5xl sm:text-6xl font-bold text-white text-center">
              One extra MOT per week covers your TorqueSite.
            </h2>
            <p className="mt-4 text-center text-lg sm:text-xl font-medium text-[#C4FF00]">
              Real results for independent garages. See how TorqueSites turns online presence into booked MOTs and services.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center cursor-pointer rounded-xl bg-[#0E0E0E] p-6 w-72 text-center transition-colors border border-[#FF6B00]/30 hover:border-[#C4FF00] duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] text-green-400 mb-4">
                <TrendingUp size={32} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">+47%</h3>
              <p className="text-gray-300">More Online Bookings</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center cursor-pointer rounded-xl bg-[#0E0E0E] p-6 w-72 text-center transition-colors border border-[#FF6B00]/30 hover:border-[#C4FF00] duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] text-blue-400 mb-4">
                <Phone size={32} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">+23%</h3>
              <p className="text-gray-300">More Phone Calls</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center cursor-pointer rounded-xl bg-[#0E0E0E] p-6 w-72 text-center transition-colors border border-[#FF6B00]/30 hover:border-[#C4FF00] duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] text-yellow-400 mb-4">
                <Star size={32} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">+31%</h3>
              <p className="text-gray-300">Better Google Rankings</p>
            </motion.div>
          </div>
          
          {/* v1.2.3-featurecards-animate — hover scale + glow animation on stat cards */}
          
          {/* Testimonial */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="mt-12 bg-[#1A1A1A] p-6 rounded-lg border border-[#333] max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="bounce-3 text-yellow-400 text-xl mx-0.5">⭐</span>
              ))}
            </div>
            <blockquote className="text-lg italic text-gray-200 mb-4">
              "Since launching our TorqueSite, we've seen a 27% increase in MOT bookings in just 3 months. 
              The professional look builds trust, and the booking system works perfectly."
            </blockquote>
            <cite className="text-torque-orange font-semibold">
              — Newtown Garage, Chesham
            </cite>
          </motion.div>
          
          {/* v1.2.2-results-polish — scroll animation, hover glow, testimonial fade-in */}
        </div>
      </section>
      {/* PRICING */}
      <section id="pricing" className="py-20">
        <HomepagePricingCards />
      </section>

      {/* GUARANTEE */}
      <section className="py-16 md:py-20 px-6 bg-dark-bg text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Our Guarantee
        </motion.h2>
        <p className="mt-4 text-lg text-[#D1D1D1] max-w-2xl mx-auto">
          Your site, live in days — not months. Most garages launch in 7–10 days. And if you&apos;re not fully satisfied, your setup fee is protected with our money-back promise.
        </p>
        <p className="mt-10 text-torque-orange font-medium">No risk. Just performance.</p>
      </section>

      {/* VIP SECTION */}
      <section id="partner100" className="py-20">
        <VIPSection />
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-20 px-6 bg-gradient-to-r from-torque-orange to-torque-gradient-end text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Ready to accelerate online?
        </motion.h2>
        <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
          Give your garage the website it deserves — engineered, trusted, and built
          to dominate the market.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            suppressHydrationWarning
            href={links.publicStarter}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-torque-orange hover:bg-torque-gradient-end hover:text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all duration-200"
          >
            Launch Your Site (£999)
          </a>
          <Link
            href="/contact"
            className="bg-dark-bg border border-white text-white hover:bg-card-surface font-semibold px-6 py-3 rounded-xl shadow transition-all duration-200"
          >
            Book a Call
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark-bg py-12 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo Section */}
            <div className="flex items-center gap-4">
              <div className="text-xl font-bold text-white">
                TorqueSites
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com/torquesites"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#1A1A1A] hover:bg-blue-600 transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 text-[#D1D1D1] hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/torquesites"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card-surface hover:bg-gradient-to-r hover:from-purple-500 hover:to-torque-orange transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/30"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 text-[#D1D1D1] hover:text-white transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@torquesites"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-card-surface hover:bg-black transition-all duration-200 hover:scale-110 hover:shadow-lg hover:shadow-gray-500/30"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 text-[#D1D1D1] hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright and MOTgenie */}
          <div className="mt-8 pt-8 border-t border-card-surface text-center">
            <p className="text-[#D1D1D1] text-sm mb-2">
              © 2025 TorqueSites. Registered in England & Wales • All rights reserved.
            </p>
            <p className="text-[#D1D1D1] text-xs">
              Powered by MOTgenie · Built in the UK 🇬🇧
            </p>
          </div>
        </div>
      </footer>
    </main>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
  isDvsa = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  isDvsa?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className="group flex flex-col items-center text-center p-8 border border-torque-orange/20 rounded-2xl shadow-sm hover:shadow-[0_0_15px_#FF6B00]/20 transition-all duration-300 bg-card-surface hover:bg-gradient-to-br hover:from-torque-orange/5 hover:to-card-surface"
    >
      <div className="relative">
        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-torque-orange/10 text-torque-orange mb-6 group-hover:bg-torque-orange/20 group-hover:scale-110 transition-all duration-300 [&>*]:group-hover:text-[#C4FF00] [&>*]:transition-colors [&>*]:duration-300">
        {icon}
      </div>
        {isDvsa && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-lime-accent rounded-full flex items-center justify-center">
            <svg className="w-3 h-3 text-dark-bg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
        )}
      </div>
      <h3 className="font-semibold text-lg mb-3 text-white">{title}</h3>
      <p className="text-[#D1D1D1] leading-relaxed">{text}</p>
    </motion.div>
  );
}