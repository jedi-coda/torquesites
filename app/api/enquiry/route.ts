import { NextResponse } from "next/server";
import { loadGarage } from "@/lib/garage";

type Payload = {
  name?: string;
  phone?: string;
  email?: string;
  service?: string;
  message?: string;
  slug?: string;
  honeypot?: string;
};

const rateMap = new Map<string, number>();

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0] || "unknown";
  const body = (await req.json().catch(() => ({}))) as Payload;

  if (body.honeypot && body.honeypot.trim()) {
    return NextResponse.json({ ok: false, error: "spam" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const slug = (body.slug || "").trim();
  const email = (body.email || "").trim();
  const service = (body.service || "").trim();
  const message = (body.message || "").trim();

  if (!name || !phone || !slug) {
    return NextResponse.json({ ok: false, error: "Missing name, phone or slug" }, { status: 400 });
  }

  const key = `${ip}:${slug}`;
  const now = Date.now();
  const last = rateMap.get(key) || 0;
  if (now - last < 60_000) {
    return NextResponse.json({ ok: false, error: "Rate limited" }, { status: 429 });
  }
  rateMap.set(key, now);

  const garage = await loadGarage(slug);
  const toEmail = garage?.contact?.email || process.env.CONTACT_TO || "";

  // Optional Supabase insert
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      await supabase.from("enquiries").insert({
        slug,
        name,
        phone,
        email,
        service,
        message,
        created_at: new Date().toISOString(),
        ip,
      });
      /*
      -- SQL for table if missing
      create table if not exists public.enquiries (
        id uuid default gen_random_uuid() primary key,
        slug text,
        name text,
        phone text,
        email text,
        service text,
        message text,
        ip text,
        created_at timestamptz default now()
      );
      */
    } catch (e) {
      console.warn("[enquiry] Supabase insert failed", e);
    }
  }

  // Optional Resend email
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const CONTACT_FROM = process.env.CONTACT_FROM || "TorqueSites <hello@torquesites.co.uk>";
  const OPS_BCC = process.env.CONTACT_BCC || "";
  if (RESEND_API_KEY && toEmail) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);
      const toList = [toEmail].filter(Boolean);
      await resend.emails.send({
        from: CONTACT_FROM,
        to: toList,
        bcc: OPS_BCC ? [OPS_BCC] : undefined,
        subject: `New booking enquiry — ${garage?.name || slug}`,
        text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n\nMessage:\n${message}`,
      });
    } catch (e) {
      console.warn("[enquiry] Resend send failed", e);
    }
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}


