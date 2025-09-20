import { NextResponse } from "next/server";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("⚠️ Missing STRIPE_SECRET_KEY in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-06-20",
});

export async function POST(req: Request) {
  try {
    const { garage, service, amount } = await req.json();

    if (!garage || !service || !amount) {
      return NextResponse.json(
        { error: "Missing required fields (garage, service, amount)" },
        { status: 400 }
      );
    }

    console.log("Creating Stripe session:", { garage, service, amount });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: { name: `${garage} – ${service}` },
            unit_amount: amount, // amount already converted to pence on frontend
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/garage/${garage.toLowerCase()}`,
    });

    console.log("✅ Stripe session created:", session.id);

    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    console.error("❌ Stripe API error:", err.message);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: err.message },
      { status: 500 }
    );
  }
}
