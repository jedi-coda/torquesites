"use client";

import Image from 'next/image';

export default function MiniHeroSection() {
  return (
    <section className="relative w-full bg-black py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Column */}
          <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image
              src="/images/customer-car-window.webp"
              alt="Friendly mechanic handing keys back to a smiling customer"
              fill
              className="object-cover"
              priority
            />
            {/* Subtle overlay for better text contrast if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          {/* Text Column */}
          <div className="text-white space-y-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              Trusted by Local Drivers
            </h2>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              Our experienced technicians provide honest, high-quality service that keeps our customers coming back. You're in safe hands — just ask the locals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

