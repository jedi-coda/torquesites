"use client";

import { useState } from "react";

export default function EnquiryForm({
  garageName,
  toEmail,
  brandPrimary = "#1F4FC9",
}: {
  garageName: string;
  toEmail: string;         // where you want the email to go
  brandPrimary?: string;   // used for button colour
}) {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const data = Object.fromEntries(fd.entries());

    // Minimal "works nowâ€ behaviour: open mailto
    const subject = encodeURIComponent(`New enquiry — ${garageName}`);
    const body = encodeURIComponent(
      `Name: ${data.name ?? ""}\nPhone: ${data.phone ?? ""}\nEmail: ${data.email ?? ""}\nService: ${data.service ?? ""}\nNotes: ${data.notes ?? ""}`
    );
    window.location.href = `mailto:${toEmail}?subject=${subject}&body=${body}`;

    setSubmitting(false);
    form.reset();
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <input name="name" className="w-full rounded-lg border px-3 py-2" placeholder="Your name" />
      <input name="phone" className="w-full rounded-lg border px-3 py-2" placeholder="Phone" />
      <input name="email" className="w-full rounded-lg border px-3 py-2" placeholder="Email (optional)" />
      <select name="service" className="w-full rounded-lg border px-3 py-2" defaultValue="MOT">
        <option value="MOT">MOT</option>
        <option value="Interim Service">Interim Service</option>
        <option value="Full Service">Full Service</option>
        <option value="Diagnostics">Diagnostics</option>
      </select>
      <textarea name="notes" className="w-full rounded-lg border px-3 py-2" placeholder="Notes (optional)" rows={4} />
      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg px-4 py-2 font-semibold text-white"
        style={{ backgroundColor: brandPrimary }}
      >
        {submitting ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
