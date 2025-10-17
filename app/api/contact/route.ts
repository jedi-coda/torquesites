// app/api/contact/route.ts
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (ch) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
      ch as "&" | "<" | ">" | '"' | "'"
    ] as string)
  );
}

export async function POST(req: Request) {
  // --- Parse & basic validation ---
  const data = (await req.json().catch(() => ({}))) as ContactPayload;
  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing name, email, or message." },
      { status: 400 }
    );
  }

  // --- Env flags ---
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  const CONTACT_FROM =
    process.env.CONTACT_FROM || "TorqueSites <hello@torquesites.co.uk>";
  const CONTACT_TO =
    process.env.CONTACT_TO || ""; // comma-separated list

  const haveSupabase = !!SUPABASE_URL && !!SUPABASE_ANON_KEY;
  const haveResend = !!RESEND_API_KEY && !!CONTACT_TO;

  // --- Supabase: store lead (optional) ---
  let stored = false;
  if (haveSupabase) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
      const { error } = await supabase.from("contacts").insert({
        name,
        email,
        message,
        created_at: new Date().toISOString(),
      });
      if (!error) stored = true;
    } catch (e) {
      console.error("Supabase insert error:", e);
    }
  }

  // --- Email via Resend (optional) ---
  let delivered = false;
  if (haveResend) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY!);

      const toList = CONTACT_TO.split(",").map((s) => s.trim()).filter(Boolean);
      const subject = `New partnership enquiry — ${name}`;

      const text = `Name: ${name}
Email: ${email}

Message:
${message}
`;

      const html = `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:16px;line-height:1.5;color:#111">
          <h2 style="margin:0 0 12px">New partnership enquiry</h2>
          <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p style="margin:12px 0 6px"><strong>Message:</strong></p>
          <pre style="white-space:pre-wrap;background:#f7f7f8;border:1px solid #eee;padding:12px;border-radius:8px">${escapeHtml(
            message
          )}</pre>
        </div>
      `;

      await resend.emails.send({
        from: CONTACT_FROM,
        to: toList,
        subject,
        text,
        html,
        replyTo: email, // helps you reply directly to the sender
      });

      delivered = true;
    } catch (e) {
      console.error("Resend send error:", e);
    }
  }

  // If neither is configured, still return ok so the UI doesn't error
  if (!haveSupabase && !haveResend) {
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        stored: false,
        note:
          "Contact pipeline disabled (missing RESEND/SUPABASE envs). Set RESEND_API_KEY + CONTACT_TO (and verify your domain) to enable email.",
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true, stored, delivered }, { status: 200 });
}