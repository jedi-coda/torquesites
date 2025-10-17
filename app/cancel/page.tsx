"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BookingDetails = {
  garage: string;
  service: string;
  garageSlug?: string; // so we can deep-link back to microsite
};

export default function CancelPage() {
  const [details, setDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("session_id");

      if (!sessionId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/session?session_id=${sessionId}`);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Error fetching session:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-center px-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full">
        {loading ? (
          <h1 className="text-2xl font-bold text-gray-700">Loading booking details...</h1>
        ) : details ? (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Booking Cancelled</h1>
            <p className="text-lg text-gray-700 mb-6">
              Your booking for <strong>{details.service}</strong> at{" "}
              <strong>{details.garage}</strong> wasn’t completed.
              <br />
              You can try again now or contact the garage directly.
            </p>
            <div className="flex flex-col gap-4 mt-6">
              <Link
                href={`/garage/${details.garageSlug || ""}`}
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow transition"
              >
                🔄 Book Again
              </Link>
              <Link
                href="/"
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold shadow transition"
              >
                Back to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-4">❌ Booking Cancelled</h1>
            <p className="text-lg text-gray-700 mb-6">
              Your booking wasn’t completed. Don’t worry — you can try again anytime.
            </p>
            <Link
              href="/"
              className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold shadow transition"
            >
              Back to Home
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
