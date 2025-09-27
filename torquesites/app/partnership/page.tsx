"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function PartnershipPage() {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <main className="font-sans bg-gray-900 text-white">
      {/* HERO with Porsche */}
<section
  className="relative bg-cover bg-center text-white py-48 px-6 text-center"
  style={{
    backgroundImage: "url('/porsche-hero.jpg')",
    backgroundAttachment: "fixed",
  }}
>
  <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60" />
  <div className="relative container">
    {/* Greeting ABOVE main heading */}
    <motion.p
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-xl sm:text-2xl text-gray-200 mb-6"
    >
      {greeting},{" "}
      <span className="font-semibold text-pink-500">
        forward-thinking garage owners
      </span>
    </motion.p>

    {/* Main heading */}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="text-4xl sm:text-6xl font-bold leading-tight mb-6"
    >
      Torque 100 Partnership
    </motion.h1>

    {/* Subline */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="mt-4 text-lg max-w-2xl mx-auto text-gray-300"
    >
      Exclusive invite-only offer for garages who want world-class design,
      hosting, and lifetime partner pricing.
    </motion.p>
  </div>
</section>


      {/* WHY PARTNER */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6">Why Partner with TorqueSites?</h2>
        <ul className="text-gray-300 space-y-4 text-lg">
          <li>✅ World-class design — stand out like the top brands</li>
          <li>✅ Mobile-first websites — built for today’s customers</li>
          <li>✅ SEO foundations — get found on Google, not lost</li>
          <li>✅ Hosting, SSL, and support included (no hidden extras)</li>
          <li>✅ Exclusive invite-only pricing for the first 100 garages</li>
        </ul>
      </section>

      {/* PRICING */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        {/* Partner Starter */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-10 rounded-3xl bg-gray-800 shadow-lg flex flex-col"
        >
          <h3 className="text-2xl font-bold mb-4 text-pink-400">Partner Starter</h3>
          <p className="text-4xl font-bold">£499</p>
          <p className="text-lg mb-6 text-gray-400">+ £99/month (all-in)</p>
          <ul className="text-gray-300 flex-1 space-y-3 mb-6 text-left">
            <li>✅ Custom branded microsite</li>
            <li>✅ Mobile-optimised, fast design</li>
            <li>✅ Hosting, SSL, and updates included</li>
            <li>✅ Booking/contact form</li>
            <li>✅ Ongoing support</li>
          </ul>
          <a
            href="https://buy.stripe.com/6oU4gB8ir9GlfQ4af4eQM05"
            className="rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 text-lg font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-transform text-center"
          >
            Join as Partner
          </a>
        </motion.div>

        {/* Partner Buy Out */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="p-10 rounded-3xl bg-gray-800 shadow-lg flex flex-col"
        >
          <h3 className="text-2xl font-bold mb-4 text-orange-400">Partner Buy Out</h3>
          <p className="text-4xl font-bold">£999</p>
          <p className="text-lg mb-6 text-gray-400">One-time + optional £49/mo</p>
          <ul className="text-gray-300 flex-1 space-y-3 mb-6 text-left">
            <li>✅ Full site ownership</li>
            <li>✅ Same premium features as Starter</li>
            <li>✅ Optional hosting, SSL & updates (£49/mo)</li>
            <li>✅ Advanced SEO setup</li>
            <li>✅ Priority maintenance available</li>
          </ul>
          <a
            href="https://buy.stripe.com/8x2aEZ8ir2dT47m4UKeQM07"
            className="rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 text-lg font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-transform text-center"
          >
            Partner Buy Out
          </a>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-pink-600 to-orange-500 text-center py-20 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to look world-class online?</h2>
        <p className="mb-6 text-lg">
          Secure your Torque 100 Partner slot today before they’re gone.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://buy.stripe.com/6oU4gB8ir9GlfQ4af4eQM05"
            className="rounded-xl bg-white text-pink-600 hover:bg-gray-100 px-8 py-3 font-semibold transition"
          >
            Become a Partner
          </a>
          <a
            href="#"
            className="rounded-xl bg-gray-900 text-white hover:bg-gray-800 px-8 py-3 font-semibold transition"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 py-10 mt-16 text-center text-gray-400">
        <p className="font-medium">
          TorqueSites Partnership — Exclusive for the first 100 garages
        </p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} TorqueSites. All rights reserved.
        </p>
      </footer>
    </main>
  );
}






