import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = 'nodejs';

// Initialize Stripe only if secret key is available
let stripe: Stripe | null = null;
if (process.env.STRIPE_SECRET_KEY) {
  try {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
      apiVersion: "2024-06-20",
    });
  } catch (error) {
    console.warn("Stripe initialization failed:", error);
  }
}

export async function POST(req: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe not configured. Please set STRIPE_SECRET_KEY environment variable." },
        { status: 500 }
      );
    }

    const body = await req.json();

    const { garage, service, amount, customer } = body;

    if (!garage || !service || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${service} - ${garage}`,
            },
            unit_amount: Math.round(amount * 100), // amount in pence
          },
          quantity: 1,
        },
      ],
      customer_email: customer?.email,
      metadata: {
        garage,
        service,
        name: customer?.name || "",
        phone: customer?.phone || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe Checkout Error:", err);
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
