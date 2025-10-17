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
  priceId?: string;
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
      if (url) window.location.href = url;
      else alert("Booking failed. Please try again.");
    } catch (err) {
      console.error("Booking error:", err);
      alert("Booking failed. Please try again.");
      setLoading(false);
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
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center py-28 px-6 max-w-3xl mx-auto">
          <Image
            src={data.logo}
            alt={data.name}
            width={180}
            height={90}
            className="mx-auto mb-6 drop-shadow-lg"
          />
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            {data.heroLine}
          </h1>
          <p className="mt-4 text-lg font-medium">{data.address}</p>
        </div>
      </section>

      {/* HOURS + BOOKING */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Quick booking form */}
        <div className="p-8 border rounded-2xl shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Quick booking</h2>
          <form className="space-y-4" onSubmit={handleBooking}>
            <input placeholder="Your name" className="w-full border p-3 rounded-lg" />
            <input placeholder="Phone" className="w-full border p-3 rounded-lg" />
            <input
              placeholder="Vehicle Reg (e.g. AB12 CDE)"
              className="w-full border p-3 rounded-lg"
            />
            <select
              name="service"
              className="w-full border p-3 rounded-lg font-medium"
            >
              {data.services.map((s, i) => (
                <option key={i}>
                  {s.name} {s.price ? ` (£${s.price.toFixed(2)})` : ""}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={loading}
              className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg w-full text-lg font-semibold transition disabled:opacity-50"
            >
              {loading ? "Redirecting..." : "Pay & Book"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Or call us directly:{" "}
            <span className="font-semibold text-gray-800">{data.phone}</span>
          </p>
        </div>

        {/* Opening hours */}
        <div className="p-8 border rounded-2xl shadow-lg bg-white">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Opening hours</h2>
          <ul className="space-y-2">
            {data.hours.map((h, i) => (
              <li
                key={i}
                className="flex justify-between text-sm md:text-base border-b pb-1"
              >
                <span className="font-medium">{h.day}</span>
                <span className="text-gray-700">
                  {h.open} {h.close && `– ${h.close}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-900">
          Our services
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {data.services.map((s, i) => (
            <div
              key={i}
              className="p-6 border rounded-2xl shadow-md bg-white hover:shadow-xl transition"
            >
              <Image
                src={s.image}
                alt={s.name}
                width={350}
                height={200}
                className="mx-auto mb-4 rounded-lg object-cover"
              />
              <h3 className="font-bold text-lg text-gray-800">{s.name}</h3>
              <p className="text-gray-600 mt-2 text-sm">{s.desc}</p>
              {s.price && (
                <p className="mt-4 text-pink-600 font-semibold text-lg">
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