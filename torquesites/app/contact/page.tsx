"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("✅ Request sent! We’ll be in touch within 24h.");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("❌ Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("❌ Error sending request.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <motion.img
          src="/porsche-hero.jpg"
          alt="Porsche Hero"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/90" />

        <div className="relative z-10 text-center px-4">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Request Partnership
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            TorqueSites is invite-only. If you’re ready to grow, request your slot in the{" "}
            <span className="text-pink-500 font-semibold">Torque 100</span> and our team will be in touch.
            <br />
            <span className="text-gray-400 italic">
              If you’re here, it’s because you’ve been personally invited to explore Torque 100.
            </span>
          </motion.p>
        </div>
      </section>

      {/* Form Section */}
      <section className="flex-1 flex items-center justify-center py-16 px-4 bg-gradient-to-b from-gray-900 to-gray-950">
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-lg space-y-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500" size={18} />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 outline-none transition"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500" size={18} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 outline-none transition"
              required
            />
          </div>

          {/* Message */}
          <div className="relative">
            <MessageSquare className="absolute left-3 top-4 text-pink-500" size={18} />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell us about your garage and goals..."
              rows={4}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500 outline-none transition"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-orange-500 hover:opacity-90 transition"
          >
            Request Partnership
          </button>

          {status && <p className="text-center text-sm text-gray-400 mt-2">{status}</p>}
        </motion.form>
      </section>
    </div>
  );
}
