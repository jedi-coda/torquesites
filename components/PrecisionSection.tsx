'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function PrecisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative bg-white py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Block */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Design that drives results — built for real UK garages
              </h2>
              <p className="text-lg text-gray-600 mb-16">
                Professional, DVSA-aligned websites built to turn searches into bookings.
              </p>
            </motion.div>

            {/* Feature Blocks */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Every pixel serves a purpose</h3>
                <p className="text-gray-600">
                  From the moment a customer lands on your site, every element guides them toward booking.
                  Clean layouts, intuitive navigation, and strategic placement of CTAs create a seamless
                  journey from interest to action.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Built for British garages</h3>
                <p className="text-gray-600">
                  We understand the UK garage industry. Our designs incorporate DVSA compliance, local SEO
                  optimization, and trust-building elements that resonate with British customers.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Mobile-first precision</h3>
                <p className="text-gray-600">
                  Most customers discover garages on their phones. Our designs prioritize mobile experience
                  while ensuring desktop users get the full premium experience they expect.
                </p>
              </div>

              {/* Features Summary */}
              <div className="flex flex-wrap gap-6 pt-4 text-sm">
                <span className="text-orange-500">• DVSA Compliant</span>
                <span className="text-green-500">• SEO Ready</span>
                <span className="text-blue-500">• Mobile Optimized</span>
                <span className="text-purple-500">• Fast Loading</span>
              </div>
            </div>
          </div>

          {/* Porsche Image Block */}
          <div className="relative w-full max-w-xl mx-auto">
            {/* Heartbeat Glow */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-[20%] rounded-full blur-2xl bg-lime-400/20 pointer-events-none z-0"
              style={{ mixBlendMode: "screen" }}
              animate={{
                opacity: [0.2, 0.85, 0.3, 0.75, 0.2],
                scale: [1, 1.04, 1, 1.03, 1],
              }}
              transition={{
                duration: 3.6,
                ease: [0.4, 0, 0.2, 1],
                repeat: Infinity,
              }}
            />

            {/* Porsche Image */}
            <Image
              src="/images/porsche.jpg"
              alt="Porsche Targa driving on road"
              width={640}
              height={400}
              className="rounded-xl relative z-10 w-full shadow-xl"
              priority
            />

            {/* Labels */}
            <div className="absolute top-3 left-3 z-20 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded">
              Precision Crafted
            </div>
            <div className="absolute top-3 right-3 z-20 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded">
              2.1s Load Time
            </div>
            <div className="absolute bottom-3 left-3 z-20 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded">
              99% Uptime
            </div>
          </div>
        </div>

        {/* Quote */}
        <p className="mt-16 italic text-center text-gray-600 text-sm">
          "In the same way Porsche engineers obsess over aerodynamics and performance,
          we obsess over user experience and conversion optimization."
          <br />
          <span className="block mt-2">— TorqueSites Design Team</span>
        </p>
      </div>
    </section>
  );
}