"use client";

import { useState } from "react";

export default function GaragePage({ params }: any) {
  const { slug } = params;

  // Mock garage data (later from Supabase / DB)
  const garageData: any = {
    newtown: {
      name: "Newtown Garage Chesham",
      tagline: "Your trusted local garage for MOT & repairs",
      address: "456 High Street, Chesham, HP5 2BB",
      phone: "01494 77 22 77",
      email: "bookings@motmatch.co.uk",
      mapEmbed: "https://www.google.com/maps/embed?...",
      services: [
        { name: "MOT Test", price: 50, desc: "DVSA-approved MOT testing centre." },
        { name: "Full Service", price: 180, desc: "Comprehensive service with oil & filter." },
        { name: "Exhausts", price: 120, desc: "Supply & fitting of exhaust systems." },
      ],
    },
  };

  const data = garageData[slug];

  const [form, setForm] = useState({ name: "", phone: "", reg: "", service: "" });

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        garage: data.name,
        service: form.service,
        amount: data.services.find((s: any) => s.name === form.service)?.price * 100, // convert £ → pence
      }),
    });
    const { sessionId } = await res.json();
    const stripe = (await import("@stripe/stripe-js")).loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );
    (await stripe).redirectToCheckout({ sessionId });
  }

  return (
    <main className="font-sans text-gray-900">
      {/* HERO */}
      <section className="bg-gray-900 text-white text-center py-16">
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <p className="mt-2 text-lg">{data.tagline}</p>
        <button
          onClick={() => document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })}
          className="mt-6 px-6 py-3 bg-pink-600 rounded-xl shadow-lg"
        >
          Book Now
        </button>
      </section>

      {/* SERVICES */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.services.map((s: any, i: number) => (
            <div key={i} className="border rounded-xl p-4 shadow-sm">
              <h3 className="font-semibold text-lg">{s.name}</h3>
              <p className="text-gray-600">{s.desc}</p>
              <p className="mt-2 font-bold">£{s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="bg-gray-100 py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Book Online</h2>
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md space-y-4"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-2 rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border p-2 rounded"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Vehicle Registration"
            className="w-full border p-2 rounded"
            value={form.reg}
            onChange={(e) => setForm({ ...form, reg: e.target.value })}
            required
          />
          <select
            className="w-full border p-2 rounded"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            required
          >
            <option value="">Select Service</option>
            {data.services.map((s: any, i: number) => (
              <option key={i} value={s.name}>
                {s.name} (£{s.price})
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700"
          >
            Continue to Payment
          </button>
        </form>
      </section>

      {/* MAP */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Find Us</h2>
        <iframe
          src={data.mapEmbed}
          width="100%"
          height="300"
          className="rounded-xl border"
          loading="lazy"
        ></iframe>
        <p className="mt-4">{data.address}</p>
        <a href={`tel:${data.phone}`} className="text-pink-600 font-semibold block mt-1">
          {data.phone}
        </a>
        <a href={`mailto:${data.email}`} className="text-pink-600 block">
          {data.email}
        </a>
      </section>
    </main>
  );
}
