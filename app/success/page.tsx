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
    <main className="flex flex-col items-center justify-center min-h-screen bg-green-50 text-center px-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-lg w-full">
        {loading ? (
          <h1 className="text-2xl font-bold text-gray-700">Loading booking details...</h1>
        ) : details ? (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-4">
              ✅ Booking Confirmed!
            </h1>
            <p className="text-lg text-gray-700 mb-6">
              Thank you for booking your <strong>{details.service}</strong> at{" "}
              <strong>{details.garage}</strong>. <br />
              {details.amount_total && (
                <>Your payment of <strong>£{details.amount_total}</strong> was received.</>
              )}{" "}
              A confirmation email has been sent to your inbox.
            </p>
          </>
        ) : (
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your booking. A confirmation email has been sent to your inbox.
          </p>
        )}

        <Link
          href="/"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}


