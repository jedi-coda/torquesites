'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ShieldCheck, Search, Smartphone, GaugeCircle } from 'lucide-react';
import './PrecisionSection.css';

export default function PrecisionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section ref={ref} className="relative py-20 md:py-32 text-white">
      {/* Full-width centered header */}
      <div className="text-center w-full max-w-5xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-5xl sm:text-6xl font-bold text-white text-center">
            Design that drives results.
          </h2>
          <p className="mt-4 text-lg text-[#C4FF00] text-center">
            Smart, SEO-optimised sites built to convert searches into bookings.
          </p>
          
          {/* Trust Badges */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { label: "DVSA Compliant", icon: ShieldCheck, color: "text-green-400" },
              { label: "SEO Ready", icon: Search, color: "text-blue-400" },
              { label: "Mobile Optimized", icon: Smartphone, color: "text-orange-400" },
              { label: "Fast Loading", icon: GaugeCircle, color: "text-yellow-400" }
            ].map(({ label, icon: Icon, color }) => (
              <span
                key={label}
                className="rounded-full bg-neutral-800 px-4 py-1.5 text-sm text-white inline-flex items-center gap-2"
              >
                <Icon className={`h-4 w-4 ${color}`} />
                {label}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Block */}
          <div>
            {/* Feature Blocks */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group mb-6"
              >
                <h3 className="text-xl font-semibold text-white transition duration-300 group-hover:text-[#C4FF00] group-hover:scale-[1.03]">
                  Every pixel serves a purpose
                </h3>
                <p className="text-gray-400 mt-2">
                  From the moment a customer lands on your site, every element guides them toward booking.
                  Clean layouts, intuitive navigation, and strategic placement of CTAs create a seamless
                  journey from interest to action.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group mb-6"
              >
                <h3 className="text-xl font-semibold text-white transition duration-300 group-hover:text-[#C4FF00] group-hover:scale-[1.03]">
                  Built for British garages
                </h3>
                <p className="text-gray-400 mt-2">
                  We understand the UK garage industry. Our designs incorporate DVSA compliance, local SEO
                  optimization, and trust-building elements that resonate with British customers.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="group mb-6"
              >
                <h3 className="text-xl font-semibold text-white transition duration-300 group-hover:text-[#C4FF00] group-hover:scale-[1.03]">
                  Mobile-first precision
                </h3>
                <p className="text-gray-400 mt-2">
                  Most customers discover garages on their phones. Our designs prioritize mobile experience
                  while ensuring desktop users get the full premium experience they expect.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Right Column – Tron-style Porsche Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative"
          >
            <div className="relative w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 shadow-[0_0_30px_#C4FF00]">
              <Image
                src="/images/Porsche 911- tron.png"
                alt="Tron-inspired Porsche 911 Targa in motion"
                width={800}
                height={500}
                priority
                className="object-cover w-full h-auto"
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                Precision Crafted
              </div>
              <div className="absolute top-2 right-2 bg-green-500 text-black text-xs font-semibold px-2 py-1 rounded">
                2.1s Load Time
              </div>
              <div className="absolute bottom-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                99% Uptime
              </div>
              <div className="absolute bottom-2 right-2 bg-black text-white text-xs font-semibold px-2 py-1 rounded">
                Engineering Excellence
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quote */}
        <figure className="mt-16 max-w-3xl mx-auto">
          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl leading-relaxed text-center italic font-medium text-zinc-300"
          >
            "In the same way Porsche engineers obsess over aerodynamics and performance,
            we obsess over user experience and conversion optimization."
          </motion.blockquote>
          <motion.figcaption
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 text-center text-sm text-gray-400 hover:text-[#C4FF00] transition-colors duration-300 cursor-pointer"
          >
            TorqueSites Design Team
          </motion.figcaption>
        </figure>
      </div>
    </section>
  );
}