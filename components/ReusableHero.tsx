'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

type HeroSlide = {
  id: string;
  src?: string;
  alt: string;
  title: string;
  subtitle: string;
  objectPosition?: string;
};

type ReusableHeroProps = {
  slides: HeroSlide[];
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTAs?: Array<{
    text: string;
    href: string;
  }>;
  className?: string;
};

export default function ReusableHero({ 
  slides, 
  primaryCTA, 
  secondaryCTAs = [], 
  className = '' 
}: ReusableHeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isAnimated, setIsAnimated] = useState(false);

  // Initialize animation and check for reduced motion
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setIsAnimated(true);
      setIsAutoplay(false);
    } else {
      setTimeout(() => setIsAnimated(true), 50);
    }
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (!isAutoplay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoplay, slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handleDotKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDotClick(index);
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setCurrentSlide(Math.max(0, currentSlide - 1));
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      setCurrentSlide(Math.min(slides.length - 1, currentSlide + 1));
    }
  };

  const currentSlideData = slides[currentSlide];
  const isFirstSlide = currentSlide === 0;

  return (
    <section
      className={clsx(
        'relative overflow-hidden min-h-[58vh] md:min-h-[64vh] lg:min-h-[68vh] xl:min-h-[72vh]',
        className
      )}
      aria-label="Hero carousel"
      onMouseEnter={() => setIsAutoplay(false)}
      onMouseLeave={() => setIsAutoplay(true)}
      onFocus={() => setIsAutoplay(false)}
      onBlur={() => setIsAutoplay(true)}
    >
      {/* Background - gradient for first slide, image for others */}
      <div className="absolute inset-0">
        {isFirstSlide ? (
          // First slide: black gradient
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, var(--brand-from, #0b0b0b) 0%, var(--brand-to, #1a1a1a) 100%)'
            }}
          />
        ) : (
          // Other slides: image with gradient overlay
          <div className="relative">
            <Image
              src={currentSlideData.src!}
              alt={currentSlideData.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-opacity duration-500 ease-out"
              style={{ objectPosition: currentSlideData.objectPosition || 'center' }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full w-full">
        <div className="flex w-full flex-col justify-center gap-4 px-5 sm:px-8 md:px-10 pt-16">
          {/* Text content */}
          <div className="max-w-[720px]">
            {/* Headline */}
            <div
              className={clsx(
                'text-white transition-all duration-500 ease-out',
                isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
            >
              <h1 className="font-semibold text-[clamp(28px,5.5vw,56px)] leading-[1.05] max-w-[18ch]">
                {currentSlideData.title}
              </h1>
            </div>

            {/* Subtitle */}
            <p 
              className={clsx(
                'mt-3 text-white text-[clamp(14px,1.7vw,18px)] opacity-90 max-w-[60ch] transition-all duration-500 ease-out',
                isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: isAnimated ? '120ms' : '0ms' }}
            >
              {currentSlideData.subtitle}
            </p>

            {/* CTAs */}
            <div 
              className={clsx(
                'mt-6 flex flex-wrap gap-3 transition-all duration-500 ease-out',
                isAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: isAnimated ? '200ms' : '0ms' }}
            >
              {/* Primary CTA */}
              <a
                href={primaryCTA.href}
                className="btn-primary"
              >
                {primaryCTA.text}
              </a>
              
              {/* Secondary CTAs */}
              {secondaryCTAs.map((cta, index) => (
                <a
                  key={index}
                  href={cta.href}
                  className="btn-ghost"
                >
                  {cta.text}
                </a>
              ))}
            </div>
          </div>

          {/* Dots pagination */}
          <div className="absolute right-12 bottom-12 flex gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((_, index) => {
              const isActive = index === currentSlide;
              return (
                <button
                  key={index}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show slide ${index + 1} of ${slides.length}`}
                  onClick={() => handleDotClick(index)}
                  onKeyDown={(e) => handleDotKeyDown(e, index)}
                  className={clsx(
                    'dot outline-none ring-offset-2 focus:ring-2 focus:ring-white/70',
                    isActive ? 'dot--active' : 'dot--idle'
                  )}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
