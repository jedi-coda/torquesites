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
    <section ref={ref} className="relative bg-zinc-950 py-20 md:py-32 text-white">
      {/* Full-width centered header */}
      <div className="text-center w-full max-w-5xl mx-auto px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight text-balance">
            Design that drives results — built for independent UK garages
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 mx-auto max-w-2xl">
            Professional, DVSA-aligned websites built to turn searches into bookings.
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
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-white leading-tight">Every pixel serves a purpose</h3>
                <p className="text-base text-zinc-300 leading-relaxed">
                  From the moment a customer lands on your site, every element guides them toward booking.
                  Clean layouts, intuitive navigation, and strategic placement of CTAs create a seamless
                  journey from interest to action.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-white leading-tight">Built for British garages</h3>
                <p className="text-base text-zinc-300 leading-relaxed">
                  We understand the UK garage industry. Our designs incorporate DVSA compliance, local SEO
                  optimization, and trust-building elements that resonate with British customers.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-3"
              >
                <h3 className="text-2xl font-bold text-white leading-tight">Mobile-first precision</h3>
                <p className="text-base text-zinc-300 leading-relaxed">
                  Most customers discover garages on their phones. Our designs prioritize mobile experience
                  while ensuring desktop users get the full premium experience they expect.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Porsche Image Block */}
          <div className="relative w-full max-w-xl mx-auto">
            {/* Heartbeat Glow Effect */}
            <motion.div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[70%] h-[20%] rounded-full blur-2xl bg-orange-500/30 pointer-events-none z-0"
              style={{ mixBlendMode: "screen" }}
              animate={{
                opacity: [0.2, 0.8, 0.3, 0.75, 0.2],
                scale: [1, 1.05, 1, 1.04, 1],
              }}
              transition={{
                duration: 3.6,
                ease: [0.4, 0, 0.2, 1],
                repeat: Infinity,
              }}
            />

            {/* Porsche Image with Motion */}
            <div className="precision-image-wrapper">
              <div className="image-ambient-glow absolute -inset-4 rounded-xl pointer-events-none z-0"></div>
              <motion.div
                animate={{
                  x: [0, 2, 0],
                  scale: [1, 1.015, 1],
                }}
                transition={{
                  duration: 7,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="relative z-10"
              >
                <Image
                  src="/images/porsche-precision.jpg"
                  alt="Precision Crafted Performance"
                  width={640}
                  height={400}
                  className="precision-image rounded-xl w-full shadow-2xl"
                  priority
                />
              </motion.div>
            </div>

            {/* Animated Overlay Badges - 4 corners */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={badgeVariants}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-3 left-3 z-20 bg-black/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10"
            >
              Precision Crafted
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={badgeVariants}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute top-3 right-3 z-20 bg-black/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10"
            >
              2.1s Load Time
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={badgeVariants}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-3 left-3 z-20 bg-black/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10"
            >
              99% Uptime
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={badgeVariants}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute bottom-3 right-3 z-20 bg-black/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10"
            >
              Engineering Excellence
            </motion.div>
          </div>
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