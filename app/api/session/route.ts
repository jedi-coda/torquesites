import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    // Retrieve the full checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items", "line_items.data.price.product"],
    });

    return NextResponse.json({
      id: session.id,
      garage: session.metadata?.garage || "Unknown Garage",
      service: session.metadata?.service || "General Service",
      amount_total: session.amount_total ? session.amount_total / 100 : null, // in £
      currency: session.currency ? session.currency.toUpperCase() : "GBP",
    });
  } catch (err: any) {
    console.error("Error retrieving session:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

