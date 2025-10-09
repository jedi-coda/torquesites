'use client';
import { useEffect, useRef } from 'react';

export default function ReviewsCarousel({ reviews, garage }:{ reviews: Array<{quote:string, author:string}>, garage:any }) {
  const ref = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let id:number|undefined;
    const tick = () => {
      el.scrollBy({ left: 1, behavior: 'smooth' });
      id = window.setTimeout(tick, 35);
    };
    id = window.setTimeout(tick, 1500);
    const stop = () => { if (id) window.clearTimeout(id); };
    el.addEventListener('mouseenter', stop);
    el.addEventListener('mouseleave', tick);
    return () => { stop(); el.removeEventListener('mouseenter', stop); el.removeEventListener('mouseleave', tick); };
  }, []);

  // Limit to max 2 items on desktop, 1 on mobile
  const displayReviews = reviews.slice(0, 2);

  return (
    <div className="rounded-2xl p-4 md:p-5 bg-neutral-900 border border-white/10">
      <div ref={ref} className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory">
        {displayReviews.map((r, i) => (
          <figure key={i} className="snap-start min-w-[320px] md:min-w-[420px] rounded-xl border border-white/10 bg-black/20 p-4">
            <blockquote className="text-white/90 italic">"{r.quote}"</blockquote>
            <figcaption className="mt-3 text-white/70 text-sm">— {r.author}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
