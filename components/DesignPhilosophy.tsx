'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function DesignPhilosophy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
            style={{ fontFamily: 'Manrope, sans-serif' }}
          >
            Design inspired by precision engineering
          </h2>
          <p 
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Just like Porsche engineers obsess over every detail, we craft websites that reflect the same level of precision and attention to detail your garage deserves.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Every pixel serves a purpose
              </h3>
              <p 
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                From the moment a customer lands on your site, every element guides them toward booking. 
                Clean layouts, intuitive navigation, and strategic placement of CTAs create a seamless 
                journey from interest to action.
              </p>
            </div>

            <div>
              <h3 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Built for British garages
              </h3>
              <p 
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                We understand the UK garage industry. Our designs incorporate DVSA compliance, 
                local SEO optimization, and trust-building elements that resonate with British 
                customers looking for reliable automotive services.
              </p>
            </div>

            <div>
              <h3 
                className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Mobile-first precision
              </h3>
              <p 
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Most customers discover garages on their phones. Our designs prioritize mobile 
                experience while ensuring desktop users get the full premium experience they expect.
              </p>
            </div>

            {/* Feature List */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">DVSA Compliant</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Mobile Optimized</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">SEO Ready</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">Fast Loading</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Porsche Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              {/* Porsche Image Container - 21:9 aspect ratio */}
              <div className="aspect-[21/9] relative">
                {/* Placeholder for Porsche image - replace with actual asset */}
                <div 
                  className="w-full h-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 flex items-center justify-center"
                  style={{
                    filter: 'brightness(0.95) saturate(0.9)',
                  }}
                >
                  <div className="text-center text-white">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-4xl font-bold">🏎️</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Porsche 911</h3>
                    <p className="text-gray-300">Precision Engineering</p>
                  </div>
                </div>
                
                {/* Overlay Elements */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2"
                >
                  <span className="text-sm font-semibold text-gray-900">Precision Crafted</span>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="absolute bottom-6 right-6 bg-black/80 backdrop-blur-sm rounded-lg px-4 py-2"
                >
                  <span className="text-sm font-semibold text-white">Engineering Excellence</span>
                </motion.div>
              </div>
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -top-6 -left-6 bg-white rounded-xl shadow-lg p-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">99%</div>
                <div className="text-xs text-gray-600">Uptime</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">2.1s</div>
                <div className="text-xs text-gray-600">Load Time</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <blockquote 
            className="text-xl md:text-2xl italic text-gray-700 max-w-4xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            "In the same way Porsche engineers obsess over aerodynamics and performance, 
            we obsess over user experience and conversion optimization."
          </blockquote>
          <cite className="block mt-4 text-gray-500 font-medium">
            — TorqueSites Design Team
          </cite>
        </motion.div>
      </div>
    </section>
  );
}
