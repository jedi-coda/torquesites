'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function CinematicCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden"
      aria-label="Call to action"
    >
      {/* Porsche Parallax Background */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y, scale }}>
        <Image
          src="/images/porsche-precision.jpg"
          alt="Precision engineering"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </motion.div>

      {/* Ambient Layering */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(208,255,0,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* CTA Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center min-h-[85vh] md:min-h-[90vh] px-6 py-16 md:py-24"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 md:mb-8"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(208, 255, 0, 0.1)' }}
          >
            Shine online.
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-3xl mx-auto mb-10 md:mb-14"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            You’ve earned your reputation in the garage — now let it perform on the web.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16">
            <motion.button
              className="relative group px-8 md:px-10 py-4 md:py-5 bg-[#D0FF00] text-black font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Launch My TorqueSite</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ width: '50%' }}
                animate={{ x: ['-200%', '300%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
              />
            </motion.button>

            <motion.button
              className="group relative px-8 md:px-10 py-4 md:py-5 text-white font-semibold rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Book a Demo</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(208, 255, 0, 0.1) 0%, transparent 70%)'
                }}
              />
            </motion.button>
          </div>

          {/* Trust Anchors */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 text-sm md:text-base">
            {["Launch in 10 days", "Money-back guarantee", "UK-based support"].map((text, index) => (
              <div key={index} className="flex items-center gap-2 text-white/80">
                <span className="text-lg md:text-xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(208, 255, 0, 0.3))' }}>✅</span>
                <span className="font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
    </section>
  );
}
