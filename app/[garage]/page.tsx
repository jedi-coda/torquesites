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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reg, setReg] = useState("");
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
    if (!service) {
      alert("Please select a service");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          garage: data.name,
          service: service.name,
          amount: service.price * 100, // convert £ to pence
          customer: { name, phone, reg },
        }),
      });

      const session = await res.json();

      if (!session.id) {
        throw new Error("No session ID returned");
      }

      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({ sessionId: session.id });
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="font-sans text-gray-900">
      {/* HERO */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${data.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6">
          <img src={data.logo} alt={data.name} className="h-24 mb-4" />
          <h1 className="text-4xl font-bold">{data.heroLine}</h1>
          <p className="mt-2 text-lg">{data.address}</p>
          <p className="mt-1">{data.phone}</p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {data.services.map((s: any, idx: number) => (
          <div
            key={idx}
            className={`border p-6 rounded-xl shadow cursor-pointer ${
              service?.name === s.name ? "border-pink-600" : "border-gray-300"
            }`}
            onClick={() => setService(s)}
          >
            <h3 className="text-xl font-semibold">{s.name}</h3>
            <p className="mt-2 text-gray-600">{s.desc}</p>
            <p className="mt-4 font-bold">£{s.price}</p>
          </div>
        ))}
      </section>

      {/* BOOKING FORM */}
      <section className="py-12 bg-gray-50 px-6 flex justify-center">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">Book Online</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border p-3 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border p-3 rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="Vehicle Reg"
              className="w-full border p-3 rounded"
              value={reg}
              onChange={(e) => setReg(e.target.value)}
            />
            <select
              className="w-full border p-3 rounded"
              value={service?.name || ""}
              onChange={(e) =>
                setService(data.services.find((s: any) => s.name === e.target.value))
              }
            >
              <option value="">Select Service</option>
              {data.services.map((s: any, idx: number) => (
                <option key={idx} value={s.name}>
                  {s.name} (£{s.price})
                </option>
              ))}
            </select>

            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-pink-600 text-white py-3 rounded-lg font-semibold hover:bg-pink-700 transition"
            >
              {loading ? "Processing..." : "Continue to Payment"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}



