"use client";

import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-600 to-pink-500 text-white py-32 text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10" />
        <div className="relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6"
          >
            Simple, Clear Pricing
          </motion.h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-100">
            Choose the plan that works for your garage. No hidden fees. Built to
            help you win bookings and look professional online.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {/* Starter */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="border rounded-2xl p-8 shadow-lg bg-white flex flex-col relative hover:shadow-xl transition"
        >
          <h3 className="text-2xl font-bold mb-4 text-pink-600">
            Starter Package
          </h3>
          <p className="text-4xl font-extrabold">£999</p>
          <p className="text-lg mb-6 text-gray-600">+ £99/month (all-in)</p>
          <ul className="text-gray-700 flex-1 space-y-3 mb-6 text-left">
            <li>✅ Custom branded microsite</li>
            <li>✅ Mobile-friendly, fast design</li>
            <li>✅ Hosting & SSL included</li>
            <li>✅ Booking/contact form</li>
            <li>✅ Basic SEO setup</li>
            <li>✅ Ongoing updates & support</li>
          </ul>
          <a
            href="https://buy.stripe.com/fZuaEZcyH8CheM09b0eQM0b"
            className="rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 text-white px-8 py-4 text-lg font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-transform text-center"
          >
            Get Started
          </a>
        </motion.div>

        {/* Buy Out */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="border rounded-2xl p-8 shadow-lg bg-white flex flex-col relative hover:shadow-xl transition"
        >
          <div className="absolute top-0 right-0 bg-pink-600 text-white text-sm font-medium px-3 py-1 rounded-bl-lg rounded-tr-2xl">
            Most Popular
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">
            Buy Out Package
          </h3>
          <p className="text-4xl font-extrabold">£1499</p>
          <p className="text-lg mb-6 text-gray-600">+ £49/month optional</p>
          <ul className="text-gray-700 flex-1 space-y-3 mb-6 text-left">
            <li>✅ Full site ownership</li>
            <li>✅ Same features as Starter</li>
            <li>✅ Hosting optional (add £49/mo)</li>
            <li>✅ Advanced SEO setup</li>
            <li>✅ Updates & maintenance available</li>
          </ul>
          <a
            href="https://buy.stripe.com/8x28wReGP5q5bzO2MCeQM03"
            className="rounded-2xl bg-gray-900 text-white px-8 py-4 text-lg font-semibold hover:bg-gray-800 hover:shadow-lg transition text-center"
          >
            Buy Now
          </a>
        </motion.div>

        {/* Custom Build */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="border rounded-2xl p-8 shadow-lg bg-white flex flex-col hover:shadow-xl transition"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Custom Build</h3>
          <p className="text-4xl font-extrabold">By Quotation</p>
          <p className="text-lg mb-6 text-gray-600">for larger sites & groups</p>
          <ul className="text-gray-700 flex-1 space-y-3 mb-6 text-left">
            <li>✅ Tailored design & branding</li>
            <li>✅ Advanced SEO & integrations</li>
            <li>✅ Multi-site or franchise options</li>
            <li>✅ Conversion-first UX for bookings</li>
          </ul>
          <a
            href="https://buy.stripe.com/aFa4gBdCL2dT5bq4UKeQM09"
            className="rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 text-white px-8 py-4 text-lg font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-transform text-center"
          >
            Contact Us
          </a>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg">
              Do I really need to pay monthly?
            </h3>
            <p>
              Yes — the monthly fee covers hosting, SSL, updates, and ongoing
              support so your site always performs at its best.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Can I upgrade later?</h3>
            <p>
              Absolutely. You can start on the Starter package and move to Buy
              Out or Custom when your business is ready.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">What’s included in support?</h3>
            <p>
              Support includes technical help, small content updates, and
              performance checks to make sure your site is always live and
              optimised.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 mt-16 text-center text-gray-600">
        <p className="font-medium">
          TorqueSites — World-class websites for UK garages
        </p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} TorqueSites. All rights reserved.
        </p>
      </footer>
    </div>
  );
}




