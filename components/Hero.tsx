'use client';

import React from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export type HeroVariant = 'customer' | 'tech' | 'prestige';

interface HeroProps {
  title?: string;
  subtitle?: string;
  variant?: HeroVariant;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryText?: string;
  secondaryLink?: string;
  overlay?: boolean;

  /** New, optional controls */
  height?: 'screen' | 'lg' | 'md' | 'sm';     // visual height presets
  objectPosition?: string;                    // e.g. "center", "50% 40%", "top"
  overlayFrom?: 't' | 'tr' | 'r' | 'br' | 'b' | 'bl' | 'l' | 'tl'; // gradient direction
  overlayStrength?: number;                   // 0..1 for start stop opacity
  priority?: boolean;                         // pass true on above-the-fold pages
  className?: string;                         // extra classes from parent
}

const overlayClassFrom = (dir: Required<HeroProps>['overlayFrom']) => {
  switch (dir) {
    case 't': return 'from-black/70 via-black/50 to-black/20';
    case 'tr': return 'from-black/70 via-black/50 to-black/20';
    case 'r': return 'from-black/70 via-black/50 to-black/20';
    case 'br': return 'from-black/70 via-black/50 to-black/20';
    case 'b': return 'from-black/70 via-black/50 to-black/20';
    case 'bl': return 'from-black/70 via-black/50 to-black/20';
    case 'l': return 'from-black/70 via-black/50 to-black/20';
    case 'tl': return 'from-black/70 via-black/50 to-black/20';
    default: return 'from-black/70 via-black/50 to-black/20';
  }
};

export default function Hero({
  title = 'Premium MOT Testing in Chesham',
  subtitle = 'Book online 24/7 with qualified technicians and quality service guaranteed',
  variant = 'customer',
  imageUrl,
  ctaText = 'Book Now',
  ctaLink = '#booking',
  secondaryText = 'View Services',
  secondaryLink = '#services',
  overlay = true,

  height = 'screen',
  objectPosition = 'center',
  overlayFrom = 'b',
  overlayStrength = 1, // scales the default gradient
  priority = true,
  className,
}: HeroProps) {
  const finalImageUrl = imageUrl || `/hero/${variant}.jpg`;

  const heightClass =
    height === 'screen'
      ? 'min-h-[calc(100vh-48px)] sm:min-h-[calc(100vh-56px)]'
      : height === 'lg'
      ? 'min-h-[80vh]'
      : height === 'md'
      ? 'min-h-[60vh]'
      : 'min-h-[45vh]';

  // Strength scaling: we apply via inline opacity variable used in extra overlay veil
  const veilOpacity = Math.max(0, Math.min(1, overlayStrength));

  return (
    <section
      className={clsx(
        'relative w-full overflow-hidden flex items-center justify-center',
        heightClass,
        className
      )}
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={finalImageUrl}
          alt={`${variant} hero image`}
          fill
          sizes="100vw"
          priority={priority}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>

      {/* Gradient Overlay */}
      {overlay && (
        <>
          <div
            className={clsx(
              'absolute inset-0 -z-0 bg-gradient-to-b',
              // direction (we keep it simple but flexible with a single util)
              overlayFrom === 't' && 'bg-gradient-to-b',
              overlayFrom === 'tr' && 'bg-gradient-to-bl',
              overlayFrom === 'r' && 'bg-gradient-to-l',
              overlayFrom === 'br' && 'bg-gradient-to-tl',
              overlayFrom === 'b' && 'bg-gradient-to-t',
              overlayFrom === 'bl' && 'bg-gradient-to-tr',
              overlayFrom === 'l' && 'bg-gradient-to-r',
              overlayFrom === 'tl' && 'bg-gradient-to-br',
              overlayClassFrom(overlayFrom)
            )}
            style={{ opacity: veilOpacity }}
          />
          {/* Very subtle global veil to aid text legibility */}
          <div className="absolute inset-0 -z-0 bg-black/20 md:bg-black/10 pointer-events-none" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-5xl mx-auto">
          <h1
            className="text-white font-extrabold tracking-tight mb-4"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 4.25rem)',
              lineHeight: 1.1,
              textShadow: '2px 2px 4px rgba(0,0,0,0.55)',
            }}
          >
            {title}
          </h1>

          <p
            className="text-white/90 text-base sm:text-lg lg:text-2xl mb-8 mx-auto max-w-3xl"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)', lineHeight: 1.45 }}
          >
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!!ctaText && !!ctaLink && (
              <a
                href={ctaLink}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md hover:shadow-lg transition"
              >
                {ctaText}
              </a>
            )}
            {!!secondaryText && !!secondaryLink && (
              <a
                href={secondaryLink}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-white/25 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-semibold transition"
              >
                {secondaryText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
