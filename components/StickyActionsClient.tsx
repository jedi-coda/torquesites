'use client';

import StickyActions from './StickyActions';
import { type StripeLinks } from '@/lib/garage';

interface StickyActionsClientProps {
  logoPath?: string;
  phoneNumber?: string;
  stripeLinks?: StripeLinks;
}

export default function StickyActionsClient({
  logoPath,
  phoneNumber,
  stripeLinks
}: StickyActionsClientProps) {
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
