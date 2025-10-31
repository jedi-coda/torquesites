"use client";

import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { handleCheckout } from "@/lib/stripe";

export default function PricingPage() {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-600 to-pink-500 text-white py-32 text-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10" />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6">
            Simple, Clear Pricing
          </h1>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto text-gray-100">
            Choose the plan that works for your garage. No hidden fees. Built to
            help you win bookings and look professional online.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10">
        {/* Starter */}
        <div className="border rounded-2xl p-8 shadow-lg bg-white flex flex-col relative hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4 text-pink-600">
            Starter Package
          </h3>
          <div className="mb-6">
            <div className="text-4xl font-extrabold text-gray-900 mb-2">£999</div>
            <div className="text-sm text-gray-500">One-time setup</div>
            <div className="text-lg font-semibold text-green-600">+ £99/mo</div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Professional website design</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Mobile-optimized layout</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Booking system integration</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Basic SEO optimization</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Hosting & maintenance</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Email support</span>
            </li>
          </ul>

          <button
            onClick={() => handleCheckout("price_1SBxjIRYcQYm7u35pOOsnKnA")}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
          >
            Start Your Engine →
          </button>
        </div>

        {/* Pro (was Buy Out) */}
        <div className="border rounded-2xl p-8 shadow-lg bg-white flex flex-col relative hover:shadow-xl transition">
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-orange-600">
            Pro Package
          </h3>
          <div className="mb-6">
            <div className="text-4xl font-extrabold text-gray-900 mb-2">£1,999</div>
            <div className="text-sm text-gray-500">One-time setup</div>
            <div className="text-lg font-semibold text-green-600">+ £149/mo</div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Everything in Starter</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Custom branding & colors</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Advanced SEO optimization</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Social media integration</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Customer reviews system</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Priority support</span>
            </li>
          </ul>

          <button
            onClick={() => handleCheckout("price_1SNvXZRYcQYm7u35AWCkJAGr")}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
          >
            Shift into Top Gear →
          </button>
        </div>

        {/* Custom Build */}
        <div className="border rounded-2xl p-8 shadow-lg bg-white flex flex-col hover:shadow-xl transition">
          <h3 className="text-2xl font-bold mb-4 text-gray-600">
            Custom Build
          </h3>
          <div className="mb-6">
            <div className="text-4xl font-extrabold text-gray-900 mb-2">Custom</div>
            <div className="text-sm text-gray-500">Quote on request</div>
            <div className="text-lg font-semibold text-green-600">+ £199/mo</div>
          </div>

          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Everything in Pro</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Fully custom design</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Advanced integrations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Custom functionality</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Dedicated project manager</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>White-label options</span>
            </li>
          </ul>

          <button
            onClick={() => handleCheckout("price_1SNv1kRYcQYm7u35gWY72JkW")}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg text-center transition"
          >
            Enter Hyper Mode →
          </button>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 1,
            }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-6 text-orange-500"
          >
            Our Guarantee
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">7-Day Launch</h3>
              <p className="text-gray-600">
                Your site goes live within 7 days of approval, or we refund your setup fee.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">30-Day Money Back</h3>
              <p className="text-gray-600">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lifetime Support</h3>
              <p className="text-gray-600">
                Ongoing support and updates included with your monthly plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-20 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of garages who've transformed their online presence with TorqueSites.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-white text-pink-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition"
            >
              Book a Call
            </a>
            <a
              href="/partnership"
              className="border border-white text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-lg transition"
            >
              View Partnership
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}