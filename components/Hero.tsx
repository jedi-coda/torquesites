'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Analytics tracking placeholder
const trackClick = (event: string, location: string) => {
  console.log(`Analytics: ${event} clicked from ${location}`);
  // TODO: Replace with actual analytics tracking
  // gtag('event', event, { location });
};

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0E0E0E] to-[#1A1A1A]">
      {/* Ambient Background Glow */}
      <motion.div
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,_rgba(255,150,0,0.12)_0%,_rgba(0,0,0,0.9)_80%)]"
        animate={{ scale: [1, 1.02, 1], opacity: [0.7, 0.9, 0.7] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight tracking-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            You&apos;ve earned your reputation.
            <br />
            <span className="shine-gradient-glow bg-gradient-to-r from-[#FF9500] to-[#C4FF00] bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(196,255,0,0.5)] animate-softPulse">
              Now let it shine online.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#D1D1D1] mb-12 max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Professional, DVSA-aligned sites that turn local searches into booked MOTs & services — launched in 5–10 days.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.a
              href="#pricing"
              onClick={() => trackClick('start_engine', 'hero')}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-[#FF9500] to-[#C4FF00] hover:brightness-110 transition-all duration-500 shadow-[0_0_12px_rgba(255,150,0,0.4)] hover:shadow-[0_0_18px_rgba(196,255,0,0.6)]"
            >
              START YOUR ENGINE →
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <Link
              href="#contact"
              onClick={() => trackClick('book_call', 'hero')}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-400 text-white font-bold rounded-xl hover:border-[#C4FF00] hover:text-[#C4FF00] transition-all duration-300"
            >
              BOOK A CALL →
            </Link>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <p className="text-sm text-[#D1D1D1] font-medium tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
              DVSA aligned • UK hosting • SSL secure • 99.9% uptime
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}