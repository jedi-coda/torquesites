'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { type Garage } from "@/lib/garage";
import { getSafeGarage, getSafeContact } from "@/lib/fallbackGarage";

type Props = {
  garage?: Garage | null;
};

export default function GarageHeroHyper({ garage }: Props) {
  const safeGarage = getSafeGarage(garage);
  const safeContact = getSafeContact(garage);
  const [greeting, setGreeting] = useState('Good morning');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Dynamic greeting based on time of day
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

  // Prepare hero images (up to 4)
  const heroImages = safeGarage.hero?.variants
    ?.filter(v => v.type === 'image' && v.src)
    .slice(0, 4)
    .map(v => v.src) || [];

  // Default to Porsche if no images
  const defaultImages = ['/images/porsche.jpg'];
  const images = heroImages.length > 0 ? heroImages : defaultImages;

  // Auto-rotate carousel every 6 seconds
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleBookMOT = () => {
    const enquirySection = document.getElementById('enquiry');
    if (enquirySection) {
      enquirySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Image Carousel Background */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {images.map((src, index) => (
            index === currentImageIndex && (
              <motion.div
                key={`${src}-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={src}
                  alt={`${safeGarage.name} hero image ${index + 1}`}
                  fill
                  className="object-cover object-center"
                  priority={index === 0}
                  quality={90}
                  sizes="100vw"
                />
              </motion.div>
            )
          ))}
        </AnimatePresence>

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/80" />
        
        {/* Soft radial lime glow behind text */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(208,255,0,0.25)_0%,rgba(208,255,0,0.1)_30%,transparent_65%)]" />
        
        {/* Additional depth gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.7)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center p-6 max-w-6xl mx-auto">
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

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 md:mb-8"
          style={{ 
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(208, 255, 0, 0.15)'
          }}
        >
          Welcome to {safeGarage.name}.
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-3xl mx-auto mb-10 md:mb-14"
          style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
        >
          Your trusted local garage for MOTs, diagnostics, and expert servicing — fast, friendly, and reliable.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-8"
        >
          {/* Book Your MOT Button - Lime CTA */}
          <button
            onClick={handleBookMOT}
            className="relative group px-8 md:px-10 py-4 md:py-5 bg-[#D0FF00] text-black font-bold rounded-full shadow-lg hover:shadow-xl hover:shadow-[#D0FF00]/50 transition-all duration-300"
          >
            <span className="relative z-10">Book Your MOT</span>
            {/* Subtle lime glow on hover */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at center, rgba(208, 255, 0, 0.3) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }}
            />
          </button>

          {/* Call to Book Button - Conditional */}
          {safeContact.phone && (
            <a
              href={`tel:${safeContact.phone.replace(/\s/g, '')}`}
              className="group relative px-8 md:px-10 py-4 md:py-5 text-white font-semibold rounded-full transition-all duration-300"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="relative z-10">Call to Book</span>
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"
                style={{
                  background: 'radial-gradient(circle at center, rgba(208, 255, 0, 0.1) 0%, transparent 70%)'
                }}
              />
            </a>
          )}
        </motion.div>

        {/* Carousel Indicators - Only show if more than 1 image */}
        {images.length > 1 && (
          <div className="absolute bottom-8 flex gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentImageIndex 
                    ? '#D0FF00'
                    : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: index === currentImageIndex 
                    ? '0 0 20px rgba(208, 255, 0, 0.5)'
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentImageIndex) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentImageIndex) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  }
                }}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

