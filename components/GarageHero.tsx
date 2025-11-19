"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Shield, Award, Clock, CheckCircle } from 'lucide-react';
import { type Garage } from "@/lib/garage";
import { getSafeGarage, getSafeTheme, premiumTheme } from "@/lib/fallbackGarage";

// 🛠️ GarageHero component with shared fallback logic for production scale
// ✅ Uses shared fallbackGarage for consistent defaults
// ✅ Handles null/undefined garage prop gracefully
// ✅ Supports dynamic greeting with garage name
// ✅ Rotating headline messages with smooth fade transitions
// ✅ Falls back to default content when garage data is missing
// ✅ Ready for 1000+ dynamic garage microsites

export default function GarageHero({ garage }: { garage?: Garage | null }) {
  const safeGarage = getSafeGarage(garage);
  const theme = getSafeTheme(garage);
  const heroConfig = safeGarage.hero || { greeting: true, background: "gradient" };

  // Rotating headline messages - use garage.hero.headlines if available, otherwise fallback
  const rotatingMessages = (garage as any)?.hero?.headlines && Array.isArray((garage as any).hero.headlines) && (garage as any).hero.headlines.length > 0
    ? (garage as any).hero.headlines
    : [
        "DVSA-Approved MOT Testing",
        "Fast, Friendly, Transparent Service",
        "Book Online in 60 Seconds"
      ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [dynamicGreeting, setDynamicGreeting] = useState("Good morning");

  // Compute time-based greeting
  // Morning = 5-11, Afternoon = 12-17, Evening = 18-4
  useEffect(() => {
    if (!heroConfig.greeting) return;
    
    const hour = new Date().getHours();
    let timeGreeting = "Good evening"; // Default for 18-4
    if (hour >= 5 && hour < 12) {
      timeGreeting = "Good morning";
    } else if (hour >= 12 && hour < 18) {
      timeGreeting = "Good afternoon";
    }
    
    setDynamicGreeting(timeGreeting);
  }, [heroConfig.greeting]);

  // Auto-rotate through messages every 3 seconds
  useEffect(() => {
    if (rotatingMessages.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % rotatingMessages.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [rotatingMessages.length]);

  const currentRotatingHeadline = rotatingMessages[currentMessageIndex] || rotatingMessages[0];
  const subtext = safeGarage.tagline || "Expert MOT testing and vehicle care for all makes and models";

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] as any },
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
  
  // Extract brand colors - use garage.brand.primary/dark or theme, with fallbacks
  const primaryColor = (garage as any)?.brand?.primary || theme.primary || premiumTheme.brandColor;
  const secondaryColor = (garage as any)?.brand?.dark || (garage as any)?.brand?.secondaryColor || theme.secondary || "#333333";
  const accentColor = theme.accent || premiumTheme.accentColor || primaryColor;
  
  // Determine greeting text color based on brand background or primary color
  const bgColor = (garage as any)?.brand?.bgColor || '';
  const primaryColorStr = primaryColor.toLowerCase();
  const isGoldOrYellow = 
    bgColor.toLowerCase().includes('gold') || 
    bgColor.toLowerCase().includes('yellow') ||
    primaryColorStr.includes('e0aa3e') || // GEM gold color
    primaryColorStr.includes('ffd700') || // Standard gold
    primaryColorStr.includes('ffc107') || // Amber/yellow
    primaryColorStr.includes('fdd835');   // Yellow
  const greetingTextColor = isGoldOrYellow ? 'text-black' : 'text-white';
  
  // Background styling
  const isSolidBackground = heroConfig.background === "solid";
  const backgroundStyle = isSolidBackground 
    ? { 
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
      }
    : {};

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {isSolidBackground ? (
          <div 
            className="w-full h-full"
            style={backgroundStyle}
          />
        ) : (
          <>
            {/* Fallback gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-900" />
            
            {/* Only construct and render <Image /> if a valid heroImage path exists */}
            {(garage as any)?.heroImage && (
              <Image
                src={(garage as any).heroImage}
                alt={`${garage?.name || 'Garage'} Hero Image`}
                fill
                className="absolute inset-0 object-cover opacity-80"
                priority
              />
            )}
            
            {/* Premium gradient overlay for image backgrounds */}
            {(garage as any)?.heroImage && (
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent" />
            )}
          </>
        )}
        
        {/* Ambient background glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px]"
            style={{
              background: `radial-gradient(circle, ${primaryColor}30, ${primaryColor}10, transparent)`
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{ duration: 2.5, delay: 0.5, ease: 'easeOut' }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[100px]"
            style={{
              background: `radial-gradient(circle, ${accentColor}20, ${accentColor}05, transparent)`
            }}
          />
        </div>
        
        {/* Glass blur overlay */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center p-6 max-w-6xl mx-auto"
      >
        {/* DVSA Approved Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <div 
            className="inline-block px-4 py-2 border rounded-full mb-4 backdrop-blur-sm"
            style={{ 
              backgroundColor: `${accentColor}20`,
              borderColor: `${accentColor}30`
            }}
          >
            <span 
              className="text-sm font-medium tracking-wide flex items-center gap-2"
              style={{ color: accentColor }}
            >
              <Shield className="w-4 h-4" />
              DVSA APPROVED
            </span>
          </div>
        </motion.div>
        
        {/* Greeting */}
        {heroConfig.greeting && (
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl font-light text-gray-400 mb-2 tracking-wide"
          >
            {dynamicGreeting}
          </motion.p>
        )}
        
        {/* Main Headline */}
        <motion.h1 
          variants={itemVariants}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight ${greetingTextColor}`}
        >
          <motion.span variants={glowVariants} className="relative inline-block">
            <span className="relative z-10">
              Welcome to {safeGarage.name}
            </span>
            <motion.span
              animate={{ opacity: [0.4, 0.6, 0.4], scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 blur-xl opacity-50 -z-10"
              style={{ color: accentColor }}
            >
              Welcome to {safeGarage.name}
            </motion.span>
          </motion.span>
        </motion.h1>
        
        {/* Rotating headline with fade transition */}
        {rotatingMessages.length > 0 && (
          <motion.div 
            variants={itemVariants}
            className="relative min-h-[80px] md:min-h-[96px] mb-6 flex items-center justify-center px-4"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-white/95 leading-tight max-w-5xl mx-auto text-center break-words"
              >
                {currentRotatingHeadline}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        )}
        
        {/* Tagline below rotating headlines */}
        {subtext && (
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-lg md:text-xl max-w-3xl mb-8 text-gray-400 leading-relaxed"
          >
            {subtext}
          </motion.p>
        )}
        
        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-full overflow-hidden transition-all duration-500 w-full sm:w-auto min-w-[240px]"
            style={{ backgroundColor: accentColor }}
          >
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
              style={{ backgroundColor: `${accentColor}50` }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="relative z-10 flex items-center justify-center text-white group-hover:text-white transition-colors duration-300">
              Book Your MOT
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-full border-2 bg-transparent overflow-hidden transition-all duration-500 w-full sm:w-auto min-w-[240px]"
            style={{ 
              borderColor: accentColor,
              color: accentColor
            }}
          >
            <span 
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
              style={{ backgroundColor: accentColor }}
            />
            <motion.span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"
              style={{ backgroundColor: `${accentColor}50` }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <span className="relative z-10 flex items-center justify-center gap-2 text-current group-hover:text-black transition-colors duration-300">
              <Phone className="w-4 h-4" />
              Call to Book
            </span>
          </motion.button>
        </motion.div>
        
        {/* Trust Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm sm:text-base text-gray-400"
        >
          <span className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            DVSA Approved
          </span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Expert Service
          </span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Fast Turnaround
          </span>
          <span className="hidden sm:inline text-gray-600">•</span>
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Trusted Local
          </span>
        </motion.div>
        
        {/* Message indicators */}
        {rotatingMessages.length > 1 && (
          <div className="absolute bottom-8 flex gap-3">
            {rotatingMessages.map((_: string, index: number) => (
              <motion.button
                key={index}
                onClick={() => setCurrentMessageIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className="w-4 h-4 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentMessageIndex 
                    ? accentColor
                    : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: index === currentMessageIndex 
                    ? `0 0 20px ${accentColor}50`
                    : 'none'
                }}
                aria-label={`Show message ${index + 1}`}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Development environment badge - top-left */}
      {process.env.NODE_ENV !== 'production' && (
        <div className="absolute top-4 left-4 z-10">
          <span className="rounded-full bg-black/60 px-4 py-1 text-xs font-medium text-white shadow-md backdrop-blur-sm">
            SUPERCHARGED MODE • POWERED BY TORQUESITES
          </span>
        </div>
      )}

      {/* Garage logo - bottom right */}
      {(garage as any)?.logoUrl && (
        <div className="absolute bottom-4 right-4 z-10">
          <img
            src={(garage as any).logoUrl}
            alt={`${safeGarage.name} logo`}
            className="h-10 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
          />
        </div>
      )}
    </div>
  );
}
