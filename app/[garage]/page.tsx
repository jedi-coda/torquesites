"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import garageData from "@/components/garageData";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function GaragePage({ params }: any) {
  const { garage } = params;
  const data = garageData[garage];

  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  if (!data) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Garage not found</h1>
        <p className="mt-2 text-gray-600">
          The garage "{garage}" doesn’t exist.
        </p>
      </main>
    );
  }

  const handleCheckout = async () => {
    if (!service) return;
    setLoading(true);

    const stripe = await stripePromise;

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        garage,
        service: service.name,
        amount: service.price * 100,
      }),
    });

    const { sessionId } = await res.json();
    stripe?.redirectToCheckout({ sessionId });
    setLoading(false);
  };

  return (
    <main className="font-sans text-gray-900">
      {/* HERO */}
      <section
        className="relative text-white"
        style={{
          backgroundImage: `url(${data.heroImage})`,
          backgroundColor: data.colors.primary,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "#000", opacity: 0.5 }} />
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6">
          <img src={data.logo} alt={data.name} className="h-20 mb-4" />
          <h1 className="text-4xl font-bold">{data.name}</h1>
          <p className="mt-2 text-lg">{data.heroLine}</p>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section className="py-12 px-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Book a Service</h2>
        <select
          onChange={(e) =>
            setService(data.services.find((s: any) => s.name === e.target.value))
          }
          className="w-full border rounded p-3 mb-4"
        >
          <option value="">Select a service</option>
          {data.services.map((s: any) => (
            <option key={s.name} value={s.name}>
              {s.name} – £{s.price}
            </option>
          ))}
        </select>

        <button
          onClick={handleCheckout}
          disabled={!service || loading}
          style={{ backgroundColor: data.colors.primary, color: data.colors.secondary }}
          className="px-6 py-3 rounded-xl hover:opacity-90 disabled:bg-gray-400"
        >
          {loading ? "Redirecting..." : "Book Now & Pay"}
        </button>
      </section>

      {/* OPENING HOURS */}
      <section className="py-12 px-6" style={{ backgroundColor: data.colors.secondary }}>
        <h2 className="text-2xl font-semibold mb-4">Opening Hours</h2>
        <ul>
          {data.hours.map((h: string, i: number) => (
            <li key={i} className="py-1">
              {h}
            </li>
          ))}
        </ul>
      </section>

      {/* SERVICES GRID */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {data.services.map((s: any) => (
            <div
              key={s.name}
              className="rounded-xl shadow-md p-6 hover:shadow-lg transition"
              style={{ backgroundColor: data.colors.secondary }}
            >
              <img
                src={s.image}
                alt={s.name}
                className="h-32 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-bold">{s.name}</h3>
              <p className="text-gray-600">{s.desc}</p>
              <p className="mt-2 font-semibold">£{s.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        className="py-12 px-6 text-center"
        style={{ backgroundColor: data.colors.primary, color: data.colors.secondary }}
      >
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p>{data.address}</p>
        <p>
          <a href={`tel:${data.phone}`} className="underline">
            {data.phone}
          </a>
        </p>
        <p>
          <a href={`mailto:${data.emailFallback}`} className="underline">
            {data.emailFallback}
          </a>
        </p>
      </section>
    </main>
  );
}


