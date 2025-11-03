'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

type Props = {
  phone?: string | null;
  garageName?: string;
  location?: string;
};

export default function CinematicCTA({ phone, garageName, location }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [greeting, setGreeting] = useState('Good morning');

  // Dynamic time-based greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good morning');
    } else if (hour < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  const handleBookMOT = () => {
    const enquirySection = document.getElementById('enquiry');
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden"
      aria-label="Call to action"
    >
      {/* Porsche Parallax Background */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y, scale }}>
        <Image
          src="/images/911-porsche.JPG"
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
        {/* Enhanced radial lime glow behind text and button */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(208,255,0,0.25)_0%,rgba(208,255,0,0.1)_30%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* CTA Content */}
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

          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 md:mb-8"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(208, 255, 0, 0.15)' }}
          >
            {garageName ? `Welcome to ${garageName}.` : 'Precision meets performance.'}
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-3xl mx-auto mb-10 md:mb-14"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            Your trusted local garage for MOTs, diagnostics, and expert servicing — fast, friendly, and reliable.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <motion.button
              onClick={handleBookMOT}
              className="relative group px-8 md:px-10 py-4 md:py-5 bg-[#D0FF00] text-black font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-[#D0FF00]/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Book Your MOT</span>
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

            {phone && (
              <motion.a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="group relative px-8 md:px-10 py-4 md:py-5 text-white font-semibold rounded-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">Call to Book</span>
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(208, 255, 0, 0.1) 0%, transparent 70%)'
                  }}
                />
              </motion.a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
    </section>
  );
}
