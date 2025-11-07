'use client';
import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const Hero: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const controls = useAnimation();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning,');
    else if (hour < 18) setGreeting('Good afternoon,');
    else setGreeting('Good evening,');
    controls.start('visible');
  }, [controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] as any },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: 'easeOut' as any },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0B0B0C] via-[#1B1B1C] to-[#0B0B0C]">
      {/* Ambient Lighting */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, ease: 'easeOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] bg-gradient-radial from-orange-500/30 via-orange-600/10 to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 2.5, delay: 0.5, ease: 'easeOut' }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px] bg-gradient-radial from-[#C4FF00]/20 via-[#C4FF00]/5 to-transparent"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-20 text-center"
      >
        {/* Greeting */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-light text-gray-400 mb-4 tracking-wide"
        >
          {greeting}
        </motion.p>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="block text-white mb-2">
            You've earned your reputation.
          </span>

          {/* Glow line */}
          <motion.span variants={glowVariants} className="relative inline-block">
            <span className="relative z-10 text-[#C4FF00] glow-text">
              Now let it shine online.
            </span>
            <motion.span
              animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 text-[#C4FF00] blur-xl opacity-50 -z-10"
            >
              Now let it shine online.
            </motion.span>
            <motion.span
              animate={{ opacity: [0.2, 0.3, 0.2], scale: [1, 1.05, 1] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
              className="absolute inset-0 text-[#C4FF00] blur-2xl opacity-30 -z-20"
            >
              Now let it shine online.
            </motion.span>
          </motion.span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-light text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
        >
          Experience your garage's future — before you pay a penny.
        </motion.p>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
        >
          High-performance websites for UK garages — turning searches into MOTs and services.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-full overflow-hidden transition-all duration-500 w-full sm:w-auto min-w-[240px]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:from-[#C4FF00] group-hover:to-[#A8E600] transition-all duration-500" />
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-gradient-to-r from-orange-400/50 to-orange-500/50 group-hover:from-[#C4FF00]/50 group-hover:to-[#A8E600]/50 transition-opacity duration-500"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2 text-black group-hover:text-black transition-colors duration-300">
              START YOUR ENGINE
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-full border-2 border-gray-600 hover:border-[#C4FF00] bg-transparent text-white hover:text-black overflow-hidden transition-all duration-500 w-full sm:w-auto min-w-[240px]"
          >
            <span className="absolute inset-0 bg-[#C4FF00] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl bg-[#C4FF00]/50 transition-opacity duration-500"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="relative z-10">BOOK A DEMO</span>
          </motion.button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-500"
        >
          <span>DVSA aligned</span>
          <span className="hidden sm:inline text-gray-700">•</span>
          <span>UK hosting</span>
          <span className="hidden sm:inline text-gray-700">•</span>
          <span>SSL secure</span>
          <span className="hidden sm:inline text-gray-700">•</span>
          <span>99.9% uptime</span>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
