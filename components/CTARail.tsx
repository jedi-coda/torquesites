'use client';
import { brand, brandKeyFromHost } from '@/lib/brand';

export default function CTARail({ garage }:{ garage:any }) {
  const brandKey = brandKeyFromHost();
  const brandTokens = brand[brandKey];
  
  // For GEM, use dark surface instead of gradient
  const isGem = garage.slug === 'gem';
  
  const gradientStyle = isGem ? {} : {
    background: `linear-gradient(135deg, ${brandTokens.gradient.from}, ${brandTokens.gradient.via}, ${brandTokens.gradient.to})`
  };

  return (
    <section className="px-fluid py-12 md:py-16">
      <div className="container-page">
        <div 
          className={`rounded-2xl p-8 md:p-12 text-center ${isGem ? 'bg-[--surface] text-[--text] ring-1 ring-black/10 shadow-lg overflow-hidden relative' : ''}`}
          style={gradientStyle}
        >
          {isGem && (
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/40 to-black pointer-events-none" />
          )}
          <h2 className="h2-title font-bold text-white mb-4">Ready to book?</h2>
          <p className="p-base text-white/90 mb-6 max-w-[70ch] mx-auto">
            Book your MOT online or call us directly. Same-day slots available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#booking"
              className={isGem ? "btn-primary" : "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white shadow-md hover:brightness-95 focus-visible:outline-2 focus-visible:outline-white/80"}
              style={isGem ? {} : { 
                background: `linear-gradient(135deg, ${brandTokens.gradient.from}, ${brandTokens.gradient.via}, ${brandTokens.gradient.to})`,
                color: brandTokens.solid.onPrimary
              }}
            >
              Book MOT now
            </a>
            {garage.contact?.phone && (
              <a
                href={`tel:${garage.contact.phone.replace(/\s+/g, '')}`}
                className={isGem ? "btn-ghost" : "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold border border-white/20 text-white hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-white/80"}
              >
                Call {garage.contact.phone}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
