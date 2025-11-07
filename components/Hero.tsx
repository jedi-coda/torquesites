'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState, useEffect, useMemo } from 'react';

// -----------------------------------------------------------------------------
// 🔍 Analytics placeholder
// -----------------------------------------------------------------------------
const trackClick = (event: string, location: string) => {
  console.log(`Analytics: ${event} clicked from ${location}`);
};

// -----------------------------------------------------------------------------
// 🔁 Rotating Headline Component
// -----------------------------------------------------------------------------
const RotatingHeadline = () => {
  const headlines = useMemo(
    () => [
      'Experience the 14‑Day TorqueSites Test Drive — free, fast, and built to convert.',
      'Turn quiet garages into booked‑out businesses.',
      'Launch your new website in 7 days — no contracts, no risk.'
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % headlines.length),
      4000
    );
    return () => clearInterval(interval);
  }, [headlines.length]);

  return (
    <div className="relative flex items-center justify-center text-center max-w-[720px] w-full px-6 min-h-[180px]">
      <AnimatePresence mode="wait">
        <motion.h1
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight text-balance"
          style={{ fontFamily: 'Poppins, sans-serif' }}
        >
          {headlines[index]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

// -----------------------------------------------------------------------------
// 🧭 Hero Component
// -----------------------------------------------------------------------------
type HeroProps = {
  mode?: 'default' | 'hyper';
};

export default function Hero({ mode = 'default' }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Time-based greeting (no “Garage Owner” text)
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Parallax animation for Hyper Mode
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

  // ---------------------------------------------------------------------------
  // 🚀 Hyper Mode Hero (Cinematic Brand Edition)
  // ---------------------------------------------------------------------------
  if (mode === 'hyper') {
    return (
      <section
        ref={sectionRef}
        className="relative w-full min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
        aria-label="TorqueSites cinematic hero"
      >
        {/* Porsche background with parallax */}
        <motion.div className="absolute inset-0 w-full h-full" style={{ y, scale }}>
          <Image
            src="/images/911-porsche.webp"
            alt="Performance‑driven website experience"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
        </motion.div>

        {/* Ambient overlays */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(208,255,0,0.25)_0%,rgba(208,255,0,0.1)_35%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
        </div>

        {/* Content */}
        <motion.div
          className="relative z-10 flex items-center justify-center min-h-[85vh] md:min-h-[90vh] px-6 py-16 md:py-24"
          style={{ opacity }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 font-medium mb-4 md:mb-6"
            >
              {greeting},
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 md:mb-8"
              style={{
                textShadow:
                  '0 4px 20px rgba(0,0,0,0.5), 0 0 40px rgba(208,255,0,0.15)',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Launch your site. Grow your garage.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-3xl mx-auto mb-10 md:mb-14"
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.5)',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              Welcome to TorqueSites — fast, flexible websites built for independent garages.
            </motion.p>

            {/* CTAs */}
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
                className="relative group px-8 md:px-10 py-4 md:py-5 bg-[#D0FF00] text-black font-bold rounded-full shadow-[0_0_12px_#C4FF00] hover:shadow-[0_0_20px_#C4FF00] transition-all duration-300"
              >
                <span className="relative z-10">START YOUR ENGINE</span>
                <ArrowRight className="w-5 h-5 inline-block ml-2" />
              </motion.button>

              <Link href="/book-demo" onClick={() => trackClick('book_call', 'hero_hyper')}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative px-8 md:px-10 py-4 md:py-5 text-white font-semibold rounded-full border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  BOOK A DEMO
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-sm text-white/80 font-medium tracking-wide"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              DVSA aligned • UK hosting • SSL secure • 99.9 % uptime
            </motion.p>
          </div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
      </section>
    );
  }

  // ---------------------------------------------------------------------------
  // 🌐 Default Mode Hero (used across all garage sites)
  // ---------------------------------------------------------------------------
  return (
    <motion.section
      className="relative flex flex-col justify-center items-center h-[90vh] text-white text-center overflow-hidden px-6 bg-[radial-gradient(circle_at_center,_#2b1602_0%,_#0b0b0c_100%)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-lime-400/5 blur-3xl" />
      </div>

      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-[720px] w-full">
        <RotatingHeadline />

        <p className="text-neutral-400 text-lg mt-6 mb-10">
          Experience your garage’s future — before you pay a penny.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mt-10">
          <motion.button
            onClick={() => trackClick('start_engine', 'hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-3 rounded-xl font-semibold text-black bg-lime-400 hover:bg-lime-500 transition-all duration-300 shadow-[0_0_8px_#C4FF00] hover:shadow-[0_0_16px_#C4FF00]"
          >
            START YOUR ENGINE →
          </motion.button>

          <Link href="/book-demo" onClick={() => trackClick('book_call', 'hero')}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 rounded-xl font-semibold text-black bg-lime-400 hover:bg-lime-500 transition-all duration-300 shadow-[0_0_8px_#C4FF00] hover:shadow-[0_0_16px_#C4FF00]"
            >
              BOOK A DEMO
            </motion.button>
          </Link>
        </div>

        <p className="text-neutral-400 opacity-80 text-sm tracking-wide mt-10 animate-pulse">
          DVSA aligned • UK hosting • SSL secure • 99.9 % uptime
        </p>
      </div>
    </motion.section>
  );
}
