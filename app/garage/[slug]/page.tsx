'use client';

import garageData from "@/components/garageData";

export default function GaragePage({ params }: { params: { slug: string } }) {
  const data = garageData[params.slug];

  if (!data) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Garage not found</h1>
        <p className="mt-2 text-gray-600">
          The garage "{params.slug}" doesn’t exist.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* HERO + INFO */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:flex lg:justify-between gap-10">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {data.heroLine}
          </h1>
          <p className="text-lg text-gray-600 mb-6">{data.address}</p>
          <p className="text-gray-700 mb-4">📞 {data.phone}</p>
        </div>

        {/* Booking Form */}
        <form
          className="bg-white shadow rounded-lg p-6 w-full max-w-md mt-10 lg:mt-0"
          onSubmit={(e) => {
            e.preventDefault();
            alert(`Booking request sent to ${data.name} 🚗`);
          }}
        >
          <h2 className="text-lg font-semibold mb-4">Quick booking</h2>
          <select className="w-full border rounded p-2 mb-3">
            {data.services.map((s: any, i: number) => (
              <option key={i}>{s.name} ({s.price})</option>
            ))}
          </select>
          <button className="w-full bg-yellow-500 text-white py-2 rounded font-semibold hover:bg-yellow-600">
            Book Now
          </button>
        </form>
      </section>
    </main>
  );
}
