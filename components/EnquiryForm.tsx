"use client";

import { useState } from "react";

export default function EnquiryForm({
  garageName,
  toEmail,
  brandPrimary = "#1F4FC9",
  garageSlug,
}: {
  garageName: string;
  toEmail: string;         // where you want the email to go
  brandPrimary?: string;   // used for button colour
  garageSlug?: string;     // to determine if we should use .btn classes
}) {
  const [submitting, setSubmitting] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          message: data.notes,
          slug: (typeof window !== "undefined" ? window.location.pathname.split("/")[1] : "") || "",
          honeypot: (data as any).company || "",
        }),
      });
      setOk(res.ok);
      if (res.ok) form.reset();
    } catch {
      setOk(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <input name="name" className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-black/10" placeholder="Your name" />
      <input name="phone" className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-black/10" placeholder="Phone" />
      <input name="email" className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-black/10" placeholder="Email (optional)" />
      {/* Honeypot */}
      <input name="company" className="hidden" tabIndex={-1} autoComplete="off" />
      <select name="service" className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm focus:ring-2 focus:ring-black/10" defaultValue="MOT">
        <option value="MOT">MOT</option>
        <option value="Interim Service">Interim Service</option>
        <option value="Full Service">Full Service</option>
        <option value="Diagnostics">Diagnostics</option>
      </select>
      <textarea name="notes" className="w-full rounded-lg border border-black/10 px-4 py-2.5 text-sm placeholder:text-black/40 focus:ring-2 focus:ring-black/10" placeholder="Notes (optional)" rows={4} />
      <button
        type="submit"
        disabled={submitting}
        className={garageSlug === 'gem' ? "btn-primary w-full" : "w-full rounded-lg px-4 py-2.5 font-medium text-white"}
        style={garageSlug === 'gem' ? {} : { backgroundColor: brandPrimary }}
      >
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
      {ok === true && <div className="text-green-600 text-sm">Thanks — we\'ll be in touch shortly.</div>}
      {ok === false && <div className="text-red-600 text-sm">Sorry, something went wrong. Please call or try again.</div>}
    </form>
  );
}
