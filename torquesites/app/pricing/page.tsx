"use client";

import { motion } from "framer-motion";

export default function PricingPage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-pink-600 to-pink-400 text-white">
        <h1 className="text-5xl font-bold mb-4">Simple, Clear Pricing</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Choose the plan that works for your garage. No hidden fees. Built to
          help you win bookings and look professional online.
        </p>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-10">
        {/* Starter */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="border rounded-2xl p-8 shadow-xl bg-white flex flex-col relative"
        >
          <h3 className="text-2xl font-bold mb-4 text-pink-600">Starter Package</h3>
          <p className="text-4xl font-bold">£999</p>
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
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-lg py-3 font-medium text-center"
          >
            Get Started
          </a>
        </motion.div>

        {/* Buy Out */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="border rounded-2xl p-8 shadow-xl bg-white flex flex-col relative"
        >
          <div className="absolute top-0 right-0 bg-pink-600 text-white text-sm font-medium px-3 py-1 rounded-bl-lg rounded-tr-2xl">
            Most Popular
          </div>
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Buy Out Package</h3>
          <p className="text-4xl font-bold">£1499</p>
          <p className="text-lg mb-6 text-gray-600">+ £49/month</p>
          <ul className="text-gray-700 flex-1 space-y-3 mb-6 text-left">
            <li>✅ Full site ownership</li>
            <li>✅ Same features as Starter</li>
            <li>✅ Hosting optional (add £49/mo)</li>
            <li>✅ Advanced SEO setup</li>
            <li>✅ Updates & maintenance available</li>
          </ul>
          <a
            href="https://buy.stripe.com/6oU4gB8ir9GlfQ4af4eQM05"
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg py-3 font-medium text-center"
          >
            Buy Now
          </a>
        </motion.div>

        {/* Custom */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="border rounded-2xl p-8 shadow-xl bg-white flex flex-col"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Custom Build</h3>
          <p className="text-4xl font-bold">By Quotation</p>
          <p className="text-lg mb-6 text-gray-600">for larger sites & groups</p>
          <ul className="text-gray-700 flex-1 space-y-3 mb-6 text-left">
            <li>✅ Tailored design & branding</li>
            <li>✅ Advanced SEO & integrations</li>
            <li>✅ Multi-site or franchise options</li>
            <li>✅ Conversion-first UX for bookings</li>
          </ul>
          <a
            href="https://buy.stripe.com/8x28wReGP5q5bzO2MCeQM03"
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg py-3 font-medium text-center"
          >
            Contact Us
          </a>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6 text-gray-700">
          <div>
            <h3 className="font-semibold text-lg">Do I really need to pay monthly?</h3>
            <p>
              Yes — the monthly fee covers hosting, SSL, updates, and ongoing support
              so your site always performs at its best.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Can I upgrade later?</h3>
            <p>
              Absolutely. You can start on the Starter package and move to Buy Out
              or Custom when your business is ready.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg">What’s included in support?</h3>
            <p>
              Support includes technical help, small content updates, and performance
              checks to make sure your site is always live and optimised.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-10 mt-16 text-center text-gray-600">
        <p className="font-medium">TorqueSites — World-class websites for UK garages</p>
        <p className="text-sm mt-2">
          © {new Date().getFullYear()} TorqueSites. All rights reserved.
        </p>
      </footer>
    </div>
  );
}




