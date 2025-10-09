'use client';
import { brand, brandKeyFromHost } from '@/lib/brand';

export default function CTARail({ garage }:{ garage:any }) {
  const brandKey = brandKeyFromHost();
  const brandTokens = brand[brandKey];
  
  const gradientStyle = {
    background: `linear-gradient(135deg, ${brandTokens.gradient.from}, ${brandTokens.gradient.via}, ${brandTokens.gradient.to})`
  };

  return (
    <section className="py-10 md:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl p-8 md:p-12 text-center" style={gradientStyle}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to book?</h2>
          <p className="text-white/90 mb-6 max-w-[70ch] mx-auto">
            Book your MOT online or call us directly. Same-day slots available.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white shadow-md hover:brightness-95 focus-visible:outline-2 focus-visible:outline-white/80"
              style={{ 
                background: `linear-gradient(135deg, ${brandTokens.gradient.from}, ${brandTokens.gradient.via}, ${brandTokens.gradient.to})`,
                color: brandTokens.solid.onPrimary
              }}
            >
              Book MOT now
            </a>
            {garage.contact?.phone && (
              <a
                href={`tel:${garage.contact.phone.replace(/\s+/g, '')}`}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold border border-white/20 text-white hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-white/80"
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
