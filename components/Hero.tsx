'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { brand, brandKeyFromHost, brandTokens, BrandTheme } from '@/lib/brand';
import clsx from 'clsx';
import GemHero from './hero/GemHero';

export type HeroVariant = 'prestige' | 'customer' | 'tech';

type HeroSlide = {
  id?: string;
  src?: string;
  alt?: string;
  title?: string;
  sub?: string;
  variant?: 'prestige' | 'customer' | 'tech';
  objectPosition?: string;
};

type HeroProps = {
  garageName: string;
  brandSlug: string;
  theme: BrandTheme;
  hero?: {
    variant?: 'image' | 'gradient';
    images?: HeroSlide[];
  };
  contact?: {
    phone?: string;
  };
};

// Dynamic greeting by time
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
}

// Headline microcopy by variant
function headlineCopy(variant: HeroVariant, garage: string, isFirstSlide: boolean = false) {
  if (isFirstSlide) {
    return `Good ${getGreeting()}, welcome to ${garage}`;
  }
  
  switch (variant) {
    case 'prestige':  return `Book your MOT at ${garage}`;
    case 'customer':  return `Friendly, fair & fast at ${garage}`;
    case 'tech':      return `Dealer-level diagnostics at ${garage}`;
    default:         return `Book your MOT at ${garage}`;
  }
}

function subCopy(variant: HeroVariant) {
  switch (variant) {
    case 'prestige':  return 'Performance servicing & MOTs. Same-day slots available.';
    case 'customer':  return 'Trusted service, clear pricing, local team.';
    case 'tech':      return 'Same-day MOTs. Transparent checklist & free re-test.';
    default:         return 'Performance servicing & MOTs. Same-day slots available.';
  }
}

export default function Hero({ garageName, brandSlug, theme, hero, contact }: HeroProps) {
  // Determine brand
  const brandKey = brandKeyFromHost();
  
  // Use GEM-specific hero for GEM brand
  if (brandKey === 'gem') {
    return <GemHero />;
  }
  
  // Persisted variant index
  const [idx, setIdx] = useState(0);
  const [animated, setAnimated] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  
  const brandTokens = brand[brandKey];
  
  // Use hero.variant and hero.images from props
  const isImageVariant = hero?.variant === 'image';
  const heroImages = hero?.images ?? [];
  const hasImages = isImageVariant && heroImages.length >= 1;
  
  // Defensive: if any slide lacks src, fall back to first available image
  const safeImages = heroImages.filter(img => img && img.src);
  
  // Enforce exactly 4 slides per brand - first slide is gradient canvas
  const slides = [
    // First slide: gradient canvas (no image)
    {
      id: `${brandSlug}-gradient`,
      src: null,
      alt: '',
      variant: 'prestige' as HeroVariant,
      objectPosition: 'center'
    },
    // Subsequent slides: images
    ...(safeImages.length >= 3 ? safeImages.slice(0, 3) : [
      ...safeImages,
      ...Array(3 - safeImages.length).fill(null).map((_, i) => ({
        id: `${brandSlug}-fallback-${i}`,
        src: safeImages[0]?.src || '/hero/prestige.jpg',
        alt: `${garageName} service`,
        variant: 'prestige' as HeroVariant,
        objectPosition: '70% 50%'
      }))
    ])
  ];
  
  // Guard window usage in effects
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const saved = Number(localStorage.getItem('heroVariantIndex') || '0');
    setIdx(Number.isFinite(saved) ? clamp(saved, 0, Math.max(0, slides.length)) : 0);
    
    // Animation effect with reduced motion respect
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setAnimated(true);
      setAutoplay(false);
    } else {
      setTimeout(() => setAnimated(true), 50);
    }
  }, [slides.length]);

  // Autoplay effect
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, slides.length]);

  const currentSlide = slides[clamp(idx, 0, slides.length - 1)];
  const currentVariant: HeroVariant = currentSlide?.variant ?? 'prestige';
  const isFirstSlide = idx === 0;

  // Gradient styles
  const gradientStyle = {
    background: `linear-gradient(135deg, ${brandTokens.gradient.from}, ${brandTokens.gradient.via}, ${brandTokens.gradient.to})`
  };

  const overlayStyle = {
    background: `linear-gradient(90deg, rgba(12,13,16,.72) 0%, rgba(12,13,16,.55) 35%, rgba(12,13,16,0) 60%)`
  };

  // --- Accessibility & keyboard controls for dots ---
  const onDotKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDot(i);
    }
    if (e.key === 'ArrowLeft') handleDot(Math.max(0, (idx || 0) - 1));
    if (e.key === 'ArrowRight') handleDot(Math.min(slides.length - 1, (idx || 0) + 1));
  };

  const handleDot = (i: number) => {
    setIdx(i);
    if (typeof window !== 'undefined') {
      localStorage.setItem('heroVariantIndex', String(i));
    }
  };

  return (
    <section
      className="relative overflow-visible min-h-[56svh] md:min-h-[70svh]"
      aria-label={`${garageName} hero`}
      onMouseEnter={() => setAutoplay(false)}
      onMouseLeave={() => setAutoplay(true)}
      onFocus={() => setAutoplay(false)}
      onBlur={() => setAutoplay(true)}
    >
      {/* Background gradient for depth */}
      <div 
        className="absolute inset-0"
        style={gradientStyle}
      />
      
      {/* Image layer (only for non-first slides) */}
      {!isFirstSlide && currentSlide?.src && (
        <div className="absolute inset-0">
          <Image
            key={currentSlide.id ?? idx}
            src={currentSlide.src}
            alt={currentSlide.alt || `${garageName} ${currentVariant} service`}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-opacity duration-500 ease-out"
            style={{ objectPosition: '70% 50%' }}
            onError={() => {
              // Safety: if an image fails, fallback to first slide
              if (slides.length > 0) {
                if (typeof window !== 'undefined') {
                  localStorage.setItem('heroVariantIndex', '0');
                }
                setIdx(0);
              }
            }}
          />
          {/* Brand gradient overlay L→R for legibility */}
          <div 
            className="absolute inset-0"
            style={overlayStyle}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full w-full">
        <div className="flex w-full flex-col justify-center gap-4 px-5 sm:px-8 md:px-10 pt-16 pb-24 md:pb-28">
          {/* Text left column */}
          <div className="max-w-[720px]">
            {/* Headline */}
            <div
              className={clsx(
                'text-white transition-all duration-500 ease-out',
                animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: animated ? '0ms' : '0ms' }}
            >
              <h1 className="font-semibold leading-tight tracking-tight text-[clamp(32px,6vw,64px)] max-w-[18ch]">
                {headlineCopy(currentVariant, garageName, isFirstSlide)}
              </h1>
            </div>

            {/* Subhead */}
            <p 
              className={clsx(
                'mt-3 text-white/90 text-[clamp(18px,2vw,22px)] max-w-[60ch] transition-all duration-500 ease-out',
                animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: animated ? '120ms' : '0ms' }}
            >
              {subCopy(currentVariant)}
            </p>

            {/* CTAs */}
            <div 
              className={clsx(
                'mt-6 flex flex-wrap gap-3 transition-all duration-500 ease-out',
                animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: animated ? '200ms' : '0ms' }}
            >
              {contact?.phone && (
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white shadow-md hover:brightness-95 focus-visible:outline-2 focus-visible:outline-white/80"
                  style={{ 
                    background: `linear-gradient(135deg, ${brandTokens.gradient.from}, ${brandTokens.gradient.via}, ${brandTokens.gradient.to})`,
                    color: brandTokens.solid.onPrimary
                  }}
                >
                  Call {contact.phone}
                </a>
              )}
              
              <a
                href="#reviews"
                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold bg-white/12 border border-white/20 text-white hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-white/80"
              >
                Read reviews
              </a>
              
              <a
                href={`/partnership?garage=${encodeURIComponent(brandSlug)}`}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold bg-white/12 border border-white/20 text-white hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-white/80"
              >
                Secure partner slot
              </a>
            </div>
          </div>

          {/* Dots pagination - always render 4 */}
          <div className="absolute right-12 bottom-12 flex gap-2" role="tablist" aria-label="Hero slides">
            {Array.from({ length: 4 }, (_, i) => {
              const active = i === idx;
              return (
                <button
                  key={i}
                  role="tab"
                  aria-selected={active}
                  aria-label={`Show slide ${i + 1} of 4`}
                  onClick={() => handleDot(i)}
                  onKeyDown={(e) => onDotKey(e, i)}
                  className={clsx(
                    'h-3 w-3 rounded-full outline-none ring-offset-2 focus:ring-2 focus:ring-white/70 transition-colors',
                    active ? 'bg-white' : 'bg-neutral-400'
                  )}
                  style={{ backgroundColor: active ? brandTokens.dotActive : brandTokens.dotIdle }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}