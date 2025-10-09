'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

const brand = {
  solid: { fg: '#111213', on: '#FFFFFF' },
  gold:  '#D4AF37',
  gold2: '#B8891E',
  dotIdle: 'rgba(255,255,255,.45)',
  dotActive: '#D4AF37',
  overlay:
    'linear-gradient(90deg, rgba(17,18,19,.78) 0%, rgba(17,18,19,.62) 40%, rgba(17,18,19,.38) 100%)',
};

type Slide =
  | { id: 0; kind: 'greeting' }
  | { id: 1 | 2 | 3; kind: 'photo'; src: string; alt: string };

const slides: Slide[] = [
  { id: 0, kind: 'greeting' },
  { id: 1, kind: 'photo', src: '/hero/keys.jpg', alt: 'Customer handing keys' },
  { id: 2, kind: 'photo', src: '/hero/car-black.jpg', alt: 'Black coupe side profile' },
  { id: 3, kind: 'photo', src: '/hero/diagnostics.jpg', alt: 'Diagnostics in bay' },
];

export default function GemHero() {
  const [active, setActive] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) return;
    timer.current && clearInterval(timer.current);
    timer.current = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => timer.current && clearInterval(timer.current);
  }, [reduced]);

  return (
    <section
      className="relative isolate overflow-hidden"
      style={{ '--dotIdle': brand.dotIdle, '--dotActive': brand.dotActive } as React.CSSProperties}
      onMouseEnter={() => {
        if (timer.current) {
          clearInterval(timer.current);
          timer.current = null;
        }
      }}
      onMouseLeave={() => {
        if (!reduced) {
          timer.current = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
        }
      }}
    >
      <div className="relative grid min-h-[68svh] md:min-h-[76svh] place-items-center">
        {/* media layer */}
        <div className="absolute inset-0">
          {slides.map((s, i) => (
            <div
              key={s.id}
              className={clsx(
                'absolute inset-0 transition-opacity duration-700 ease-in-out',
                i === active ? 'opacity-100' : 'opacity-0'
              )}
            >
              {s.kind === 'greeting' ? (
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      `linear-gradient(135deg, ${brand.solid.fg} 0%, ${brand.gold2} 100%)`,
                  }}
                />
              ) : (
                <>
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={i === 0}
                    className={clsx(
                      'object-cover will-change-transform',
                      i === active ? 'scale-100' : 'scale-[1.02]',
                      'transition-transform duration-[700ms] ease-in-out'
                    )}
                    style={{ objectPosition: '70% 50%' }}
                  />
                  {/* darkening overlay with subtle gold bias */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: brand.overlay,
                    }}
                  />
                </>
              )}
            </div>
          ))}
        </div>

        {/* content layer */}
        <div className="relative z-10 w-full">
          <div className="mx-auto max-w-screen-xl px-6 py-16 md:py-24">
            <div className="max-w-[68ch] text-white [text-wrap:balance]">
              <h1 className="font-extrabold leading-[1.05] tracking-tight"
                  style={{ fontSize: 'clamp(36px,6vw,64px)' }}>
                {active === 0
                  ? greetingCopy()
                  : heroHeadlineFor(active)}
              </h1>
              <p className="mt-5 opacity-90"
                 style={{ fontSize: 'clamp(18px,2.2vw,24px)' }}>
                Performance servicing & MOTs. Same-day slots available.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="tel:01903999999"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-4 text-base font-semibold text-black shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    background: `linear-gradient(90deg, ${brand.gold} 0%, ${brand.gold2} 100%)`,
                    color: '#111213',
                  }}
                >
                  Call 01903 999999
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 py-4 text-base font-semibold text-white backdrop-blur-[0px] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  href="#reviews"
                >
                  Read reviews
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-6 py-4 text-base font-semibold text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  href="#partner"
                >
                  Secure partner slot
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* dots */}
        <div className="pointer-events-auto absolute bottom-6 right-6 flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Show slide ${i + 1} of ${slides.length}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className="h-2.5 w-2.5 rounded-full"
              style={{
                background: i === active ? 'var(--dotActive)' : 'var(--dotIdle)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function greetingCopy() {
  const h = new Date().getHours();
  const t = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  return `${t}, welcome to GEM UK Garage`;
}
function heroHeadlineFor(i: number) {
  if (i === 1) return 'Friendly, fair & fast at GEM UK Garage';
  if (i === 2) return 'Book your MOT at GEM UK Garage';
  return 'Dealer-level diagnostics at GEM UK Garage';
}
