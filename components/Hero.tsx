'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { brandGradient, brandGradients, BrandTheme, brandKeyFromHost, heroOverlay } from '@/lib/brand';
import clsx from 'clsx';

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

// Default copy for fallback
const defaultTitle = 'Book your MOT today';
const defaultSub = 'Trusted experts in MOTs, servicing & full vehicle care.';

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
  // Persisted variant index
  const [idx, setIdx] = useState(0);
  const [animated, setAnimated] = useState(false);
  
  // Use hero.variant and hero.images from props
  const isImageVariant = hero?.variant === 'image';
  const heroImages = hero?.images ?? [];
  const hasImages = isImageVariant && heroImages.length >= 1;
  
  // Defensive: if any slide lacks src, fall back to first available image
  const safeImages = heroImages.filter(img => img && img.src);
  
  // Enforce exactly 4 slides per brand
  const slides = safeImages.length >= 4 ? safeImages.slice(0, 4) : [
    ...safeImages,
    ...Array(4 - safeImages.length).fill(null).map((_, i) => ({
      id: `${brandSlug}-fallback-${i}`,
      src: safeImages[0]?.src || '/hero/prestige.jpg',
      alt: `${garageName} service`,
      variant: 'prestige' as HeroVariant,
      objectPosition: '65% center'
    }))
  ];
  
  if (safeImages.length === 0 && heroImages.length > 0) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Hero] All slides missing src for ${brandSlug}, falling back to gradient`);
    }
  }
  
  // If no slides with images, render gradient-only fallback
  if (!hasImages || slides.length === 0) {
    return (
      <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh]">
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary ?? theme.primary})`
          }}
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-24">
          <h1 className="text-white text-5xl font-extrabold leading-tight">
            {defaultTitle}
          </h1>
          <p className="mt-4 text-white/80 text-xl">{defaultSub}</p>
        </div>
      </section>
    );
  }
  
  // Guard window usage in effects
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const saved = Number(localStorage.getItem('heroVariantIndex') || '0');
    setIdx(Number.isFinite(saved) ? clamp(saved, 0, Math.max(0, slides.length)) : 0);
    
    // Animation effect with reduced motion respect
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setAnimated(true);
    } else {
      setTimeout(() => setAnimated(true), 50);
    }
  }, [slides.length]);

  const currentSlide = slides[clamp(idx, 0, slides.length - 1)];
  const currentVariant: HeroVariant = currentSlide?.variant ?? 'prestige';
  const isFirstSlide = idx === 0;

  const gradient = brandGradient(theme);
  const brandKey = brandKeyFromHost();
  const overlayGradient = heroOverlay(brandKey);

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
    >
      {/* Background gradient for depth */}
      <div 
        className="absolute inset-0"
        style={gradient.cssVars}
      />
      
      {/* Image layer */}
      {currentSlide?.src && (
        <div className="absolute inset-0">
          <Image
            key={currentSlide.id ?? idx}
            src={currentSlide.src}
            alt={currentSlide.alt || `${garageName} ${currentVariant} service`}
            fill
            priority
            sizes="100vw"
            className="object-cover transition-opacity duration-500 ease-out"
            style={{ objectPosition: '65% center' }}
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
            style={{ background: overlayGradient }}
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
              <h1 className="font-extrabold leading-tight text-balance break-keep text-[clamp(34px,5.5vw,56px)] max-w-[18ch]">
                {headlineCopy(currentVariant, garageName, isFirstSlide)}
              </h1>
            </div>

            {/* Subhead */}
            <p 
              className={clsx(
                'mt-3 text-white/90 text-[clamp(16px,2.1vw,20px)] max-w-[720px] transition-all duration-500 ease-out',
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
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold text-white shadow-md"
                  style={{ backgroundColor: theme.primary }}
                >
                  Call {contact.phone}
                </a>
              )}
              
              <a
                href="#reviews"
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold bg-white/10 text-white border border-white/30 backdrop-blur"
              >
                Read reviews
              </a>
              
              <a
                href={`/partnership?garage=${encodeURIComponent(brandSlug)}`}
                className="inline-flex items-center justify-center rounded-lg px-6 py-3 font-semibold bg-white text-neutral-900 border border-neutral-200"
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
                  aria-label={`Show slide ${i + 1} of ${slides.length}`}
                  onClick={() => handleDot(i)}
                  onKeyDown={(e) => onDotKey(e, i)}
                  className={clsx(
                    'h-3 w-3 rounded-full outline-none ring-offset-2 focus:ring-2 focus:ring-white/70 transition-colors',
                    active ? 'bg-white' : 'bg-neutral-400'
                  )}
                  style={{ backgroundColor: active ? theme.primary : undefined }}
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