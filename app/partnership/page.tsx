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

      {/* PRICING (Partner) */}
      <section className="py-24 bg-gray-50 text-center">
        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Partner Starter */}
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

          {/* Partner Pro (Buy Out) */}
          <div className="p-8 rounded-2xl border bg-white shadow-lg">
            <h3 className="text-xl font-bold text-orange-600">Choose Pro Package</h3>
            <p className="mt-4 text-4xl font-extrabold">£999</p>
            <p className="text-gray-500">+ optional £49/mo</p>
            <ul className="mt-6 space-y-3 text-gray-700 text-left">
              <li>✓ Full site ownership</li>
              <li>✓ Same premium features as Starter</li>
              <li>✓ Optional hosting, SSL &amp; updates (£49/mo)</li>
              <li>✓ Advanced SEO setup</li>
              <li>✓ Priority maintenance available</li>
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
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-orange-600 text-center text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to look world-class online?
        </h2>
        <p className="text-lg text-pink-100 max-w-2xl mx-auto mb-6">
          Secure your Torque 100 Partner slot today before they&apos;re gone.
        </p>
        <div className="flex justify-center gap-4">
          <a
            href={links.partnerStarter}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl bg-white text-gray-900 px-8 py-3 font-semibold shadow-md hover:shadow-white/30 transition"
          >
            Become a Partner
          </a>
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
