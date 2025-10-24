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
      {/* Ambient Radial Background Glow */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,149,0,0.15) 0%, rgba(0,0,0,0.9) 100%)'
        }}
        animate={{ 
          scale: [1, 1.015, 1], 
          opacity: [0.6, 0.9, 0.6] 
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity, 
          ease: 'easeInOut' 
        }}
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
            <motion.span 
              className="headline-gradient-shine"
              whileHover={{ 
                backgroundImage: 'linear-gradient(to right, #FF9500, #C4FF00)',
                textShadow: '0 0 12px rgba(196,255,0,0.7)'
              }}
              transition={{ duration: 0.3 }}
            >
              Now let it shine online.
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
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
            <motion.button
              onClick={() => trackClick('start_engine', 'hero')}
              whileHover={{ scale: 1.03 }}
              className="btn-start-engine-porsche"
            >
              START YOUR ENGINE →
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>

            <Link href="#contact" onClick={() => trackClick('book_call', 'hero')}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="btn-book-call-porsche"
              >
                BOOK A CALL →
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust Badge */}
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