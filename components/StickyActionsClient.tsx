'use client';

import StickyActions from './StickyActions';
import { type StripeLinks } from '@/lib/garage';
import Image from 'next/image';

interface StickyActionsClientProps {
  logoPath?: string;
  phoneNumber?: string;
  stripeLinks?: StripeLinks;
  tier?: string;
}

export default function StickyActionsClient({
  logoPath,
  phoneNumber,
  stripeLinks,
  tier
}: StickyActionsClientProps) {
  // For Supercharged template, use custom layout
  if (tier === 'supercharged') {
    const handleBookClick = () => {
      if (stripeLinks?.mot) {
        window.open(stripeLinks.mot, '_blank', 'noopener,noreferrer');
      }
    };

    const handleCallClick = () => {
      window.location.href = `tel:${phoneNumber?.replace(/\s/g, '')}`;
    };

    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/20 shadow-2xl z-50" style={{ marginBottom: 'env(safe-area-inset-bottom)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Invisible spacer for perfect centering */}
            <div className="w-20 sm:w-24 flex-shrink-0" aria-hidden="true"></div>
            
            {/* Centered Button Group */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-1">
              
              {/* Book MOT Button - Primary CTA (Blue) */}
              <button 
                onClick={handleBookClick}
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 whitespace-nowrap"
              >
                <span className="relative z-10">Book MOT</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </button>

              {/* Phone Button - Secondary CTA (Dark Gray) */}
              <button 
                onClick={handleCallClick}
                className="group bg-gray-800 hover:bg-gray-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 flex items-center gap-2 whitespace-nowrap"
              >
                <span>📞</span>
                <span>{phoneNumber || 'Call'}</span>
              </button>
            </div>

            {/* Logo - Right Corner */}
            <div className="w-20 sm:w-24 flex items-center justify-end flex-shrink-0">
              <Image 
                src={logoPath || '/logos/newtown-logo.png'}
                alt={`${logoPath?.includes('gem') ? 'GEM UK Garage' : logoPath?.includes('swift') ? 'Swift Motors' : 'Garage'} logo`}
                width={96}
                height={64}
                className="w-20 sm:w-24 h-auto opacity-90 hover:opacity-100 transition-opacity duration-200 filter brightness-110 contrast-125"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // For other templates (Turbo, Hyper), use original StickyActions component
  const handleBookClick = () => {
    const el = document.getElementById("booking-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCallClick = () => {
    window.location.href = `tel:${phoneNumber?.replace(/\s/g, '')}`;
  };

  const handlePartnerSlotClick = () => {
    window.open("https://www.torquesites.co.uk/partnership", "_blank", "noopener,noreferrer");
  };

  return (
    <StickyActions
      logoPath={logoPath}
      phoneNumber={phoneNumber}
      onBook={handleBookClick}
      onCall={handleCallClick}
      onPartnerSlot={handlePartnerSlotClick}
    />
  );
}
