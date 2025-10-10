"use client";

import { useState } from "react";
import { User, Mail, MessageSquare, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        <div className="absolute inset-0">
          <Image
            src="/porsche-hero.jpg"
            alt="Porsche"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 40%" }} // drop the image slightly, like homepage
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#0B1120]" />
        </div>

        {/* Hero Copy — Option A */}
        <div className="relative z-10 text-center px-6">
          {/* invite-only pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs md:text-sm mb-3">
            <span className="inline-block h-2 w-2 rounded-full bg-pink-500" />
            Invite-only
          </div>

          <h1 className="text-4xl md:text-6xl font-bold">Request Partnership</h1>

          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Invite-only for standout UK garages.
          </p>

          <p className="mt-1 text-pink-300/90">
            Claim your <span className="font-semibold">Torque&nbsp;100</span> slot — we’ll reply within{" "}
            <span className="font-semibold">24 hours</span>.
          </p>
        </div>
      </section>

      {/* Form / Thank-you Section */}
      <section className="flex-1 flex items-center justify-center py-16 px-6 bg-gradient-to-b from-[#0B1120] to-[#111827]">
        {success ? (
          // Personalized thank-you (replaces form)
          <div className="w-full max-w-xl bg-[#1B2337]/90 p-8 rounded-2xl shadow-2xl border border-white/10 text-center">
            <div className="flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-semibold">
              Thank you{form.name ? `, ${form.name}` : ""}!
            </h2>
            <p className="text-gray-300 mt-2">
              We’ve received your request. A member of the TorqueSites team will be in touch within{" "}
              <span className="font-semibold">24 hours</span>.
            </p>
          </div>
        ) : (
          // Form
          <form
            onSubmit={handleSubmit}
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
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 font-semibold text-white rounded-xl bg-gradient-to-r from-pink-500 to-orange-500 shadow-lg hover:opacity-90 transition"
            >
              {loading ? "Sending..." : "Request Partnership"}
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
