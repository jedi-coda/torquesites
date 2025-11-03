'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CinematicCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    garage: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    // ✅ Enforce HTML5 native validation
    if (!form.checkValidity()) {
      form.reportValidity(); // shows browser validation tooltip
      return;
    }

    // 🧠 Existing submission logic below this line
    setIsSubmitting(true);
    try {
      const formDataToSend = new FormData(form);
      const res = await fetch("/api/book-demo", {
        method: "POST",
        body: formDataToSend,
      });

      if (res.ok) {
        router.push("/success");
      } else {
        console.error("Form submission failed.");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.4, 1, 1, 0.4]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] md:min-h-[90vh] overflow-hidden"
      aria-label="Call to action"
    >
      {/* Porsche Parallax Background */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y, scale }}>
        <Image
          src="/images/porsche-precision.jpg"
          alt="Precision engineering"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </motion.div>

      {/* Ambient Layering */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(208,255,0,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      {/* CTA Content */}
      <motion.div
        className="relative z-10 flex items-center justify-center min-h-[85vh] md:min-h-[90vh] px-6 py-16 md:py-24"
        style={{ opacity }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 md:mb-8"
            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(208, 255, 0, 0.1)' }}
          >
            Shine online.
          </motion.h2>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-light max-w-3xl mx-auto mb-10 md:mb-14"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}
          >
            You’ve earned your reputation in the garage — now let it perform on the web.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-16">
            <motion.button
              className="relative group px-8 md:px-10 py-4 md:py-5 bg-[#D0FF00] text-black font-bold rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Launch My TorqueSite</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                style={{ width: '50%' }}
                animate={{ x: ['-200%', '300%'] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
              />
            </motion.button>

            <motion.button
              className="group relative px-8 md:px-10 py-4 md:py-5 text-white font-semibold rounded-full"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Book a Demo</span>
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'radial-gradient(circle at center, rgba(208, 255, 0, 0.1) 0%, transparent 70%)'
                }}
              />
            </motion.button>
          </div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate={false}
            className="max-w-2xl mx-auto bg-black/50 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 mt-12 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
              Request Your Demo
            </h3>

            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white/90 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 bg-black/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D0FF00] focus:ring-2 focus:ring-[#D0FF00]/30 transition-all"
                />
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white/90 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-black/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D0FF00] focus:ring-2 focus:ring-[#D0FF00]/30 transition-all"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-white/90 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  pattern="[0-9+\s()-]{7,}"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="07123 456789"
                  className="w-full px-4 py-3 bg-black/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D0FF00] focus:ring-2 focus:ring-[#D0FF00]/30 transition-all"
                />
              </div>

              {/* Garage Name */}
              <div>
                <label htmlFor="garage" className="block text-sm font-semibold text-white/90 mb-2">
                  Garage Name *
                </label>
                <input
                  type="text"
                  id="garage"
                  name="garage"
                  required
                  value={formData.garage}
                  onChange={handleChange}
                  placeholder="ABC Garage"
                  className="w-full px-4 py-3 bg-black/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D0FF00] focus:ring-2 focus:ring-[#D0FF00]/30 transition-all"
                />
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white/90 mb-2">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your garage and what you're looking for…"
                  className="w-full px-4 py-3 bg-black/70 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#D0FF00] focus:ring-2 focus:ring-[#D0FF00]/30 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  className="w-full px-6 py-4 bg-[#D0FF00] text-black font-bold rounded-lg hover:shadow-lg hover:shadow-[#D0FF00]/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Request Demo'}
                </motion.button>
              </div>
            </div>
          </motion.form>

          {/* Trust Anchors */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 text-sm md:text-base mt-12 md:mt-16">
            {["Launch in 10 days", "Money-back guarantee", "UK-based support"].map((text, index) => (
              <div key={index} className="flex items-center gap-2 text-white/80">
                <span className="text-lg md:text-xl" style={{ filter: 'drop-shadow(0 2px 4px rgba(208, 255, 0, 0.3))' }}>✅</span>
                <span className="font-medium" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none" />
    </section>
  );
}
