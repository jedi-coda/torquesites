'use client';

import StickyActions from './StickyActions';

interface StickyActionsClientProps {
  logoPath?: string;
  phoneNumber?: string;
}

export default function StickyActionsClient({
  logoPath,
  phoneNumber
}: StickyActionsClientProps) {
  const handleBookClick = () => {
    const el = document.getElementById("enquiry");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
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
