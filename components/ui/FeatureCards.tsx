'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function FeatureCards() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    amount: 0.2,
    once: true,
    margin: '-50px 0px'
  });
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1
    }
  };

  return (
    <div ref={ref} className="relative py-16">
      {/* Alcantara Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#ffffff] to-[#f9f9f9]">
        <div className="absolute inset-0 bg-[url('/textures/alcantara.png')] bg-blend-soft-light opacity-[0.03] pointer-events-none" />
      </div>
      
      {/* Orange-Yellow Accent Dots */}
      <div className="absolute top-8 left-8 w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-60"></div>
      <div className="absolute top-16 right-12 w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-40"></div>
      <div className="absolute bottom-12 left-16 w-1 h-1 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-50"></div>
      <div className="absolute bottom-8 right-8 w-2.5 h-2.5 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full opacity-30"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {/* Porsche-Style Card */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="group cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Learn more about Porsche-style performance"
          >
            <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out p-8 h-full border border-gray-100">
              {/* Soft gradient glow on hover - desktop only */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-yellow-400/20 blur-sm"></div>
              </div>
              
              {/* Soft gradient border glow on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/30 to-yellow-400/30 blur-[1px]"></div>
              </div>
              
              {/* Top-left badge: "Precision Crafted" with light yellow badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-200 to-yellow-300 text-gray-800 shadow-sm border border-yellow-300">
                  Precision Crafted
                </span>
              </div>
              
              {/* Top-right badge: "2.1s Load Time" in small grey pill */}
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 shadow-sm">
                  2.1s Load Time
                </span>
              </div>
              
              {/* Bottom-left badge: "99% Uptime" with orange badge */}
              <div className="absolute bottom-4 left-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-sm">
                  99% Uptime
                </span>
              </div>
              
              {/* Bottom-right badge: "Engineering Excellence" in black pill */}
              <div className="absolute bottom-4 right-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-800 text-white shadow-sm">
                  Engineering Excellence
                </span>
              </div>
              
              {/* Main Content */}
              <div className="pt-16 pb-16">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  Performance Engineered
                </h3>
                <div className="text-4xl font-bold text-orange-600 mb-4">
                  Premium
                </div>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  Precision-crafted websites that reflect the same quality standards as luxury automotive brands. Built for performance, designed for results.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Speed Card */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="group cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Learn more about load speed"
          >
            <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out p-8 h-full border border-gray-100">
              {/* Soft pulse glow on hover - desktop only */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/20 to-yellow-400/20 blur-sm"></div>
              </div>
              
              {/* Speed Icon - Top Left */}
              <div className="absolute top-6 left-6 text-3xl opacity-80">
                ⚡
              </div>
              
              {/* Pulse Badge - Top Right */}
              <div className="absolute top-6 right-6">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-sm"
                >
                  Pulse
                </motion.div>
              </div>
              
              {/* Main Content */}
              <div className="pt-16 pb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  Lightning Speed
                </h3>
                <div className="text-4xl font-bold text-orange-600 mb-4">
                  2.1s
                </div>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  Lightning-fast page loads that keep customers engaged and convert better than slow competitors.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Uptime Card */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="group cursor-pointer"
            role="button"
            tabIndex={0}
            aria-label="Learn more about uptime"
          >
            <div className="relative bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out p-8 h-full border border-gray-100">
              {/* Soft pulse glow on hover - desktop only */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-yellow-400/20 blur-sm"></div>
              </div>
              
              {/* Shield Icon - Top Left */}
              <div className="absolute top-6 left-6 text-3xl opacity-80">
                🛡️
              </div>
              
              {/* Trust Badge - Bottom Left */}
              <div className="absolute bottom-6 left-6">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm">
                  Trust
                </span>
              </div>
              
              {/* Main Content */}
              <div className="pt-16 pb-16">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                  Rock Solid
                </h3>
                <div className="text-4xl font-bold text-orange-600 mb-4">
                  99%
                </div>
                <p className="text-gray-600 leading-relaxed text-sm font-medium">
                  Rock-solid reliability with enterprise-grade hosting that keeps your garage online 24/7.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
