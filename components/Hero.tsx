'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { links } from '@/lib/links';

// Analytics tracking placeholder
const trackClick = (event: string, location: string) => {
  console.log(`Analytics: ${event} clicked from ${location}`);
  // TODO: Replace with actual analytics tracking
  // gtag('event', event, { location });
};

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0E0E0E] to-[#1A1A1A]">
      {/* Content - Centered and Vertically Balanced */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 lg:py-40 flex items-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left"
        >
          {/* Pill Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FF6B00]/10 backdrop-blur-sm rounded-full border border-[#FF6B00]/20 mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-[#FF6B00]" />
            <span className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Performance-driven design — engineered for UK garages</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            You&apos;ve earned your reputation.
            <br />
            <span className="bg-gradient-to-r from-[#FF6B00] to-[#FF9500] bg-clip-text text-transparent">
              Now let it perform online.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#D1D1D1] mb-8 max-w-2xl mx-auto lg:mx-0"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Precision-engineered, DVSA-ready websites built for UK garages — designed to accelerate bookings and drive performance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              suppressHydrationWarning
              href={links.publicStarter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('launch_site', 'hero')}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#FF6B00] to-[#FF9500] text-white font-semibold rounded-xl shadow-lg hover:shadow-[0_0_15px_#FF6B00]/50 hover:scale-105 transition-all duration-200"
            >
              Launch Your Site (£999)
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <Link
              href="/contact"
              onClick={() => trackClick('book_call', 'hero')}
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#FF6B00]/30 text-white font-semibold rounded-xl hover:bg-[#FF6B00]/10 hover:border-[#FF6B00]/50 transition-all duration-200"
            >
              Book a Call
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[#D1D1D1]"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#3AFF5C] rounded-full"></div>
              <span>DVSA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#FF6B00] rounded-full"></div>
              <span>UK Hosting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#C4FF00] rounded-full"></div>
              <span>SSL Secure</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}