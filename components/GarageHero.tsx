"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { type Garage } from "@/lib/garage";
import { getSafeGarage, getSafeHeroVariants, getSafeTheme, premiumTheme } from "@/lib/fallbackGarage";

// 🛠️ GarageHero component with shared fallback logic for production scale
// ✅ Uses shared fallbackGarage for consistent defaults
// ✅ Handles null/undefined garage prop gracefully
// ✅ Uses garage.hero.variants for dynamic content
// ✅ Falls back to default content when garage data is missing
// ✅ Supports dynamic greeting and image rotation
// ✅ Ready for 1000+ dynamic garage microsites

export default function GarageHero({ garage }: { garage?: Garage | null }) {
  const safeGarage = getSafeGarage(garage);
  const variants = getSafeHeroVariants(garage);
  const theme = getSafeTheme(garage);
  const heroConfig = safeGarage.hero || { greeting: true, background: "gradient" };

  const [currentVariant, setCurrentVariant] = useState(0);
  const [greeting, setGreeting] = useState("Good morning");

  // Dynamic greeting based on time of day (only if enabled)
  useEffect(() => {
    if (!heroConfig.greeting) return;
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, [heroConfig.greeting]);

  // Auto-rotate through variants every 8 seconds
  useEffect(() => {
    if (variants.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentVariant((prev) => (prev + 1) % variants.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [variants.length]);

  const currentVariantData = variants[currentVariant] || variants[0];
  const isSolidBackground = currentVariantData.type === "solid";
  const backgroundStyle = isSolidBackground 
    ? { 
        background: `linear-gradient(135deg, ${theme.primary || premiumTheme.brandColor} 0%, ${theme.secondary || "#333333"} 100%)`
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
        
        {/* Premium accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-yellow-500/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-white text-center p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <div 
            className="inline-block px-4 py-2 border rounded-full mb-4"
            style={{ 
              backgroundColor: `${theme.accent || premiumTheme.accentColor}20`,
              borderColor: `${theme.accent || premiumTheme.accentColor}30`
            }}
          >
            <span 
              className="text-sm font-medium tracking-wide"
              style={{ color: theme.accent || premiumTheme.accentColor }}
            >
              DVSA APPROVED
            </span>
          </div>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
          <span style={{ color: theme.accent || premiumTheme.accentColor }}>
            {heroConfig.greeting ? `${greeting}, ` : ""}
          </span>
          {currentVariantData.headline || `Welcome to ${safeGarage.name}`}
        </h1>
        
        <p className="text-xl md:text-2xl max-w-3xl mb-8 text-gray-200 leading-relaxed">
          {currentVariantData.sub || safeGarage.tagline || "Expert MOT testing and vehicle care for all makes and models in Chesham"}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button 
            className="px-8 py-4 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            style={{ backgroundColor: theme.accent || premiumTheme.accentColor }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = theme.primary || premiumTheme.brandColor;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = theme.accent || premiumTheme.accentColor;
            }}
          >
            Book Your MOT
          </button>
          <button 
            className="px-8 py-4 border-2 font-semibold rounded-lg transition-all duration-300"
            style={{ 
              borderColor: theme.accent || premiumTheme.accentColor,
              color: theme.accent || premiumTheme.accentColor
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${theme.accent || premiumTheme.accentColor}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            Call to Book
          </button>
        </div>
        
        {/* Premium variant indicators */}
        {variants.length > 1 && (
          <div className="absolute bottom-8 flex gap-3">
            {variants.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentVariant(index)}
                className="w-4 h-4 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: index === currentVariant 
                    ? theme.accent || premiumTheme.accentColor
                    : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: index === currentVariant 
                    ? `0 0 20px ${theme.accent || premiumTheme.accentColor}50`
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentVariant) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentVariant) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  }
                }}
                aria-label={`Show ${variants[index]?.label || 'slide'} ${index + 1}`}
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
    </div>
  );
}
