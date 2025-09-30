"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-white">
      {/* Hero Section with Porsche */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src="/porsche-hero.jpg"
            alt="Porsche"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0B1120]" />
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold">Request Partnership</h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            TorqueSites is invite-only. If you’re ready to grow, request your slot in the{" "}
            <span className="text-pink-500 font-semibold">Torque 100</span> and our team
            will be in touch.
          </p>
          <p className="mt-2 text-pink-400 font-medium">
            If you’re seeing this page, it’s because you’ve been invited.
          </p>
        </motion.div>
      </section>

      {/* Form Section */}
      <section className="flex-1 flex items-center justify-center py-16 px-6 bg-gradient-to-b from-[#0B1120] to-[#111827]">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg bg-[#1B2337]/90 p-8 rounded-2xl shadow-2xl border border-white/10 space-y-6"
        >
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 w-5 h-5" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-[#0B1120] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-[#0B1120] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 text-pink-400 w-5 h-5" />
            <textarea
              name="message"
              placeholder="Tell us about your garage and goals..."
              value={form.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full pl-10 pr-4 py-3 bg-[#0B1120] border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg hover:opacity-90 transition"
          >
            {loading ? "Sending..." : "Request Partnership"}
          </motion.button>

          {success && (
            <p className="text-green-400 text-center pt-2">
              Thank you! We’ll be in touch within 24 hours.
            </p>
          )}
        </motion.form>
      </section>
    </div>
  );
}
