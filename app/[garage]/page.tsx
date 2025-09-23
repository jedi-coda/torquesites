'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import garageData from '@/components/garageData';

// Hero image options
const HEROES = [
  { key: 'customer', src: '/customer.jpg', label: 'Customer' },
  { key: 'tech', src: '/tech.jpg', label: 'Tech' },
  { key: 'prestige', src: '/prestige.jpg', label: 'Prestige' },
];

export default function GaragePage() {
  const params = useParams();
  const garage = (params?.garage ?? '') as string;

  const data: any = (garageData as any)[garage];
  const [heroIndex, setHeroIndex] = useState(0);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Garage not found</h1>
          <p className="text-gray-600 mt-2">The garage “{garage}” doesn’t exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="font-sans text-gray-900">
      {/* HERO */}
      <section className="relative h-[60vh] overflow-hidden text-white flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={HEROES[heroIndex].key}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HEROES[heroIndex].src})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            Welcome to {data.name}
          </h1>
          <p className="text-lg md:text-xl mb-6">{data.heroLine}</p>
          <div className="flex gap-4 justify-center">
            <a
              href="#booking"
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg shadow transition"
            >
              Book your MOT
            </a>
            <a
              href={`tel:${data.phone}`}
              className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-3 rounded-lg shadow transition"
            >
              Call us
            </a>
          </div>
        </div>

        {/* Hero selector dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-6">
          {HEROES.map((h, idx) => (
            <button key={h.key} onClick={() => setHeroIndex(idx)} className="group relative">
              <span className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 rounded bg-black/70 px-2 py-1 text-[11px] text-white opacity-0 transition group-hover:opacity-100">
                {h.label}
              </span>
              <span
                className={`block h-3 w-3 rounded-full transition ${
                  heroIndex === idx ? 'bg-pink-500 scale-125' : 'bg-white/70 hover:bg-white'
                }`}
              />
            </button>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-10">Our Services</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
          {data.services.map((s: any, i: number) => (
            <div
              key={`${s.name}-${i}`}
              className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition"
            >
              <div className="text-pink-600 text-2xl mb-3 flex items-center justify-center">
                {s.icon}
              </div>
              <h3 className="font-semibold mb-1">{s.name}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-16">
        <h2 className="text-2xl font-semibold text-center mb-8">
          Why Choose {data.name}?
        </h2>
        <ul className="max-w-3xl mx-auto text-center space-y-3 text-gray-700 px-6">
          <li>✅ Local & independent — no middlemen</li>
          <li>✅ Instant online booking confirmation</li>
          <li>✅ Transparent pricing — no hidden fees</li>
          <li>✅ Friendly, family-run service</li>
        </ul>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-16 bg-gray-50">
        <h2 className="text-2xl font-semibold text-center mb-8">Book Your MOT Online</h2>
        <form className="max-w-md mx-auto bg-white p-6 rounded-xl shadow space-y-4">
          <input type="text" placeholder="Your Name" className="w-full border rounded-lg px-4 py-3" />
          <input type="text" placeholder="Vehicle Registration" className="w-full border rounded-lg px-4 py-3" />
          <input type="date" className="w-full border rounded-lg px-4 py-3" />
          <button type="submit" className="w-full bg-pink-600 text-white py-3 rounded-lg shadow hover:bg-pink-700 transition">
            Confirm Booking
          </button>
          <p className="text-center text-xs text-gray-400">Powered by MOTgenie 🚀</p>
        </form>
      </section>

      {/* CONTACT */}
      <section className="py-16">
        <h2 className="text-2xl font-semibold text-center mb-8">Contact Us</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-6">
          <div className="space-y-2">
            <p><strong>Phone:</strong> {data.phone}</p>
            {data.email && (
              <p>
                <strong>Email:</strong>{' '}
                <a href={`mailto:${data.email}`} className="text-pink-600 hover:underline">
                  {data.email}
                </a>
              </p>
            )}
            <p><strong>Address:</strong> {data.address}</p>
            <div className="mt-2">
              <strong>Opening Hours:</strong>
              <ul className="text-gray-700 list-disc ml-5">
                {'monFri' in data.hours && <li>Mon–Fri: {data.hours.monFri}</li>}
                {'sat' in data.hours && <li>Sat: {data.hours.sat}</li>}
                {'sun' in data.hours && <li>Sun: {data.hours.sun}</li>}
              </ul>
            </div>
          </div>

          <iframe
            src={data.mapEmbed}
            className="w-full h-64 md:h-full rounded-xl border-0 shadow"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white text-center py-6">
  <p>© {new Date().getFullYear()} {data.name}</p>
  <div className="flex justify-center items-center gap-2 mt-2">
    {data.logo && (
      <img
        src={data.logo}
        alt={`${data.name} logo`}
        className="h-6 object-contain"
      />
    )}
    <span className="text-sm text-gray-400">Powered by MOTgenie 🚀</span>
  </div>
</footer>

    </main>
  );
}

