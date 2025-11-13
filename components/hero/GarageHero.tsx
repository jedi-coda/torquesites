'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import { type Garage } from '@/lib/garage';

type GarageHeroProps = {
  garage: Garage | null | undefined;
  tier: 'supercharged' | 'turbo' | 'hyper';
  variant?: 'customer' | 'tech' | 'prestige';
};

export default function GarageHero({ garage, tier, variant = 'customer' }: GarageHeroProps) {
  if (!garage) return null;

  const [imageSrc, setImageSrc] = useState(`/images/hero/${variant}.webp`);

  const brandPrimary = garage?.brand?.primary || '#FF6B00';
  const isLimeGreen = brandPrimary === '#C4FF00';

  // Get glow gradient based on brand color
  const getGlowGradient = () => {
    if (isLimeGreen) {
      return 'radial-gradient(circle at center, rgba(196, 255, 0, 0.2) 0%, transparent 70%)';
    }
    // Default to orange glow
    return 'radial-gradient(circle at center, rgba(255, 107, 0, 0.2) 0%, transparent 70%)';
  };

  const timeGreeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }, []);

  const subtitle = garage?.tagline || {
    customer: 'Premium prestige service',
    tech: 'Cutting-edge diagnostics & tools',
    prestige: 'Trusted by performance car owners',
  }[variant];

  return (
    <section className="relative w-full overflow-hidden rounded-2xl mx-auto max-w-7xl md:h-[420px] h-[320px]">
      {/* Image */}
      <Image
        src={imageSrc}
        alt={`${garage?.name} hero`}
        fill
        priority
        className="object-contain object-center"
        onError={() => setImageSrc('/images/hero/customer-car-window.webp')}
      />

      {/* Glow overlay */}
      <div
        className="absolute -inset-4 pointer-events-none blur-2xl z-10"
        style={{
          background: getGlowGradient(),
        }}
        aria-hidden="true"
      />

      {/* Text content */}
      <div className="absolute z-20 bottom-6 left-6 text-white">
        <div className="text-xl md:text-2xl font-bold drop-shadow">{timeGreeting},</div>
        <div className="text-2xl md:text-3xl font-bold drop-shadow">{subtitle}</div>
        <div className="mt-2 px-3 py-1 inline-block text-xs font-medium uppercase rounded-full bg-black bg-opacity-60 border border-white">
          {tier.toUpperCase()} MODE • POWERED BY TORQUESITES
        </div>
      </div>
    </section>
  );
}

