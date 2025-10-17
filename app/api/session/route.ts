import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-06-20",
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      garage: session.metadata?.garage,
      service: session.metadata?.service,
      amount_total: session.amount_total,
      currency: session.currency,
    });
  } catch (err: any) {
    console.error("Error retrieving session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
