"use client"; 

import { useEffect, useState } from "react";
import Link from "next/link";
import { links } from "@/lib/links";
import { STRIPE } from "@/lib/stripeLinks";

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
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/porsche-hero.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
        </div>

        <div className="relative z-10 text-center text-white px-6">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur text-pink-200/90 tracking-widest uppercase text-xs md:text-sm shadow-sm mb-3">
            {greeting}
          </p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
            Torque 100 Partnership
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-200">
            An exclusive invite-only offer for garages that want world-class
            design, hosting, and lifetime partner pricing.
          </p>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Partnership Level
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Both packages include lifetime partner pricing, priority support, and
              exclusive features.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Starter Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Starter Partnership</h3>
                <p className="text-gray-600">Perfect for established garages</p>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">£999</div>
                <div className="text-sm text-gray-500">One-time setup</div>
                <div className="text-lg font-semibold text-green-600">+ £99/mo</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Professional website design</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Mobile-optimized layout</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Booking system integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>SEO optimization</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Hosting & maintenance</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>Priority support</span>
                </li>
              </ul>

              {STRIPE.PARTNER_STARTER ? (
                <a
                  href={STRIPE.PARTNER_STARTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full text-center rounded-2xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold py-3 shadow-md hover:shadow-pink-500/50 transition"
                >
                  Join as Partner
                </a>
              ) : (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">Contact us to get started</p>
                  <Link href="/contact" className="text-pink-600 hover:underline">Get in touch</Link>
                </div>
              )}
            </div>

            {/* Pro Package */}
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </span>
              </div>
              
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">Pro Partnership</h3>
                <p className="text-gray-600">For garages ready to scale</p>
              </div>
              
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-gray-900 mb-2">£1,999</div>
                <div className="text-sm text-gray-500">One-time setup</div>
                <div className="text-lg font-semibold text-green-600">+ £149/mo</div>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Everything in Starter</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Custom branding & colors</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Social media integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Customer reviews system</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Priority feature requests</span>
                </li>
              </ul>

              {STRIPE.PARTNER_PRO ? (
                <a
                  href={STRIPE.PARTNER_PRO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 block w-full text-center rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 shadow-md hover:shadow-orange-500/50 transition"
                >
                  Choose Pro Package
                </a>
              ) : (
                <div className="mt-8 p-4 bg-gray-100 rounded-lg">
                  <p className="text-sm text-gray-600">Contact us to get started</p>
                  <Link href="/contact" className="text-orange-600 hover:underline">Get in touch</Link>
                </div>
              )}
            </div>
          </div>

          {/* Limited monthly slots callout */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-r from-pink-50 to-orange-50 border border-pink-200 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Limited monthly slots</h4>
              <p className="text-gray-700 mb-4">Secure your Torque 100 Partner slot today before they're gone.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                {STRIPE.PARTNER_STARTER ? (
                  <a
                    href={STRIPE.PARTNER_STARTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-pink-600 text-white px-6 py-2 font-medium hover:bg-pink-700 transition"
                  >
                    Start (Starter)
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="rounded-lg bg-pink-600 text-white px-6 py-2 font-medium hover:bg-pink-700 transition"
                  >
                    Contact us
                  </Link>
                )}
                {STRIPE.PARTNER_PRO ? (
                  <a
                    href={STRIPE.PARTNER_PRO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-orange-600 text-white px-6 py-2 font-medium hover:bg-orange-700 transition"
                  >
                    Go Pro
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="rounded-lg bg-orange-600 text-white px-6 py-2 font-medium hover:bg-orange-700 transition"
                  >
                    Contact us
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 bg-gradient-to-r from-pink-600 to-orange-600 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join the Torque 100?
          </h2>
          <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
            Don't miss your chance to be part of an exclusive network of
            premium garage websites.
          </p>
          <a
            href={links.partnerStarter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white text-gray-900 px-8 py-3 font-semibold shadow-md hover:shadow-white/30 transition"
          >
            Become a Partner
          </a>
        </div>
      </section>
    </main>
  );
}