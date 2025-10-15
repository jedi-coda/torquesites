import React from 'react';
import { Phone } from 'lucide-react';

interface StickyActionBarProps {
  logoPath?: string;
  phoneNumber?: string;
  onBook?: () => void;
  onCall?: () => void;
  onPartnerSlot?: () => void;
}

export default function StickyActionBar({
  logoPath = "/logos/newtown-logo.png",
  phoneNumber = "01494 772277",
  onBook,
  onCall,
  onPartnerSlot
}: StickyActionBarProps) {
  const handleBookClick = () => {
    if (onBook) {
      onBook();
    } else {
      // Default behavior - scroll to enquiry form
      const el = document.getElementById("enquiry");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCallClick = () => {
    if (onCall) {
      onCall();
    } else {
      // Default behavior - open phone dialer
      window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`;
    }
  };

  const handlePartnerSlotClick = () => {
    if (onPartnerSlot) {
      onPartnerSlot();
    } else {
      // Default behavior - open partnership page
      window.open("https://www.torquesites.co.uk/partnership", "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/20 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Invisible spacer for perfect centering */}
          <div className="w-20 sm:w-24 flex-shrink-0" aria-hidden="true"></div>
          
          {/* Centered Button Group */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-1">
            
            {/* Book MOT Button - Primary CTA */}
            <button 
              onClick={handleBookClick}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white dark:text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50 active:scale-95 whitespace-nowrap"
            >
              <span className="relative z-10">Book MOT</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>

            {/* Call Button - Secondary CTA */}
            <button 
              onClick={handleCallClick}
              className="group bg-gray-800 dark:bg-gray-800 bg-gray-200 hover:bg-gray-700 dark:hover:bg-gray-700 hover:bg-gray-300 text-white dark:text-white text-gray-800 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 flex items-center gap-2 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">{phoneNumber}</span>
              <span className="sm:hidden">Call Us</span>
            </button>

            {/* Partner Slot Button - Tertiary CTA with Electric Pink */}
            <button 
              onClick={handlePartnerSlotClick}
              className="group bg-transparent hover:bg-[#ff007f] text-pink-100 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base transition-all duration-200 hover:scale-105 hover:shadow-[0_0_15px_#ff007f80] active:scale-95 whitespace-nowrap border border-[#ff007f] hover:border-[#ff007f]"
            >
              <span className="hidden sm:inline">Secure Partner Slot</span>
              <span className="sm:hidden">Partner Slot</span>
            </button>
          </div>

          {/* Logo - Right Corner */}
          <div className="w-20 sm:w-24 flex items-center justify-end flex-shrink-0">
            <img 
              src={logoPath}
              alt="Newtown Garage logo"
              className="w-20 sm:w-24 h-auto opacity-90 hover:opacity-100 transition-opacity duration-200 filter brightness-110 contrast-125 dark:brightness-125"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement as HTMLElement;
                if (parent) {
                  parent.innerHTML = '<div class="w-20 sm:w-24 h-16 bg-gray-800 dark:bg-gray-800 bg-gray-200 rounded-lg flex items-center justify-center text-white dark:text-white text-gray-800 text-xs font-bold">LOGO</div>';
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


