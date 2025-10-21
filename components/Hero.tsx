'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(165deg, #000000 0%, #0E0E0E 40%, #1A1A1A 100%)',
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 80px,
              rgba(255, 140, 66, 0.02) 80px,
              rgba(255, 140, 66, 0.02) 82px
            )
          `,
        }}
      />

      {/* Radial Glow Accent */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255,140,66,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32 text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          style={{
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            letterSpacing: '-0.02em',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          You've earned your reputation.{' '}
          <motion.span
            initial="initial"
            animate="animate"
            variants={{
              initial: { textShadow: '0 0 0px rgba(255, 140, 66, 0)' },
              animate: {
                textShadow: [
                  '0 0 0px rgba(255, 140, 66, 0)',
                  '0 0 20px rgba(255, 140, 66, 0.3)',
                  '0 0 0px rgba(255, 140, 66, 0)',
                ],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
              },
            }}
            className="text-[#FF8C42] hover:text-[#D0FF00] transition-all duration-500 cursor-default inline-block"
            style={{
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            whileHover={{
              textShadow: '0 0 24px rgba(208, 255, 0, 0.4)',
            }}
          >
            Now let it shine online.
          </motion.span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
          style={{
            fontFamily: "'Inter', sans-serif",
            letterSpacing: '0.005em',
            maxWidth: '680px',
          }}
        >
          Professional, DVSA-ready websites that turn local searches into booked MOTs and services.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {/* Primary CTA */}
          <Link
            href="/launch"
            className="group relative inline-flex items-center justify-center bg-gradient-to-br from-[#FF8C42] to-[#FF9147] text-white hover:from-[#D0FF00] hover:to-[#C4FF00] hover:text-[#0E0E0E] rounded-xl px-8 py-4 font-semibold tracking-wider text-sm uppercase shadow-lg shadow-[#FF8C42]/30 hover:shadow-[0_6px_24px_rgba(208,255,0,0.5)] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Launch Your Site (£999)
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/book"
            className="inline-flex items-center justify-center border-2 border-white/20 text-white hover:border-[#D0FF00] hover:text-[#D0FF00] hover:shadow-[0_0_20px_rgba(208,255,0,0.2)] rounded-xl px-8 py-4 font-semibold tracking-wider text-sm uppercase transition-all duration-300 ease-out"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Book a Call
          </Link>
        </motion.div>

        {/* Trust Signals Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 flex flex-wrap gap-6 md:gap-8 justify-center text-sm text-gray-300 font-medium"
          style={{
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {/* DVSA Compliant */}
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="flex items-center gap-2 cursor-default">
            <span className="inline-block w-[18px] h-[18px] rounded-full bg-[#3AFF5C]" role="img" aria-label="DVSA compliant" />
            <span>DVSA Compliant</span>
          </motion.div>

          {/* UK Hosting */}
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="flex items-center gap-2 cursor-default">
            <span className="inline-block w-[18px] h-[18px] rounded-full bg-[#FF8C42]" role="img" aria-label="UK hosting" />
            <span>UK Hosting</span>
          </motion.div>

          {/* SSL Secure */}
          <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="flex items-center gap-2 cursor-default">
            <span className="inline-block w-[18px] h-[18px] rounded-full bg-[#D0FF00]" role="img" aria-label="SSL secure" />
            <span>SSL Secure</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}