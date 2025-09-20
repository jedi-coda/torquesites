"use client";

import Image from "next/image";
import { useState } from "react";

type GarageData = {
  name: string;
  phone: string;
  emailFallback: string;
  address: string;
  heroLine: string;
  heroImage: string;
  colors: { primary: string; secondary: string };
  logo: string;
  services: { name: string; desc: string; image: string; price?: number }[];
  hours: { day: string; open: string; close: string }[];
  priceId?: string; // Stripe priceId
};

export default function GarageMicrosite({ data }: { data: GarageData }) {
  const [loading, setLoading] = useState(false);

  if (!data) return <p>Garage not found</p>;

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const service = formData.get("service") as string;

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-garage": data.name,
        },
        body: JSON.stringify({
          priceId: data.priceId,
          service,
        }),
      });

      const { url } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        setLoading(false);
        alert("Booking failed. Please try again.");
      }
    } catch (err) {
      console.error("Booking error:", err);
      setLoading(false);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <main className="font-sans text-gray-900">
      {/* HERO */}
      <section className="relative text-white">
        <Image
          src={data.heroImage}
          alt={`${data.name} hero`}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center py-32 px-6">
          <Image
            src={data.logo}
            alt={data.name}
            width={180}
            height={90}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-lg">
            {data.heroLine}
          </h1>
          <p className="mt-4 text-lg font-medium">{data.address}</p>
        </div>
      </section>

      {/* HOURS + BOOKING */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Quick booking form */}
        <div className="p-6 border rounded-xl shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">Quick booking</h2>
          <form className="space-y-3" onSubmit={handleBooking}>
            <input
              placeholder="Your name"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-500"
            />
            <input
              placeholder="Phone"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-500"
            />
            <input
              placeholder="Vehicle Reg (e.g. AB12 CDE)"
              className="w-full border p-2 rounded focus:ring-2 focus:ring-pink-500"
            />
            <select name="service" className="w-full border p-2 rounded">
              {data.services.map((s, i) => (
                <option key={i}>{s.name}</option>
              ))}
            </select>
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-lg w-full font-semibold disabled:opacity-50"
            >
              {loading ? "Redirecting..." : "Pay & Book"}
            </button>
          </form>
          <p className="mt-2 text-sm text-gray-600">Or call: {data.phone}</p>
        </div>

        {/* Opening hours */}
        <div className="p-6 border rounded-xl shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-4">Opening hours</h2>
          <ul>
            {data.hours.map((h, i) => (
              <li
                key={i}
                className="flex justify-between py-1 border-b text-sm text-gray-700"
              >
                <span>{h.day}</span>
                <span>
                  {h.open} {h.close && `– ${h.close}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Our services</h2>
        <div className="grid gap-8 md:grid-cols-3">
          {data.services.map((s, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl shadow-lg hover:shadow-xl transition bg-white text-center"
            >
              <Image
                src={s.image}
                alt={s.name}
                width={400}
                height={250}
                className="mx-auto mb-4 rounded-lg object-cover"
              />
              <h3 className="font-semibold text-xl text-gray-900">{s.name}</h3>
              <p className="text-gray-600 mt-2">{s.desc}</p>
              {s.price && (
                <p className="mt-4 text-green-600 font-bold text-lg">
                  £{s.price.toFixed(2)}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
