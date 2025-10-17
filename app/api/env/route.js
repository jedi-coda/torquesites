export const runtime = "nodejs";       // ensure Node runtime (not Edge)
export const dynamic = "force-dynamic"; // don’t cache; always read env

export async function GET() {
  try {
    const mask = (v) =>
      v === undefined || v === null || v === "" ? "MISSING"
      : String(v).replace(/^https?:\/\/buy\.stripe\.com\//, "stripe:");

    const body = {
      nodeEnv: process.env.NODE_ENV,
      hasProcess: typeof process !== "undefined",
      publicStarter:  mask(process.env.NEXT_PUBLIC_STRIPE_LINK_PUBLIC_STARTER),
      publicBuyout:   mask(process.env.NEXT_PUBLIC_STRIPE_LINK_PUBLIC_BUYOUT),
      partnerStarter: mask(process.env.NEXT_PUBLIC_STRIPE_LINK_PARTNER_STARTER),
      partnerBuyout:  mask(process.env.NEXT_PUBLIC_STRIPE_LINK_PARTNER_BUYOUT),
    };

    return new Response(JSON.stringify(body, null, 2), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err), stack: String(err?.stack ?? "") }, null, 2),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}
