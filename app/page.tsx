"use client";

import { motion } from "framer-motion";
import {
  Wrench,
  Smartphone,
  ShieldCheck,
  Search,
  Calendar,
  Headphones,
} from "lucide-react";
import Link from "next/link";
import { links } from "@/lib/links";

export default function HomePage() {
  return (
    <main className="font-sans text-gray-900">
      {/* NAV */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="font-bold text-xl text-gray-900">
            TorqueSites
          </Link>
          <div className="flex gap-6">
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-pink-600 font-medium transition"
            >
              Pricing
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-pink-600 font-medium transition"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section
        className="relative flex items-center justify-center text-center h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/porsche-hero.jpg')", backgroundPosition: "center 40%" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            You&apos;ve earned your reputation. <br /> Now let it shine online.
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Your reputation is built in the garage. We make sure it shows online.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              suppressHydrationWarning
              href={links.publicStarter}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-pink-600 text-white font-semibold shadow hover:bg-pink-700 transition"
            >
              Get Started (£999)
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl border border-gray-200 text-white font-semibold hover:bg-white/10 transition"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 px-6 bg-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-center"
        >
          Built for garages. Focused on results.
        </motion.h2>
        <div className="mt-14 grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <Feature
            icon={<Smartphone size={28} strokeWidth={2} />}
            title="Mobile-first Design"
            text="Look sharp on every device. Customers check you on their phone first."
          />
          <Feature
            icon={<Calendar size={28} strokeWidth={2} />}
            title="Booking System"
            text="Simple booking forms that turn searches into customers."
          />
          <Feature
            icon={<ShieldCheck size={28} strokeWidth={2} />}
            title="Secure Hosting"
            text="Fast, reliable hosting with SSL built in. Always live, always safe."
          />
          <Feature
            icon={<Search size={28} strokeWidth={2} />}
            title="SEO Ready"
            text="Show up when customers search. Basic SEO baked in."
          />
          <Feature
            icon={<Wrench size={28} strokeWidth={2} />}
            title="Garage Focused"
            text="Every feature designed for MOTs, servicing, and repairs."
          />
          <Feature
            icon={<Headphones size={28} strokeWidth={2} />}
            title="Ongoing Support"
            text="We manage updates so your site always feels fresh."
          />
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="py-24 px-6 bg-gray-50 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Clear pricing. No surprises.
        </motion.h2>
        <p className="mt-4 text-lg text-gray-600">
          Get started with a simple one-time setup fee.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-10 max-w-sm mx-auto border rounded-2xl shadow-lg p-8 bg-white"
        >
          <h3 className="text-xl font-bold">Starter Package</h3>
          <p className="mt-2 text-4xl font-extrabold text-gray-900">£999</p>
          <p className="text-sm text-gray-500">+ £99/mo all-in</p>

          <a
            suppressHydrationWarning
            href={links.publicStarter}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition text-center"
          >
            Get Started (£999)
          </a>

          <Link
            href="/pricing"
            className="mt-4 block text-pink-600 hover:underline font-medium"
          >
            See Full Pricing &rarr;
          </Link>
        </motion.div>
      </section>

      {/* GUARANTEE */}
      <section className="py-24 px-6 bg-gray-900 text-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Our Guarantee
        </motion.h2>
        <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
          Your site, live in days — not months. Most garages launch in 7–10 days. And if you&apos;re not fully satisfied, your setup fee is protected with our money-back promise.
        </p>
        <p className="mt-10 text-pink-400 font-medium">No risk. Just results.</p>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 bg-gradient-to-r from-pink-600 to-pink-700 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Ready to shine online?
        </motion.h2>
        <p className="mt-4 text-lg text-pink-100 max-w-2xl mx-auto">
          Give your garage the website it deserves — modern, trusted, and built
          to win customers.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            suppressHydrationWarning
            href={links.publicStarter}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl shadow-lg transition"
          >
            Get Started (£999)
          </a>
          <Link
            href="/contact"
            className="bg-gray-900 border border-white text-white hover:bg-gray-800 font-semibold px-6 py-3 rounded-xl shadow transition"
          >
            Book a Call
          </Link>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center p-6 border rounded-2xl shadow-sm hover:shadow-lg transition"
    >
      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-pink-100 text-pink-600 mb-4">
        {icon}
      </div>
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="mt-2 text-gray-600">{text}</p>
    </motion.div>
  );
}