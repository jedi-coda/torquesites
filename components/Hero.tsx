'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

// Analytics tracking placeholder
const trackClick = (event: string, location: string) => {
  console.log(`Analytics: ${event} clicked from ${location}`);
  // TODO: Replace with actual analytics tracking
  // gtag('event', event, { location });
};

type HeroProps = {
  mode?: 'default' | 'hyper';
};

export default function Hero({ mode = 'default' }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState('Good morning');

  // Dynamic time-based greeting for Hyper Mode
  useEffect(() => {
    if (mode === 'hyper') {
      const hour = new Date().getHours();
      if (hour < 12) {
        setGreeting('Good morning');
      } else if (hour < 18) {
        setGreeting('Good afternoon');
      } else {
        setGreeting('Good evening');
      }
    }
  }, [mode]);

  // Framer Motion parallax for Hyper Mode
  const { scrollYProgress } = useScroll(
    mode === 'hyper' 
      ? {
          target: sectionRef,
          offset: ['start end', 'end start']
        }
      : undefined
  );

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  // Hyper Mode: Porsche-inspired hero
  if (mode === 'hyper') {
    return (
      <section
        ref={sectionRef}
        className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
        aria-label="Hyper Mode hero"
      >
        {/* Porsche Parallax Background */}
        <motion.div className="absolute inset-0 w-full h-full" style={{ y, scale }}>
          <Image
            src="/images/911-porsche.webp"
            alt="Porsche 911 precision engineering"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
        </motion.div>

        {/* Ambient Layering - Dark overlay for text contrast */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          {/* Soft radial lime glow behind text */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(208,255,0,0.25)_0%,rgba(208,255,0,0.1)_30%,transparent_65%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex items-center justify-center min-h-[85vh] md:min-h-[90vh] px-6 py-16 md:py-24"
          style={{ opacity }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Dynamic greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-4 md:mb-6"
            >
              <p className="text-xl md:text-2xl text-white/90 font-medium">
                {greeting},
              </p>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 md:mb-8"
              style={{ 
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(208, 255, 0, 0.15)',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Where performance meets prestige.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-3xl mx-auto mb-10 md:mb-14"
              style={{ 
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Welcome to TorqueSites — precision websites for high-end garages.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12"
            >
              <motion.button
                onClick={() => trackClick('start_engine', 'hero_hyper')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="relative group px-8 md:px-10 py-4 md:py-5 bg-[#D0FF00] text-black font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-[#D0FF00]/50 transition-all duration-300"
              >
                <span className="relative z-10">START YOUR ENGINE</span>
                <ArrowRight className="w-5 h-5 inline-block ml-2" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  style={{ width: '50%' }}
                  animate={{ x: ['-200%', '300%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
                />
                {/* Enhanced lime glow on button */}
                <motion.div
                  className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(208, 255, 0, 0.3) 0%, transparent 70%)',
                    filter: 'blur(20px)'
                  }}
                />
              </motion.button>

              <Link href="/book-demo" onClick={() => trackClick('book_call', 'hero_hyper')}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative px-8 md:px-10 py-4 md:py-5 text-white font-semibold rounded-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <span className="relative z-10">BOOK A DEMO</span>
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'radial-gradient(circle at center, rgba(208, 255, 0, 0.1) 0%, transparent 70%)'
                    }}
                  />
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
              <p className="text-sm text-white/80 font-medium tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                DVSA aligned • UK hosting • SSL secure • 99.9% uptime
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
      </section>
    );
  }

  // Default Mode: Original hero
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0E0E0E] to-[#1A1A1A]">
      {/* Diagonal Line Texture */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.015) 0px, rgba(255, 255, 255, 0.015) 1px, transparent 1px, transparent 48px)'
        }}
      />
      
      {/* Background Glow Layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#ff6b00_0%,#0b0b0c_80%)] opacity-25 blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6 py-20 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
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
            <span
              className="transition-colors duration-700 text-[#ff9500] hover:text-[#c4ff00] hover:drop-shadow-[0_0_0.4rem_#C4FF00]"
            >
              Now let it shine online.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-[#D1D1D1] mb-12 max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            High-performance websites for UK garages — turning searches into MOTs and services.
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
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold uppercase text-white bg-[#FF9500] hover:bg-[#C4FF00] hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_rgba(196,255,0,0.6)]"
            >
              START YOUR ENGINE
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <Link href="/book-demo" onClick={() => trackClick('book_call', 'hero')}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-bold uppercase text-white bg-[#FF9500] hover:bg-[#C4FF00] hover:text-black transition-all duration-300 hover:shadow-[0_0_15px_rgba(196,255,0,0.6)]"
              >
                BOOK A DEMO
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