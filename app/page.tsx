"use client";

import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup";
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
  // ROI section scroll animation refs
  const bookingRef = useRef(null);
  const callsRef = useRef(null);
  const rankingRef = useRef(null);
  
  const isBookingVisible = useInView(bookingRef, { amount: 0.5, once: false });
  const isCallsVisible = useInView(callsRef, { amount: 0.5, once: false });
  const isRankingVisible = useInView(rankingRef, { amount: 0.5, once: false });

  const [bookingCount, setBookingCount] = useState(0);
  const [callsCount, setCallsCount] = useState(0);
  const [rankingCount, setRankingCount] = useState(0);

  // Count animation function
  const animateCounter = (isVisible: boolean, setCount: (n: number) => void, target: number) => {
    if (isVisible) {
      let start = 0;
      const duration = 1200; // 1.2s duration
      const stepTime = 1000 / 60; // 60fps
      const increment = target / (duration / stepTime);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(timer);
        }
        setCount(Math.round(start));
      }, stepTime);

      return () => clearInterval(timer);
    } else {
      setCount(0); // reset when out of view
    }
  };

  // Animate when each metric becomes visible
  useEffect(() => animateCounter(isBookingVisible, setBookingCount, 47), [isBookingVisible]);
  useEffect(() => animateCounter(isCallsVisible, setCallsCount, 23), [isCallsVisible]);
  useEffect(() => animateCounter(isRankingVisible, setRankingCount, 31), [isRankingVisible]);

  return (
    <div className="bg-gradient-to-b from-[#0E0E0E] to-[#1A1A1A] backdrop-blur-md min-h-screen">
    <main className="font-sans text-white">
      {/* HEADER */}
      <Header />

      {/* HERO */}
      <Hero />

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent mb-20" />

      {/* PRECISION SECTION - Porsche 911 Dynamic Hero */}
      <PrecisionSection />

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent mb-20" />

      {/* FEATURES */}
      <section className="py-16 md:py-20 px-6">
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

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent mb-20" />

      {/* ROI SECTION */}
      <section className="py-24 md:py-32">
        
        <div className="space-y-16 max-w-6xl mx-auto text-center px-6">
          <div>
            <h2 className="text-5xl sm:text-6xl font-bold text-white text-center">
              One extra MOT per week covers your TorqueSite.
            </h2>
            <p className="mt-4 text-center text-lg sm:text-xl font-medium text-lime-400" style={{ textShadow: '0 0 8px rgba(200,255,0,0.3)' }}>
              Real performance, proven by data. TorqueSites turns online searches into booked MOTs, calls, and loyal customers.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <motion.div
              ref={bookingRef}
              animate={{ 
                scale: isBookingVisible ? [1, 1.02, 1] : 1,
                opacity: isBookingVisible ? 1 : 0,
                y: isBookingVisible ? 0 : 20
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center cursor-pointer rounded-xl bg-[#0E0E0E] p-6 w-72 text-center transition-colors border border-[#FF6B00]/30 hover:border-[#C4FF00] duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] text-green-400 mb-4">
                <TrendingUp size={32} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                {bookingCount}%
              </h3>
              <p className="text-gray-300">More Online Bookings</p>
            </motion.div>
            
            <motion.div
              ref={callsRef}
              animate={{ 
                scale: isCallsVisible ? [1, 1.02, 1] : 1,
                opacity: isCallsVisible ? 1 : 0,
                y: isCallsVisible ? 0 : 20
              }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center cursor-pointer rounded-xl bg-[#0E0E0E] p-6 w-72 text-center transition-colors border border-[#FF6B00]/30 hover:border-[#C4FF00] duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] text-blue-400 mb-4">
                <Phone size={32} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-blue-400 mb-2">
                {callsCount}%
              </h3>
              <p className="text-gray-300">More Phone Calls</p>
            </motion.div>
            
            <motion.div
              ref={rankingRef}
              animate={{ 
                scale: isRankingVisible ? [1, 1.02, 1] : 1,
                opacity: isRankingVisible ? 1 : 0,
                y: isRankingVisible ? 0 : 20
              }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
              whileHover={{ y: -4, transition: { type: "spring", stiffness: 300 } }}
              className="flex flex-col items-center cursor-pointer rounded-xl bg-[#0E0E0E] p-6 w-72 text-center transition-colors border border-[#FF6B00]/30 hover:border-[#C4FF00] duration-300"
            >
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1e1e1e] text-yellow-400 mb-4">
                <Star size={32} strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                {rankingCount}%
              </h3>
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
            className="mt-12 bg-[#1A1A1A] p-6 rounded-xl border border-[#FF6B00] max-w-3xl mx-auto"
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
            <cite className="text-white font-semibold">
              Newtown Garage, Chesham
            </cite>
          </motion.div>
          
          {/* v1.2.2-results-polish — scroll animation, hover glow, testimonial fade-in */}
        </div>
      </section>
      
      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent mb-20" />
      
      {/* PRICING */}
      <section id="pricing" className="py-20">
        <HomepagePricingCards />
      </section>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent mb-20" />

      {/* GUARANTEE */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center my-16"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-[#FF6B00] font-bold text-3xl sm:text-4xl text-center hover:drop-shadow-[0_0_10px_#FF6B00] transition-all duration-300"
        >
          Our Guarantee
        </motion.h2>
        <p className="mt-4 text-center text-white max-w-2xl mx-auto">
          Your site, built fast — live in 5–10 days.<br />
          If you&apos;re not 100% satisfied, your setup fee is protected by our performance-back guarantee.
        </p>
        <p className="mt-4 text-[#FF6B00] font-medium text-center hover:drop-shadow-[0_0_10px_#FF6B00] transition-all duration-300">
          No risk. Just results.
        </p>
      </motion.section>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent mb-20" />

      {/* VIP SECTION */}
      <section id="partner100" className="py-20">
      <VIPSection />
      </section>

      {/* Divider */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-lime-400/40 to-transparent mb-20" />

      {/* FINAL CTA */}
      <section className="py-24 px-4 text-center bg-[#0E0E0E]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
            Ready to accelerate online?
          </h2>
          <p className="text-lg md:text-xl text-white text-center max-w-2xl mx-auto mb-8">
            Give your garage the website it deserves — engineered, trusted, and built to dominate your market.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 border border-lime-400 text-white hover:bg-lime-400 hover:text-neutral-900 hover:shadow-lg transition ease-out duration-300"
            >
              Book a Demo
            </Link>
            <Link
              href="/#pricing"
              className="px-6 py-3 border border-lime-400 text-white hover:bg-lime-400 hover:text-neutral-900 hover:shadow-lg transition ease-out duration-300"
            >
              See Pricing →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-t-lime-500/20 pt-10 text-center text-sm text-muted-foreground relative">
        <p className="text-xs text-neutral-400 mb-8">
          Powered by <span className="text-lime-400">TorqueSites</span>. Engineered in the UK. © 2025 TorqueSites Ltd. All rights reserved.
        </p>
        <div className="w-full h-px bg-gradient-to-r from-transparent via-lime-500/30 to-transparent" />
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