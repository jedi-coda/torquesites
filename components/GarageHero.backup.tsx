"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
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

  // Compute time-based greeting with garage name
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
    
    setDynamicGreeting(`${timeGreeting}, Welcome to ${safeGarage.name}`);
  }, [heroConfig.greeting, safeGarage.name]);

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
        
        {/* Premium accent overlay - use brand primary color */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent"
          style={{
            background: `linear-gradient(to bottom right, transparent, transparent, ${primaryColor}10)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <div 
            className="inline-block px-4 py-2 border rounded-full mb-4"
            style={{ 
              backgroundColor: `${accentColor}20`,
              borderColor: `${accentColor}30`
            }}
          >
            <span 
              className="text-sm font-medium tracking-wide"
              style={{ color: accentColor }}
            >
              DVSA APPROVED
            </span>
          </div>
        </div>
        
        <h1 className={`text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight ${greetingTextColor}`}>
          {heroConfig.greeting && (
            <span>
              {dynamicGreeting}
            </span>
          )}
          {!heroConfig.greeting && (
            <span>Welcome to {safeGarage.name}</span>
          )}
        </h1>
        
        {/* Rotating headline with fade transition - ensure proper text wrapping */}
        {rotatingMessages.length > 0 && (
          <div className="relative min-h-[80px] md:min-h-[96px] mb-8 flex items-center justify-center px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight text-center px-4 break-words max-w-5xl">
                  {currentRotatingHeadline}
                </h2>
              </motion.div>
            </AnimatePresence>
          </div>
        )}
        
        {/* Tagline below rotating headlines */}
        {subtext && (
          <p className="text-xl md:text-2xl max-w-3xl mb-8 text-gray-200 leading-relaxed">
            {subtext}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button 
            className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: accentColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = primaryColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = accentColor;
            }}
          >
            Book Your MOT
          </button>
          <button 
            className="px-8 py-4 border-2 font-semibold rounded-lg transition-all duration-300"
            style={{ 
              borderColor: accentColor,
              color: accentColor
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${accentColor}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Call to Book
          </button>
        </div>
        
        {/* Message indicators */}
        {rotatingMessages.length > 1 && (
          <div className="absolute bottom-8 flex gap-3">
            {rotatingMessages.map((_: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentMessageIndex(index)}
                className="w-4 h-4 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentMessageIndex 
                    ? accentColor
                    : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: index === currentMessageIndex 
                    ? `0 0 20px ${accentColor}50`
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentMessageIndex) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentMessageIndex) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  }
                }}
                aria-label={`Show message ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

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
