"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PartnershipPage() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning, welcome to TorqueSites.");
    else if (hour < 18) setGreeting("Good afternoon, welcome to TorqueSites.");
    else setGreeting("Good evening, welcome to TorqueSites.");
  }, []);

  return (
    <main className="font-sans text-gray-900">
      {/* HERO */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Porsche */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/porsche-hero.jpg')" }}
          />
          {/* Gradient fade bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-6">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-pink-400 font-medium tracking-widest uppercase text-sm md:text-base mb-4"
          >
            {greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="text-4xl md:text-6xl font-bold leading-tight mb-4"
          >
            Torque 100 Partnership
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200"
          >
            An exclusive invite-only offer for garages that want world-class
            design, hosting, and lifetime partner pricing.
          </motion.p>
        </div>
      </section>

      {/* WHY PARTNER */}
      <section className="py-24 bg-[#0B1221] text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          Why Partner with TorqueSites?
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          <ul className="space-y-4">
            <li>✅ Stand out with world-class design</li>
            <li>✅ Get found on Google with built-in SEO</li>
            <li>✅ Exclusive partner pricing for the first 100 garages</li>
          </ul>
          <ul className="space-y-4">
            <li>✅ Mobile-first websites your customers trust</li>
            <li>✅ Hosting, SSL & updates — all included</li>
          </ul>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-gray-50 text-center">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Starter */}
          <div className="p-8 rounded-2xl border bg-white shadow-lg">
            <h3 className="text-xl font-bold text-pink-600">Partner Starter</h3>
            <p className="mt-4 text-4xl font-extrabold">£499</p>
            <p className="text-gray-500">+ £99/mo (all-in)</p>
            <ul className="mt-6 space-y-3 text-gray-700 text-left">
              <li>✓ Custom branded microsite</li>
              <li>✓ Mobile-optimised, fast design</li>
              <li>✓ Hosting, SSL, and updates included</li>
              <li>✓ Booking/contact form</li>
              <li>✓ Ongoing support</li>
            </ul>
            <motion.a
              href="https://buy.stripe.com/test_6oUbJ05jpcop0Lo0Z9grS01"
              whileHover={{ y: -2 }}
              className="mt-8 block w-full text-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 shadow-md hover:shadow-pink-500/50 transition"
            >
              Join as Partner
            </motion.a>
          </div>

          {/* Buy Out */}
          <div className="p-8 rounded-2xl border bg-white shadow-lg">
            <h3 className="text-xl font-bold text-orange-600">Partner Buy Out</h3>
            <p className="mt-4 text-4xl font-extrabold">£999</p>
            <p className="text-gray-500">+ optional £49/mo</p>
            <ul className="mt-6 space-y-3 text-gray-700 text-left">
              <li>✓ Full site ownership</li>
              <li>✓ Same premium features as Starter</li>
              <li>✓ Optional hosting, SSL & updates (£49/mo)</li>
              <li>✓ Advanced SEO setup</li>
              <li>✓ Priority maintenance available</li>
            </ul>
            <motion.a
              href="https://buy.stripe.com/test_4gM4gyh27aghbq2cHRgrS08"
              whileHover={{ y: -2 }}
              className="mt-8 block w-full text-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 shadow-md hover:shadow-orange-500/50 transition"
            >
              Partner Buy Out
            </motion.a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-orange-600 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to look world-class online?
        </h2>
        <p className="text-lg text-pink-100 max-w-2xl mx-auto mb-6">
          Secure your Torque 100 Partner slot today before they’re gone.
        </p>
        <div className="flex justify-center gap-4">
          <motion.a
            href="https://buy.stripe.com/test_6oUbJ05jpcop0Lo0Z9grS01"
            whileHover={{ y: -2 }}
            className="rounded-2xl bg-white text-gray-900 px-8 py-3 font-semibold shadow-md hover:shadow-white/30 transition"
          >
            Become a Partner
          </motion.a>
          <Link
            href="/contact"
            className="rounded-2xl bg-gray-900 border border-white px-8 py-3 font-semibold text-white hover:bg-gray-800 transition"
          >
            Learn More
          </Link>
        </div>
      </section>
    </main>
  );
}


