'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BookDemoPage() {
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0b0b0c]">
      {/* Diagonal Line Texture */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.015) 0px, rgba(255, 255, 255, 0.015) 1px, transparent 1px, transparent 48px)'
        }}
      />
      
      {/* Background Glow Layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,#ff6b00_0%,#0b0b0c_80%)] opacity-25 blur-2xl"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-20 md:py-32 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
              Book Your Demo
            </h1>
            <p className="text-lg md:text-xl text-[#D1D1D1] max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
              See how TorqueSites can accelerate your garage&apos;s online presence.
              Get a personalized demo tailored to your business.
            </p>
          </motion.div>

          {/* Glassmorphic Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900/40 backdrop-blur-md border border-gray-800/50 rounded-2xl p-8 md:p-12 shadow-2xl"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#C4FF00]/20 flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#C4FF00]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Thank You!
                </h2>
                <p className="text-[#D1D1D1] mb-8 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
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
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-[#C4FF00] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-[#C4FF00]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C4FF00] focus:ring-2 focus:ring-[#C4FF00]/30 transition-all"
                    placeholder="John Smith"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-[#C4FF00] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-[#C4FF00]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C4FF00] focus:ring-2 focus:ring-[#C4FF00]/30 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-[#C4FF00] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-[#C4FF00]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C4FF00] focus:ring-2 focus:ring-[#C4FF00]/30 transition-all"
                    placeholder="07123 456789"
                  />
                </div>

                {/* Garage Name */}
                <div>
                  <label htmlFor="garageName" className="block text-sm font-semibold text-[#C4FF00] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Garage Name
                  </label>
                  <input
                    type="text"
                    id="garageName"
                    name="garageName"
                    value={formData.garageName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-[#C4FF00]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C4FF00] focus:ring-2 focus:ring-[#C4FF00]/30 transition-all"
                    placeholder="ABC Garage"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-[#C4FF00] mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Additional Information
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-black border border-[#C4FF00]/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#C4FF00] focus:ring-2 focus:ring-[#C4FF00]/30 transition-all resize-none"
                    placeholder="Tell us about your garage and what you're looking for..."
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-[#FF8800] text-white font-bold rounded-lg hover:bg-[#ff9500] hover:shadow-[0_0_20px_rgba(255,136,0,0.5)] transition-all duration-300"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Request Demo
                  </motion.button>
                </div>

                {/* Helper Text */}
                <p className="text-center text-sm text-[#D1D1D1]" style={{ fontFamily: 'Inter, sans-serif' }}>
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
  );
}
