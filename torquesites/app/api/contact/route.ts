import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ Only safe in server-side
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to Supabase
    const { error: dbError } = await supabase.from("contacts").insert([
      { name, email, message }
    ]);

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

    // Send email via Resend
    await resend.emails.send({
      from: "TorqueSites <noreply@torquesites.com>",
      to: "youremail@example.com", // 📩 replace with your email
      subject: "New Partnership Request",
      html: `
        <h2>New TorqueSites Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
