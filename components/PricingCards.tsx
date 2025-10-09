'use client';
import { motion } from 'framer-motion';

export function PricingCards({ items, garage }:{ items: Array<{title:string, price:string, note?:string, badge?:string, include?:string[] }>; garage:any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {items.map((p, i) => (
        <motion.div key={i}
          initial={{ y: 12, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.3, delay: i*0.05 }}
          className="rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 flex flex-col"
        >
          {/* Brand top rule */}
          <span
            className="absolute left-5 top-5 h-[3px] w-14 rounded-full"
            style={{ background: 'var(--ts-accent)' }}
          />
          
          {p.badge && <div className="self-start rounded-full text-xs px-2 py-0.5 mb-3" style={{ background: 'var(--ts-surface)', color: '#0f172a' }}>{p.badge}</div>}
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <div className="text-3xl font-bold mt-2">{p.price}</div>
          {p.note && <p className="text-sm text-slate-600 mt-1">{p.note}</p>}
          
          {/* Primary button - solid brand */}
          <button 
            className="mt-4 inline-flex justify-center rounded-lg px-4 py-2 font-medium shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ backgroundColor: 'var(--ts-accent)', color: 'white' }}
          >
            Book now
          </button>
          
          {/* Secondary button - soft outline */}
          <button 
            className="mt-2 inline-flex justify-center rounded-lg px-4 py-2 font-medium border border-white/20 dark:border-neutral-900/15 hover:border-black/20 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ color: 'var(--ts-accent)' }}
          >
            Learn more
          </button>
          
          {p.include?.length ? (
            <details className="mt-3">
              <summary className="text-sm underline cursor-pointer">What's included</summary>
              <ul className="mt-2 space-y-1 text-sm text-slate-600 list-disc pl-5">
                {p.include.map((li,idx)=><li key={idx}>{li}</li>)}
              </ul>
            </details>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
