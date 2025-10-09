'use client';
import { useEffect, useRef, useState } from 'react';

export default function ReviewsCarousel({ reviews, garage }:{ reviews: Array<{quote:string, author:string}>, garage:any }) {
  const ref = useRef<HTMLDivElement>(null);
  const [autoplay, setAutoplay] = useState(true);

  // Auto scroll with reduced motion respect
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setAutoplay(false);
      return;
    }
    
    let id:number|undefined;
    const tick = () => {
      if (!autoplay) return;
      el.scrollBy({ left: 1, behavior: 'smooth' });
      id = window.setTimeout(tick, 35);
    };
    id = window.setTimeout(tick, 1500);
    const stop = () => { if (id) window.clearTimeout(id); };
    el.addEventListener('mouseenter', stop);
    el.addEventListener('mouseleave', tick);
    return () => { stop(); el.removeEventListener('mouseenter', stop); el.removeEventListener('mouseleave', tick); };
  }, [autoplay]);

  // Limit to max 3 quotes
  const displayReviews = reviews.slice(0, 3);

  return (
    <section role="region" aria-label="Customer testimonials" className="bg-[#0C0D10] text-white">
      <div className="rounded-2xl p-4 md:p-5">
        <div ref={ref} className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory">
          {displayReviews.map((r, i) => (
            <figure key={i} className="snap-start min-w-[320px] md:min-w-[420px] rounded-xl border border-white/10 bg-black/20 p-4">
              <blockquote className="text-white/90 italic">"{r.quote}"</blockquote>
              <figcaption className="mt-3 text-white/70 text-sm">— {r.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
