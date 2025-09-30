"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function GemPage() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <main className="font-sans text-gray-900">
      {/* Hero Section */}
      <section
        className="relative flex items-center justify-center text-center h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: "url('/porsche-hero.jpg')",
          backgroundPosition: "center 40%",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {greeting}, welcome to{" "}
            <span className="text-blue-400">GEM UK Garage</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Worthing’s trusted experts in MOTs, servicing & full vehicle care.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#services"
              className="px-6 py-3 rounded-xl bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition"
            >
              See Our Services
            </a>
            <a
              href="#reviews"
              className="px-6 py-3 rounded-xl border border-gray-200 text-white font-semibold hover:bg-white/10 transition"
            >
              Read Reviews
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose GEM */}
      <section className="py-20 px-6 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Why Choose GEM?
        </motion.h2>
        <p className="text-center mt-4 text-gray-600 max-w-2xl mx-auto">
          With over 25 years’ experience, our ex-John Cooper team delivers honest,
          transparent care for any make, any model. Proud members of the Good
          Garage Scheme with 98% satisfaction from 1,900+ reviews.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
          <Feature title="Free local pick-up & drop-off" />
          <Feature title="Free MOT re-test" />
          <Feature title="Transparent checklist reporting" />
          <Feature title="Female friendly service" />
          <Feature title="Courtesy cars available" />
          <Feature title="Trusted, experienced team" />
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-6 bg-gray-50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Our Services
        </motion.h2>
        <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Service title="MOT & Hybrid/EV servicing" />
          <Service title="Engine diagnostics & repairs" />
          <Service title="Clutch & gearbox replacements" />
          <Service title="Air conditioning service" />
          <Service title="Car body repairs & paintwork" />
          <Service title="Tyres, brakes & exhausts" />
          <Service title="Wheel alignment & tracking" />
          <Service title="Breakdown recovery" />
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-20 px-6 bg-gradient-to-r from-pink-50 to-blue-50">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          What Our Customers Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Review
            name="Sarah J."
            text="Excellent service! The team explained everything clearly and got my car back on the road quickly."
          />
          <Review
            name="James L."
            text="Friendly, transparent and reliable. GEM has looked after my cars for years — highly recommend."
          />
          <Review
            name="Emily R."
            text="MOT and service done in one day. Love the courtesy car option, super convenient!"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10 px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <Image
            src="/gem-logo.png" // Add logo file into /public
            alt="GEM UK Garage Logo"
            width={150}
            height={60}
          />
          <p className="text-sm text-gray-400">
            61F Ferringham Lane, South Ferring, Worthing, BN12 5LW <br />
            01903 700 009 | 07968 617 532 | servicedaniel@gem-ukgarage.com
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} GEM UK Garage. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function Feature({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 border rounded-2xl shadow-sm hover:shadow-lg transition"
    >
      <p className="font-medium text-gray-700">{title}</p>
    </motion.div>
  );
}

function Service({ title }: { title: string }) {
  return (
    <div className="p-6 border rounded-xl shadow-sm bg-white hover:shadow-md transition">
      <p className="font-medium text-gray-800">{title}</p>
    </div>
  );
}

function Review({ name, text }: { name: string; text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white rounded-2xl shadow-md text-left"
    >
      <p className="text-gray-700 italic mb-4">“{text}”</p>
      <p className="text-sm font-semibold text-gray-900">— {name}</p>
    </motion.div>
  );
}
