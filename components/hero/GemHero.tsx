'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';

export type SlideKind = 'gradient' | 'image';
export type Slide = { key: string; kind: SlideKind; src?: string; alt?: string };

type CTA = { label: string; href: string; variant?: 'primary' | 'ghost' };

interface GemHeroProps {
  /** Heading and sub */
  title?: string;
  subtitle?: string;

  /** Phone shown in the primary CTA (falls back to number from href) */
  phoneLabel?: string;
  phoneHref?: string; // e.g. tel:01903999999

  /** Small top line copy */
  partnerText?: string;

  /** Slides (fallback provided) */
  slides?: Slide[];

  /** Controls */
  height?: 'screen' | 'lg' | 'md' | 'sm';
  overlay?: boolean;
  overlayFrom?: 't' | 'tr' | 'r' | 'br' | 'b' | 'bl' | 'l' | 'tl';
  autoplayMs?: number;

  /** Extra CTAs (after phone) */
  extraCtas?: CTA[];
  className?: string;
}

const defaultSlides: Slide[] = [
  { key: 'handover',   kind: 'image', src: '/hero/customer.jpg',  alt: 'Customer handing keys' },
  { key: 'black-car',  kind: 'image', src: '/hero/prestige.jpg',  alt: 'Performance car' },
  { key: 'diagnostic', kind: 'image', src: '/hero/tech.jpg',      alt: 'Diagnostics in workshop' },
];

const dirToClass = (d: NonNullable<GemHeroProps['overlayFrom']>) => {
  switch (d) {
    case 't':  return 'bg-gradient-to-b';
    case 'tr': return 'bg-gradient-to-bl';
    case 'r':  return 'bg-gradient-to-l';
    case 'br': return 'bg-gradient-to-tl';
    case 'b':  return 'bg-gradient-to-t';
    case 'bl': return 'bg-gradient-to-tr';
    case 'l':  return 'bg-gradient-to-r';
    case 'tl': return 'bg-gradient-to-br';
    default:   return 'bg-gradient-to-t';
  }
};

export default function GemHero({
  title = 'Good afternoon, welcome to GEM UK Garage',
  subtitle = 'Performance servicing & MOTs. Same-day slots available.',
  partnerText = 'Partner 10: 10 Partner slots available this month.',
  phoneHref = 'tel:01903999999',
  phoneLabel,
  slides = defaultSlides,
  height = 'screen',
  overlay = true,
  overlayFrom = 'b',
  autoplayMs = 6500,
  extraCtas = [
    { label: 'Read reviews', href: '#reviews', variant: 'ghost' },
    { label: 'Secure partner slot', href: '/partnership', variant: 'ghost' },
  ],
  className,
}: GemHeroProps) {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduced = usePrefersReducedMotion();

  const count = slides.length || 1;
  const safeIndex = (n: number) => (n + count) % count;

  const start = useCallback(() => {
    if (reduced || count <= 1) return;
    stop();
    timer.current = setInterval(() => setIndex((i) => safeIndex(i + 1)), autoplayMs);
  }, [autoplayMs, reduced, count]);

  const stop = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  }, []);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') setIndex((i) => safeIndex(i + 1));
    if (e.key === 'ArrowLeft') setIndex((i) => safeIndex(i - 1));
  };

  const heightClass =
    height === 'screen' ? 'min-h-[calc(100vh-48px)] sm:min-h-[calc(100vh-56px)]'
    : height === 'lg'   ? 'min-h-[80vh]'
    : height === 'md'   ? 'min-h-[60vh]'
                        : 'min-h-[45vh]';

  const phoneText =
    phoneLabel ||
    (phoneHref?.startsWith('tel:') ? `Call ${phoneHref.replace('tel:', '')}` : 'Call us');

  const active = slides[index] ?? slides[0];

  return (
    <section
      data-hero
      className={clsx('full-bleed relative isolate w-full overflow-hidden', heightClass, className)}
      onMouseEnter={stop}
      onMouseLeave={start}
      onKeyDown={onKey}
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Hero slideshow"
    >
      {/* Background layer */}
      <div className="absolute inset-0 -z-10">
        {/* We render only the active slide to avoid stacking dozens of fills */}
        {active?.kind === 'image' ? (
          <Image
            key={active.key}
            src={active.src || '/hero/prestige.jpg'}
            alt={active.alt || 'Garage hero image'}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700" />
        )}

        {overlay && (
          <>
            <div
              className={clsx(
                'absolute inset-0 pointer-events-none',
                dirToClass(overlayFrom),
                'from-black/55 via-black/35 to-black/10 md:from-black/45'
              )}
            />
            <div className="absolute inset-0 bg-black/10 md:bg-black/5 pointer-events-none" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="container-page py-20 md:py-28">
        {partnerText && (
          <p className="text-xs tracking-widest text-amber-300/90">{partnerText}</p>
        )}

        <h1 className="mt-4 text-4xl/tight md:text-6xl/tight font-extrabold text-white">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-base/7 md:text-lg/8 text-white/85 max-w-2xl">
            {subtitle}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {phoneHref && (
            <a href={phoneHref} className="btn-primary-gradient">
              {phoneText}
            </a>
          )}
          {extraCtas.map((c) =>
            c.variant === 'primary' ? (
              <a key={c.href} href={c.href} className="btn-primary-gradient">
                {c.label}
              </a>
            ) : (
              <a key={c.href} href={c.href} className="btn-ghost">
                {c.label}
              </a>
            )
          )}
        </div>

        {/* Dots */}
        {count > 1 && (
          <div className="mt-8 flex gap-2" aria-label="Slide selectors">
            {slides.map((s, idx) => (
              <button
                key={s.key || idx}
                onClick={() => setIndex(idx)}
                className={clsx(
                  'h-2.5 w-2.5 rounded-full border border-white/40 transition',
                  idx === index ? 'bg-white' : 'bg-white/20 hover:bg-white/40'
                )}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={idx === index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------- hooks -------------------- */

function usePrefersReducedMotion() {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handle = () => setPrefers(mq.matches);
    handle();
    mq.addEventListener?.('change', handle);
    return () => mq.removeEventListener?.('change', handle);
  }, []);
  return prefers;
}
