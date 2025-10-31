// Create a new file at `app/api/debug-env/route.ts`.
// This is a diagnostic endpoint to confirm if `STRIPE_SECRET_KEY` is being injected into process.env at runtime.
// Paste this content into the file:

export const runtime = "nodejs";

export async function GET() {
  const keys = Object.keys(process.env).filter(k => k.includes("STRIPE"));
  return Response.json({
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY ? "✅ loaded" : "❌ missing",
    runtime: process.env.NEXT_RUNTIME || "unknown",
    nodeEnv: process.env.NODE_ENV,
    cwd: process.cwd(),
    keys,
  });
}

// Commit as: `debug: add diagnostic env probe to /api/debug-env`

