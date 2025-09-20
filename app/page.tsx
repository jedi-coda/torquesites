'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function HomePage() {
  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    alert('Customer booking portal launching soon 🚀');
  };

  return (
    <main className="font-sans text-gray-900 scroll-smooth">
      {/* HERO */}
      <section className="relative text-white">
        <Image
          src="/images/hero-bg.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-32 px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="text-white">MOT</span>
            <span className="text-pink-500">match</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl leading-relaxed">
            Enterprise-grade tech, built for independents.
          </p>
          <p className="text-lg md:text-xl max-w-2xl mt-4 opacity-90 leading-relaxed">
            Keep your customers. Grow your business. Get paid instantly — without monopoly costs or middlemen.
          </p>
          <a
            href="#about"
            className="mt-8 bg-white text-blue-700 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold shadow transition text-lg"
          >
            Learn More ↓
          </a>
        </div>
      </section>

      {/* SEARCH */}
      <section className="bg-white py-16 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Find a trusted MOT garage near you
        </h2>
        <form onSubmit={handleSearch} className="flex justify-center items-center gap-2">
          <input
            type="text"
            placeholder="Enter postcode or reg..."
            className="border rounded-lg px-4 py-3 w-72 text-lg"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
          >
            Search
          </button>
        </form>
        <p className="text-base text-gray-500 mt-3">Customer booking portal launching soon 🚀</p>
      </section>

      {/* ABOUT US */}
      <section id="about" className="bg-gray-50 py-20 px-6 md:px-12 lg:px-24">
        <div className="mx-auto grid gap-16 md:grid-cols-2 items-center max-w-7xl">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">About MOTmatch</h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Garage owners are the backbone of our communities. They work long hours, build trust with
              customers, and keep Britain moving. Yet while they put in the graft, big aggregators skim
              commissions and take ownership of customer relationships.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              MOTmatch was created to put garages back in control. We know tech. You know cars. Together,
              we can build something fair: premium technology at fair prices — tools that help garages grow
              without being left behind.
            </p>
            <p className="text-lg leading-relaxed text-gray-700">
              Like Shopify did for retailers and Gymshark did for fitness, MOTmatch is a movement — built
              with independents, not against them. Your garage, your brand, your customers.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/garage.png"
              alt="Garage workshop"
              width={900}
              height={560}
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="mx-auto grid gap-16 md:grid-cols-2 items-center max-w-7xl">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The MOTmatch Solution</h2>
            <ul className="space-y-5 text-lg leading-relaxed text-gray-700">
              <li><strong>Branded Microsites</strong> — Your garage, your brand, your customers.</li>
              <li><strong>Direct Stripe Payouts</strong> — Get paid instantly, no middleman delays.</li>
              <li><strong>Built-in SEO</strong> — Be found locally without expensive ads.</li>
              <li><strong>AI-Lite Reminders</strong> — Keep customers coming back without complexity.</li>
            </ul>
          </div>
          <div className="flex justify-center order-1 md:order-2">
            <Image
              src="/images/solution-laptop.png"
              alt="MOTmatch booking demo"
              width={900}
              height={560}
              className="rounded-xl shadow-lg w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="bg-gray-50 py-20 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">Why join MOTmatch?</h2>
        <div className="grid gap-8 md:grid-cols-4 max-w-7xl mx-auto">
          <Feature title="Branded Microsites" desc="Your garage online in 3–5 days." />
          <Feature title="Instant Stripe Payouts" desc="Money goes straight to your account." />
          <Feature title="Customer Ownership" desc="Keep your data, build long-term loyalty." />
          <Feature title="Smart Reminders" desc="Automated MOT recalls, texts & reviews." />
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="bg-white py-20 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Showcase: Newtown Garage</h2>
          <Image
            src="/images/newtown-partnership.png"
            alt="Newtown Garage partnership"
            width={900}
            height={560}
            className="rounded-xl shadow-lg w-full h-auto object-cover mb-6"
          />
          <p className="mt-4 text-lg text-gray-700 leading-relaxed">
            “Our visibility jumped and the phone started ringing again. We keep our customer data and get paid instantly.”
          </p>
          <Link
            href="/garage/newtown"
            className="mt-6 inline-block bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow transition text-lg"
          >
            View Demo Microsite
          </Link>
        </div>
      </section>

      {/* THE ROAD AHEAD */}
      <section id="road-ahead" className="bg-gray-50 py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">The Road Ahead</h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-12">
            Enterprise-grade tech, built for independents.  
            We’re building MOTmatch with a simple promise: to give local garages 
            the same powerful tools as the big chains — without monopoly costs, 
            middlemen, or losing customer ownership.
          </p>
        </div>

        {/* Today */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">🚀 What’s Here Today</h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Feature title="Branded Microsites" desc="Your own online booking site, live in 3–5 days." />
            <Feature title="Instant Stripe Payouts" desc="Get paid directly, no delays, no commissions." />
            <Feature title="Smart Reminders" desc="MOT recalls & service reminders that keep customers loyal." />
            <Feature title="Local SEO Boost" desc="Be found where drivers are searching, without expensive ads." />
          </div>
        </div>

        {/* Next */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">🔮 What’s Next</h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Feature title="Garage Dashboards" desc="Track bookings, payments, and customer data all in one place." />
            <Feature title="Customer Accounts" desc="Drivers access MOT/service history & reminders online." />
            <Feature title="Automated Reviews" desc="Build trust with verified reviews sent automatically." />
            <Feature title="Live Chat & Messaging" desc="Stay connected with customers directly through your site." />
          </div>
        </div>

        {/* Future */}
        <div className="max-w-6xl mx-auto mb-16">
          <h3 className="text-2xl font-semibold mb-6 text-center">🌍 Future Vision</h3>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Feature title="Full Garage CRM" desc="Manage customers, vehicles, and workflows like the big chains." />
            <Feature title="AI-powered Insights" desc="Predict demand, optimise schedules, and reduce downtime." />
            <Feature title="Marketplace Tools" desc="Collaborate with fleets & insurers, but keep customer ownership." />
            <Feature title="Community Growth" desc="Independent garages sharing best practices & collective power." />
          </div>
        </div>

        <div className="max-w-4xl mx-auto text-center mt-16">
          <p className="text-xl text-gray-700 leading-relaxed font-medium">
            We’re not building a platform <em>over</em> you.  
            We’re building a platform <em>with</em> you.
          </p>
          <p className="mt-4 text-lg text-gray-600">
            MOTmatch grows as you grow — delivering enterprise-grade tools at fair prices, 
            so you can focus on what matters most: keeping customers happy and cars on the road.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="grow" className="bg-white py-20 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to grow with MOTmatch?</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="/pdfs/MOTmatch-Garage-Pack.pdf"
            download
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow transition text-lg"
          >
            Download Garage Pack
          </a>
          <a
            href="/pdfs/MOTmatch-Investor-Pack.pdf"
            download
            className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3 rounded-full font-semibold shadow transition text-lg"
          >
            Download Investor Pack
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-blue-900 text-white py-12 px-6 md:px-12 lg:px-24">
        <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-semibold mb-2">MOTmatch</h3>
            <p>Enterprise-grade tech for independent garages. Own your customers, increase bookings, and get paid instantly.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Company</h3>
            <p>
              MOTmatch Ltd<br />
              Level 39, One Canada Square<br />
              Canary Wharf, London, E14 5AB<br />
              Company No: 16722869
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p>info@motmatch.co.uk</p>
            <p>+44 (0)20 1234 5678</p>
          </div>
        </div>

        {/* Links Row with Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link
            href="/"
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold shadow transition text-lg"
          >
            Home
          </Link>
          <Link
            href="/v1"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow transition text-lg"
          >
            Demo v1
          </Link>
          <Link
            href="/v2"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow transition text-lg"
          >
            Demo v2
          </Link>
          <Link
            href="/v3"
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow transition text-lg"
          >
            Demo v3
          </Link>
          <a
            href="/pdfs/MOTmatch-Garage-Pack.pdf"
            download
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow transition text-lg"
          >
            Garage Pack
          </a>
          <a
            href="/pdfs/MOTmatch-Investor-Pack.pdf"
            download
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow transition text-lg"
          >
            Investor Pack
          </a>
        </div>

        <p className="text-center text-sm mt-8">
          © {new Date().getFullYear()} MOTmatch. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

/* ---- Small UI helper ---- */
function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 bg-white shadow-md rounded-xl">
      <h3 className="font-semibold text-xl">{title}</h3>
      <p className="text-gray-600 mt-3 text-base leading-relaxed">{desc}</p>
    </div>
  );
}

