"use client";

import { motion } from "framer-motion";

export default function PartnershipPage() {
  return (
    <div className="bg-gray-900 text-white">
      {/* Hero Section */}
      <section
        className="text-center py-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('/mercedes-hero.jpg')", // ensure this exists in /public
        }}
      >
        <div className="bg-black bg-opacity-50 py-20 px-6 rounded-xl inline-block">
          <h1 className="text-4xl font-bold mb-4">Torque 100 Partnership</h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-200">
            Exclusive invite-only offer for forward-thinking garages. Limited slots available each month.
          </p>
        </div>
      </section>

      {/* Why Partner Section */}
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

      {/* Pricing Section */}
      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
        {/* Starter Partner */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="border rounded-2xl p-8 shadow-lg bg-gray-800 flex flex-col"
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
            href="https://buy.stripe.com/8x2aEZ8ir2dT47m4UKeQM07"
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg py-3 font-medium text-center"
          >
            Join as Partner
          </a>
        </motion.div>

        {/* Buy Out Partner */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="border rounded-2xl p-8 shadow-lg bg-gray-800 flex flex-col"
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
            href="https://buy.stripe.com/8x28wReGP5q5bzO2MCeQM03"
            className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg py-3 font-medium text-center"
          >
            Partner Buy Out
          </a>
        </motion.div>
      </section>

      {/* Gradient CTA Banner */}
      <section className="bg-gradient-to-r from-pink-600 to-orange-500 text-center py-16 text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to look world-class online?</h2>
        <p className="mb-6 text-lg">
          Secure your Torque 100 Partner slot today before they’re gone.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://buy.stripe.com/fZuaEZcyH8CheM09b0eQM0b"
            className="bg-white text-pink-600 hover:bg-gray-100 rounded-lg px-6 py-3 font-medium"
          >
            Become a Partner
          </a>
          <a
            href="#"
            className="bg-gray-900 text-white hover:bg-gray-800 rounded-lg px-6 py-3 font-medium"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-10 mt-16 text-center text-gray-400">
        <p className="font-medium">TorqueSites Partnership — Exclusive for the first 100 garages</p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} TorqueSites. All rights reserved.
        </p>
      </footer>
    </div>
  );
}



