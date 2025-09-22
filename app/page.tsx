"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Car,
  Wrench,
  CircleDot,
  Gauge,
  CreditCard,
  Gift,
  Tag,
} from "lucide-react";

export default function HomePage() {
  const [greeting, setGreeting] = useState<string | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <main className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* HERO */}
      <section className="relative bg-gradient-to-b from-brand-navy to-black text-white text-center px-6 py-24">
        {greeting && (
          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-pink">{greeting},</span>{" "}
            <span className="text-white">how can I assist you with your</span>{" "}
            <span className="text-white font-extrabold text-5xl md:text-6xl">
              vehicle needs
            </span>{" "}
            <span className="text-white">today?</span>
          </motion.h1>
        )}

        <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
          MOTgenie is your personal assistant for car care — helping you find
          trusted garages, book smarter, and unlock rewards. No stress. No
          overpaying. Just smooth motoring.
        </p>

        {/* Search + CTA */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex w-full max-w-md rounded-lg overflow-hidden shadow-lg">
            <input
              type="text"
              placeholder="Enter postcode, town or vehicle reg..."
              className="flex-grow px-4 py-3 text-gray-800 focus:outline-none"
            />
            <button className="bg-gradient-to-r from-brand-pink to-pink-600 px-6 py-3 font-semibold text-white hover:opacity-90 transition">
              Search
            </button>
          </div>
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-brand-pink to-pink-600 text-white font-semibold shadow hover:opacity-90 transition">
            🚀 Join the Waitlist
          </button>
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-6 text-brand-pink font-medium text-lg"
        >
          ✨ Stress-free MOT booking is just around the corner — join now and be
          first in line!
        </motion.p>
      </section>

      {/* SERVICES */}
      <section className="py-20 px-6 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Popular Services
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {[
            { icon: Car, title: "MOT", desc: "Fast, hassle-free MOT tests" },
            {
              icon: Wrench,
              title: "Servicing",
              desc: "Keep your car running at its best",
            },
            { icon: CircleDot, title: "Tyres", desc: "Affordable, fitted fast" },
            {
              icon: Gauge,
              title: "Diagnostics",
              desc: "Clear answers for warning lights",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <item.icon className="w-10 h-10 text-brand-pink mx-auto mb-3" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 px-6">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Book smarter, save more
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            {
              icon: CreditCard,
              title: "Fuel Card",
              desc: "Save up to 10% every time you fill up",
            },
            {
              icon: Gift,
              title: "Free Accessories",
              desc: "Wipers, mats & seasonal extras on us",
            },
            {
              icon: Tag,
              title: "Off-Peak Discounts",
              desc: "Cheaper MOT slots during quiet times",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition text-center"
            >
              <item.icon className="w-10 h-10 text-brand-pink mx-auto mb-3" />
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-brand-navy text-white text-center py-12 px-6">
        <h3 className="font-bold text-lg mb-3">Be the first to know 🚀</h3>
        <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6">
          Join our early access waitlist and unlock exclusive rewards when we
          launch. Let MOTgenie take the stress out of car care.
        </p>
        <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-brand-pink to-pink-600 text-white font-semibold shadow hover:opacity-90 transition">
          Join Waitlist
        </button>
        <p className="mt-8 text-xs text-gray-400">
          © 2025 MOTmatch Ltd. All rights reserved. | Privacy · Terms · Contact
        </p>
      </footer>
    </main>
  );
}
