import dotenv from 'dotenv';
dotenv.config();

export const runtime = 'nodejs';

import { NextResponse } from "next/server";
import Stripe from "stripe";

let stripe: Stripe | null = null;
npm run dev 
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2023-10-16" as any,
    });
    console.log("[CHECKOUT] Stripe initialized ✅");
  } catch (err) {
    console.error("[CHECKOUT] Stripe init failed ❌", err);
  }
} else {
  console.error("[CHECKOUT] STRIPE_SECRET_KEY is missing ❌");
}

export async function POST(req: Request) {
  if (!stripe) {
    return NextResponse.json(
      { error: "Stripe not initialized" },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const priceId = body.priceId;

    if (!priceId || typeof priceId !== 'string' || !priceId.startsWith('price_')) {
      return NextResponse.json(
        { error: "Invalid priceId" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("[CHECKOUT] Session creation failed:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session", details: err.message },
      { status: 500 }
    );
  }
}
