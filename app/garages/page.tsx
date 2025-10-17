"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default function GaragesPage() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <main className="font-sans text-gray-900">
      {/* HERO */}
      <section
        className="relative bg-cover bg-center text-white py-48 px-6 text-center"
        style={{
          backgroundImage: "url('/images/porsche-911.jpg')",
          backgroundAttachment: "fixed", // parallax effect
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60" />
        <div className="relative container">
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-6xl font-bold leading-tight mb-6"
          >
            We know tech. You know cars. Together, we win.
          </motion.h1>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-xl sm:text-2xl text-gray-200 mb-8"
          >
            {greeting},{" "}
            <span className="font-semibold text-brand-pink">
              independent garage owners
            </span>{" "}
            👋
          </motion.p>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="mt-4 text-lg max-w-2xl mx-auto text-gray-300"
          >
            Stop paying commission to middlemen. MOTmatch is built for{" "}
            <span className="font-semibold">independent garage owners</span> —
            giving you a branded microsite, instant payouts, and lifetime Early
            Partner pricing.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="mt-10 flex justify-center gap-4"
          >
            <a
              href="#pricing"
              className="rounded-xl bg-brand-pink text-white px-8 py-4 text-lg font-semibold hover:opacity-90 transition"
            >
              Secure Early Partner Package
            </a>
            <a
              href="#pricing"
              className="rounded-xl bg-white text-brand-navy px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition"
            >
              Request Callback
            </a>
          </motion.div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="relative py-28 bg-gray-50 overflow-hidden">
        {/* Porsche watermark */}
        <img
          src="/images/porsche-911.jpg"
          alt="Porsche 911"
          className="absolute right-0 bottom-0 w-[600px] opacity-10 pointer-events-none hidden lg:block"
        />

        <div className="container text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-semibold text-brand-navy"
          >
            See how we stack up against aggregators
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Clear, simple pricing — no commission, no surprises. Built to help
            you win customers, not lose margin.
          </motion.p>

          {/* Cards */}
          <div className="mt-16 grid gap-10 md:grid-cols-2">
            {/* Aggregators */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-white shadow-lg border border-red-100 hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold text-red-600 mb-6">
                With Aggregators
              </h3>
              <ul className="space-y-4 text-gray-700 text-left">
                <li className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                  10–25% commission on every booking
                </li>
                <li className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Customers belong to them, not you
                </li>
                <li className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Payouts can be slow and unclear
                </li>
                <li className="flex items-center gap-3">
                  <XCircle className="h-5 w-5 text-red-500" />
                  Competing garages listed side by side
                </li>
              </ul>
            </motion.div>

            {/* MOTmatch */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-white shadow-lg border border-green-100 hover:shadow-xl transition"
            >
              <h3 className="text-2xl font-semibold text-brand-navy mb-6">
                With MOTmatch
              </h3>
              <ul className="space-y-4 text-gray-700 text-left">
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  0% commission — keep 100% of your bookings
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Your customers, your relationship
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Instant Stripe payouts direct to your account
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  Branded microsite — you, not the aggregator
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24">
        <div className="container text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-brand-navy">
            Why independent garages choose MOTmatch
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We give you the tools to own your customer relationships, reduce
            reliance on middlemen, and grow sustainably with 0% commission —
            helping you compete with big chains and aggregators, without losing
            margin.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <div id="pricing">
        <Pricing />
      </div>

      {/* FAQ */}
      <FAQ />

      {/* CLOSING CTA */}
      <section className="py-20 bg-gradient-to-r from-brand-navy to-black text-center text-white">
        <div className="container">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to join the first 100 Early Partners?
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
            Secure your lifetime Early Partner pricing today and grow your
            business with MOTmatch.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#pricing"
              className="rounded-xl bg-brand-pink px-8 py-3 font-semibold text-white hover:opacity-90 transition"
            >
              Secure Early Partner Package
            </a>
            <a
              href="#pricing"
              className="rounded-xl bg-white px-8 py-3 font-semibold text-brand-navy hover:bg-gray-100 transition"
            >
              Request Callback
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
