import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  message?: string;
};

export async function POST(req: Request) {
  const data = (await req.json().catch(() => ({}))) as ContactPayload;

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
  const RESEND_API_KEY = process.env.RESEND_API_KEY;

  const haveSupabase = !!SUPABASE_URL && !!SUPABASE_ANON_KEY;
  const haveResend = !!RESEND_API_KEY;

  // If no integrations configured, accept the request so the site can build/deploy.
  if (!haveSupabase && !haveResend) {
    return NextResponse.json(
      {
        ok: true,
        delivered: false,
        stored: false,
        note: "Contact pipeline disabled (missing env vars).",
        echo: data,
      },
      { status: 200 }
    );
  }

  // Optionally store in Supabase (lazy import so build doesn't require envs)
  let stored = false;
  if (haveSupabase) {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!);
    try {
      const { error } = await supabase.from("contacts").insert({
        name: data.name ?? null,
        email: data.email ?? null,
        message: data.message ?? null,
        created_at: new Date().toISOString(),
      });
      if (!error) stored = true;
    } catch {}
  }

  // Optionally send via Resend (also lazy)
  let delivered = false;
  if (haveResend) {
    const { Resend } = await import("resend");
    const resend = new Resend(RESEND_API_KEY!);
    try {
      await resend.emails.send({
        from: "noreply@your-domain.example",
        to: ["you@example.com"],
        subject: New contact: ,
        text: Email: \n\n,
      });
      delivered = true;
    } catch {}
  }

  return NextResponse.json({ ok: true, stored, delivered }, { status: 200 });
}
