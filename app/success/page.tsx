"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type BookingDetails = {
  garage: string;
  service: string;
  amount_total?: number;
  currency?: string;
};

export default function SuccessPage() {
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

        if (data.error) throw new Error(data.error);

        setDetails({
          garage: data.garage || "Unknown Garage",
          service: data.service || "Unknown Service",
          amount_total: data.amount_total,
          currency: data.currency,
        });
      } catch (err) {
        console.error("Error fetching session:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  if (loading) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-semibold">Loading your booking...</h1>
      </main>
    );
  }

  if (!details) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-semibold">Booking not found</h1>
        <Link href="/" className="mt-4 text-pink-600 underline">
          Go back home
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <h1 className="text-4xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-4 text-gray-700 text-lg">
        Thank you for booking with <strong>MOT Match</strong>.
      </p>

      <div className="mt-6 border rounded-lg shadow p-6 max-w-md bg-white">
        <h2 className="font-semibold text-xl">{details.garage}</h2>
        <p className="mt-2">{details.service}</p>
        {details.amount_total && (
          <p className="mt-2 text-lg font-bold">
            {details.currency?.toUpperCase()}{" "}
            {(details.amount_total / 100).toFixed(2)}
          </p>
        )}
      </div>

      <Link
        href="/"
        className="mt-8 inline-block bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-700"
      >
        Back to Home
      </Link>
    </main>
  );
}
