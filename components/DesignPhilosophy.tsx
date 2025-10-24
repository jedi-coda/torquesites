'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import FeatureCards from '@/components/ui/FeatureCards';

export default function DesignPhilosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { 
    once: true, 
    margin: "-100px",
    amount: 0.1
  });
  
  // Console log to confirm visibility trigger is working
  console.log('DesignPhilosophy section inView:', inView);

  return (
    <>
      {/* Porsche Refinement Section */}
      <section ref={ref} className="relative bg-gradient-to-b from-[#ffffff] to-[#f9f9f9]">
        <div className="absolute inset-0 bg-[url('/textures/alcantara.png')] bg-blend-soft-light opacity-[0.03] pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-center mb-6">
              Precision-crafted design, built for real UK garages
            </h2>
          </motion.div>

          {/* Feature Cards Section */}
          <div className="py-12">
            <FeatureCards />
          </div>

          {/* Bottom Quote */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center"
          >
            <div className="relative">
              {/* Decorative quote marks */}
              <div className="absolute -top-4 -left-4 text-6xl text-[#FF6F00]/20 font-serif">"</div>
              <div className="absolute -bottom-8 -right-4 text-6xl text-[#FF6F00]/20 font-serif">"</div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="text-center italic text-gray-600 md:text-gray-700 max-w-3xl mx-auto relative z-10 text-xl md:text-2xl"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                In the same way Porsche engineers obsess over aerodynamics and performance, 
                we obsess over user experience and conversion optimization.
              </motion.p>
              <span className="block mt-2 text-sm text-gray-500">
                — TorqueSites Design Team
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Glowing Orange Section Divider */}
      <div className="relative h-1 bg-gradient-to-r from-transparent via-[#FF6F00] to-transparent opacity-60">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF6F00] to-transparent blur-sm"></div>
      </div>
    </>
  );
}