'use client';
import { brand, brandKeyFromHost } from '@/lib/brand';

export function PricingCards({ items, garage }:{ items: Array<{title:string, price:string, note?:string, badge?:string, include?:string[] }>; garage:any }) {
  const brandKey = brandKeyFromHost();
  const brandTokens = brand[brandKey];
  
  const gradient = `bg-[linear-gradient(135deg,${brandTokens.gradient.from},${brandTokens.gradient.via},${brandTokens.gradient.to})]`;
  const btnPrimary = `${gradient} text-${brandTokens.solid.onPrimary} rounded-full px-5 py-3 shadow-md hover:brightness-95 focus-visible:outline-2 focus-visible:outline-white/80`;
  const btnSecondary = `bg-white/12 border border-white/20 text-white rounded-full px-5 py-3 hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-white/80`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {items.map((p, i) => (
        <div key={i}
          className="rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 flex flex-col"
        >
          {/* Brand top rule */}
          <span
            className="absolute left-5 top-5 h-[3px] w-14 rounded-full"
            style={{ background: brandTokens.solid.primary }}
          />
          
          {p.badge && <div className="self-start rounded-full text-xs px-2 py-0.5 mb-3" style={{ background: brandTokens.solid.surface, color: brandTokens.solid.onSurface }}>{p.badge}</div>}
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <div className="text-3xl font-bold mt-2">{p.price}</div>
          {p.note && <p className="text-sm text-slate-600 mt-1">{p.note}</p>}
          
          {/* Primary button - gradient */}
          <button className={garage.slug === 'gem' ? "btn btn--primary mt-4" : `mt-4 inline-flex justify-center ${btnPrimary}`}>
            Book now
          </button>
          
          {/* Secondary button - soft outline */}
          <button className={garage.slug === 'gem' ? "btn btn--ghost-dark mt-2" : `mt-2 inline-flex justify-center ${btnSecondary}`}>
            Learn more
          </button>
          
          {p.include?.length ? (
            <details className="mt-3">
              <summary className="text-sm underline cursor-pointer">What&apos;s included</summary>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc pl-5">
                {p.include.map((li,idx)=><li key={idx}>{li}</li>)}
              </ul>
            </details>
          ) : null}
        </div>
      ))}
    </div>
  );
}
