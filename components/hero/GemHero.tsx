'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

// Brand tokens now come from CSS variables

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
    timer.current = setInterval(() => setActive((i) => (i + 1) % slides.length), 5500);
    return () => timer.current && clearInterval(timer.current);
  }, [reduced]);

  return (
    <section
      className="relative isolate overflow-hidden"
      onMouseEnter={() => {
        if (timer.current) {
          clearInterval(timer.current);
          timer.current = null;
        }
      }}
      onMouseLeave={() => {
        if (!reduced) {
          timer.current = setInterval(() => setActive((i) => (i + 1) % slides.length), 5500);
        }
      }}
    >
      <div className="relative grid min-h-[68svh] md:min-h-[76svh] place-items-center">
        {/* media layer */}
        <div className="absolute inset-0">
          {slides.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.id}
                className={clsx(
                  'absolute inset-0 transition-opacity duration-700 ease-out',
                  isActive ? 'opacity-100' : 'opacity-0'
                )}
              >
                {s.kind === 'greeting' ? (
                  <div
                    className="h-full w-full bg-[radial-gradient(120%_120%_at_0%_0%,var(--brand-from),var(--brand-to))]"
                  />
                ) : (
                  <>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      priority={i === 0}
                      className="object-cover"
                      style={{ objectPosition: '70% 50%' }}
                    />
                    {/* darkening overlay with gold/black tint */}
                    <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_0%_0%,rgba(11,11,11,.6),rgba(26,26,26,.9))]" />
                  </>
                )}
              </div>
            );
          })}
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
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-4 text-base font-semibold text-black shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-gradient-to-r from-[var(--cta-from)] to-[var(--cta-to)]"
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
              className={clsx(
                'h-2.5 w-2.5 rounded-full focus:outline-none focus:ring-2 focus:ring-white/70',
                i === active ? 'bg-[var(--dot-active)]' : 'bg-[var(--dot-inactive)]'
              )}
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
