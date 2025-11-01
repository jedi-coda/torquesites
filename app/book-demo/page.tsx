'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BookDemoPage() {
  // Dynamic time-based greeting with fallback
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };
  const greeting = getGreeting();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    garageName: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add API call to submit form
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div 
      className="relative z-0 min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden text-white"
      style={{
        background: 'radial-gradient(circle at center, #0a0a0a 0%, #1a1a1a 50%, #000000 100%)'
      }}
    >
      
      {/* Porsche Image with Animation - Desktop */}
      <motion.div
        initial={{ opacity: 0, scale: 1.03 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
        className="hidden md:block absolute inset-0 z-[-10] flex items-center justify-end pointer-events-none"
      >
        <div className="relative md:mt-[-3rem]">
          {/* Gentle Pulsing Glow Behind Porsche */}
          <motion.div
            animate={{
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-orange-500/20 blur-3xl z-[-1] pointer-events-none rounded-full"
          />
          
          {/* Cinematic radial gradient overlay for blending */}
          <div 
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.8) 100%)'
            }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: [1, 1.02, 1], // subtle breathing zoom
            }}
            transition={{
              opacity: { duration: 1.2, ease: 'easeOut' },
              y: { duration: 1.2, ease: 'easeOut' },
              scale: {
                duration: 8,
                ease: "easeInOut",
                repeat: Infinity,
              },
            }}
            className="relative z-0"
          >
            <img
              src="/images/porsche-911.jpg"
              alt="Porsche 911"
              className="max-w-4xl md:max-w-6xl object-contain brightness-75 contrast-125 saturate-150 md:mb-0 md:mr-[-2rem] shadow-[0_40px_60px_rgba(0,0,0,0.4)] drop-shadow-xl"
            />
          </motion.div>
          {/* Ambient glow below car for grounding */}
          <div className="absolute bottom-[-20px] left-0 right-0 mx-auto w-[300px] h-[60px] rounded-full blur-2xl bg-white/10 z-[-1] pointer-events-none animate-porsche-glow" />
          {/* Fade gradient overlay on right edge */}
          <div className="absolute z-10 top-0 right-0 h-full w-[200px] bg-gradient-to-l from-black/70 to-transparent pointer-events-none" />
          {/* Fade gradient overlay on left edge */}
          <div className="absolute z-10 top-0 left-0 h-full w-[150px] bg-gradient-to-r from-black/70 to-transparent pointer-events-none" />
        </div>
      </motion.div>
      
      {/* Ambient Glow */}
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] rounded-full bg-white/10 blur-3xl z-[-11]" />
      <section className="relative w-full max-w-[1280px] mx-auto">
      
      {/* Porsche Image for Mobile - Fixed Layout (positioned before content for proper stacking) */}
      <div className="md:hidden relative w-full h-[400px] overflow-hidden mb-8 z-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: [1, 1.02, 1], // subtle breathing zoom
          }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeOut' },
            y: { duration: 1.2, ease: 'easeOut' },
            scale: {
              duration: 8,
              ease: "easeInOut",
              repeat: Infinity,
            },
          }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/porsche-911.jpg"
            alt="Porsche 911"
            className="w-full h-full object-cover md:object-contain"
            style={{ objectPosition: 'center bottom' }}
          />
        </motion.div>
        
        {/* Gentle Pulsing Glow Overlay Behind Porsche */}
        <motion.div
          animate={{
            opacity: [0.3, 0.4, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-orange-500/20 blur-3xl z-[-1] pointer-events-none"
        />
      </div>
      {/* Diagonal Line Texture */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.015) 0px, rgba(255, 255, 255, 0.015) 1px, transparent 1px, transparent 48px)'
        }}
      />
      
      {/* Dark Radial Gradient Background (replaces heavy orange glow) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, #0B0B0C 0%, transparent 70%)'
        }}
      />
      
      {/* Soft radial gradient at edges for visual harmony */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-8 md:py-16 lg:py-24 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          {/* Header - Cinematic */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
            className="mb-2 md:mb-6"
          >
            {/* Dynamic Greeting - Cinematic */}
            <h1
              className="text-4xl md:text-5xl font-bold text-white text-center z-10"
              style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
            >
              {greeting},
            </h1>
            
            {/* Optional Subheadline */}
            <p className="text-orange-500 text-center mt-2 z-10 text-lg md:text-xl font-medium">
              Let's build something exceptional.
            </p>
          </motion.div>

          {/* Glassmorphic Form Card - Positioned lower for hero reveal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="bg-black/50 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_#FFA50055] rounded-xl p-8 md:p-12 transition-all duration-300 mt-8 md:mt-16 lg:mt-24 w-full max-w-[500px] mx-auto z-10"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C4FF00]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#C4FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
                  Thank You!
                </h2>
                <p className="text-white/80 mb-8 text-lg" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
                  We&apos;ve received your request. Our team will contact you within 24 hours.
                </p>
                <Link
                  href="/"
                  className="inline-block px-8 py-3 bg-[#FF8800] text-white font-bold rounded-lg hover:bg-[#ff9500] hover:shadow-[0_0_20px_rgba(255,136,0,0.5)] transition-all duration-300"
                >
                  Return Home
                </Link>
              </div>
            ) : (
              <form 
                onSubmit={handleSubmit} 
                className="space-y-6 text-left"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-orange-500 mb-6 text-center drop-shadow-lg" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
                  Request Your Demo
                </h2>
                <p className="text-sm font-medium text-lime-400 mb-3 mt-2 text-center" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
                  Claim your exclusive slot.
                </p>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white opacity-90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/30 transition-all"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white opacity-90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/30 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white opacity-90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/30 transition-all"
                    placeholder="07123 456789"
                  />
                </div>

                {/* Garage Name */}
                <div>
                  <label htmlFor="garageName" className="block text-sm font-semibold text-white opacity-90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Garage Name
                  </label>
                  <input
                    type="text"
                    id="garageName"
                    name="garageName"
                    value={formData.garageName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/30 transition-all"
                    placeholder="ABC Garage"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white opacity-90 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/30 transition-all resize-none"
                    placeholder="Tell us about your garage and what you're looking for..."
                  />
                </div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
                  className="pt-4"
                >
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-orange-500 text-white font-bold rounded-lg hover:bg-lime-500 hover:text-black hover:shadow-[0_0_20px_#a3e635] transition-all duration-300"
                    style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
                  >
                    Request Demo
                  </motion.button>
                </motion.div>

                {/* Guarantee Text */}
                <p className="text-sm md:text-base text-white/80 leading-snug mt-4 text-center px-2" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
                  Launch your high-performance website in 7–21 days — or your setup fee is protected by our <span className="text-lime-300 underline">Performance-Back Guarantee</span>.
                </p>

                {/* Helper Text */}
                <p className="text-xs text-white/60 mt-1 text-center" style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}>
                  We&apos;ll respond within 24 hours to schedule your personalized demo.
                </p>
              </form>
            )}
          </motion.div>


          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/"
              className="inline-flex items-center text-[#D1D1D1] hover:text-[#C4FF00] transition-colors"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
          </motion.div>
        </motion.div>
      </div>
      </section>
    </div>
  );
}
