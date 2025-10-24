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
    <section className="hero-section">
      {/* Ambient Radial Background Glow */}
      <motion.div 
        className="hero-ambient-glow"
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
      
      <div className="hero-content">
        {/* Main Headline */}
        <motion.h1 
          className="hero-headline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="headline-white">You&apos;ve earned your reputation.</span>
          <br />
          <span className="headline-gradient-animated">
            Now let it shine online.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          className="hero-description"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Professional, DVSA-aligned sites that turn local searches into booked
          <br />
          MOTs & services — launched in 5–10 days.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          className="hero-cta-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.button 
            className="btn-start-engine"
            whileHover={{ scale: 1.03 }}
            onClick={() => trackClick('start_engine', 'hero')}
          >
            START YOUR ENGINE →
            <ArrowRight className="w-5 h-5 ml-2" />
          </motion.button>
          <Link href="#contact" onClick={() => trackClick('book_call', 'hero')}>
            <button className="btn-book-call">
              BOOK A CALL →
            </button>
          </Link>
        </motion.div>

        {/* Trust Badge */}
        <motion.div 
          className="hero-trust-badge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          DVSA aligned • UK hosting • SSL secure • 99.9% uptime
        </motion.div>
      </div>
    </section>
  );
}