'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Gradient Logo */}
            <Link href="/" className="text-2xl font-bold">
              <span 
                className="bg-gradient-to-r from-[#D0FF00] to-[#C4FF00] bg-clip-text text-transparent"
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                  letterSpacing: '-0.01em',
                }}
              >
                TorqueSites
              </span>
            </Link>

            {/* Navigation */}
            <nav className="flex gap-8">
              <Link 
                href="/pricing" 
                className="relative text-white/80 hover:text-white transition-colors duration-300 font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="relative z-10">Pricing</span>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D0FF00] to-[#B8FF00]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </Link>
              <Link 
                href="/contact" 
                className="relative text-white/80 hover:text-white transition-colors duration-300 font-medium"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <span className="relative z-10">Book a Call</span>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#D0FF00] to-[#B8FF00]"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Base Gradient Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(165deg, #000000 0%, #0E0E0E 40%, #1A1A1A 100%)',
          }}
        />

        {/* Papaya Texture Layer */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{
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

        {/* Ambient Papaya Radial Glow */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] pointer-events-none z-[2]"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,66,0.12) 0%, rgba(255,140,66,0.04) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Ambient Glow Layer */}
        <div 
          className="absolute inset-0 z-[1]"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(255,140,66,0.03) 0%, transparent 60%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32 text-center">
          {/* Headline with Motion Variants */}
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
              animate="ambient"
              variants={{
                initial: { 
                  textShadow: '0 0 0px rgba(255, 140, 66, 0)',
                  filter: 'drop-shadow(0 0 0px rgba(255, 140, 66, 0))'
                },
                ambient: {
                  textShadow: [
                    '0 0 0px rgba(255, 140, 66, 0)',
                    '0 0 20px rgba(255, 140, 66, 0.3)',
                    '0 0 0px rgba(255, 140, 66, 0)',
                  ],
                  filter: [
                    'drop-shadow(0 0 0px rgba(255, 140, 66, 0))',
                    'drop-shadow(0 0 8px rgba(255, 140, 66, 0.2))',
                    'drop-shadow(0 0 0px rgba(255, 140, 66, 0))',
                  ],
                  transition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                },
                hover: {
                  textShadow: '0 0 24px rgba(208, 255, 0, 0.4)',
                  filter: 'drop-shadow(0 0 30px rgba(208, 255, 0, 0.3))',
                  transition: {
                    duration: 0.3,
                    ease: 'easeOut',
                  },
                },
              }}
              className="bg-gradient-to-r from-[#FF8C42] to-[#FF9147] bg-clip-text text-transparent hover:from-[#D0FF00] hover:to-[#C4FF00] transition-all duration-500 cursor-default inline-block"
              style={{
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              whileHover="hover"
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
            {/* Primary CTA with Lime Gradient Slide-up */}
            <Link
              href="/launch"
              className="group relative inline-flex items-center justify-center bg-gradient-to-br from-[#FF8C42] to-[#FF9147] text-white hover:from-[#D0FF00] hover:to-[#C4FF00] hover:text-[#0E0E0E] rounded-xl px-8 py-4 font-semibold tracking-wider text-sm uppercase shadow-lg shadow-[#FF8C42]/30 hover:shadow-[0_6px_24px_rgba(208,255,0,0.5)] transition-all duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-0.5 overflow-hidden"
              style={{
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {/* Lime Gradient Slide-up Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#D0FF00]/30 via-[#D0FF00]/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Launch Your Site (£999)</span>
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

          {/* Trust Badges with Slight Lift */}
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
            <motion.div 
              whileHover={{ y: -3, scale: 1.05 }} 
              transition={{ duration: 0.2, ease: 'easeOut' }} 
              className="flex items-center gap-2 cursor-default"
            >
              <span className="inline-block w-[18px] h-[18px] rounded-full bg-[#3AFF5C]" role="img" aria-label="DVSA compliant" />
              <span>DVSA Compliant</span>
            </motion.div>

            {/* UK Hosting */}
            <motion.div 
              whileHover={{ y: -3, scale: 1.05 }} 
              transition={{ duration: 0.2, ease: 'easeOut' }} 
              className="flex items-center gap-2 cursor-default"
            >
              <span className="inline-block w-[18px] h-[18px] rounded-full bg-[#FF8C42]" role="img" aria-label="UK hosting" />
              <span>UK Hosting</span>
            </motion.div>

            {/* SSL Secure */}
            <motion.div 
              whileHover={{ y: -3, scale: 1.05 }} 
              transition={{ duration: 0.2, ease: 'easeOut' }} 
              className="flex items-center gap-2 cursor-default"
            >
              <span className="inline-block w-[18px] h-[18px] rounded-full bg-[#D0FF00]" role="img" aria-label="SSL secure" />
              <span>SSL Secure</span>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}