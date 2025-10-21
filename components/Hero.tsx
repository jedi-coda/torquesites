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

// Container variants for stagger animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.1
    }
  }
};

// Child variants for stagger animation
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-dark-bg to-card-surface">
      {/* Content - Centered and Vertically Balanced */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 md:py-32 lg:py-40 flex items-center h-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center lg:text-left"
        >
          {/* Pill Badge */}
          <motion.div
            variants={childVariants}
            className="inline-flex items-center gap-2 px-4 py-2 bg-torque-orange/10 backdrop-blur-sm rounded-full border border-torque-orange/20 mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-torque-orange" />
            <span className="text-sm font-medium text-white" style={{ fontFamily: 'Inter, sans-serif' }}>Performance-driven design — engineered for UK garages</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={childVariants}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            You&apos;ve earned your reputation.
            <br />
            <span className="text-[#C4FF00]">
              Now let it perform online.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={childVariants}
            className="text-lg md:text-xl text-[#D1D1D1] mb-8 max-w-2xl mx-auto lg:mx-0"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Precision-engineered, DVSA-ready websites built for UK garages — designed to accelerate bookings and drive performance.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <a
              suppressHydrationWarning
              href={links.publicStarter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('launch_site', 'hero')}
              aria-label="Get started with TorqueSites for £999"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--torque-orange)] hover:bg-[#C4FF00] hover:shadow-[0_0_15px_#C4FF00]/40 transition-all duration-200 text-black font-semibold rounded-xl focus-visible:outline-[#C4FF00]"
            >
              Get Started £999
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </a>

            <Link
              href="/contact"
              onClick={() => trackClick('book_call', 'hero')}
              aria-label="Book a call with our team"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-torque-orange/30 text-white font-semibold rounded-xl hover:border-[#C4FF00] hover:shadow-[0_0_10px_#C4FF00]/30 transition-all duration-200 focus-visible:outline-[#C4FF00]"
            >
              Book a Call
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={childVariants}
            className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-[#D1D1D1]"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-success-pulse rounded-full"></div>
              <span>DVSA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-torque-orange rounded-full"></div>
              <span>UK Hosting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-lime-accent rounded-full"></div>
              <span>SSL Secure</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}