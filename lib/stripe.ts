// lib/stripe.ts
// Stripe checkout utility for B2B pricing packages

export async function handleCheckout(priceId: string) {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ priceId }),
  });
  const data = await res.json();
  if (data?.url) {
    window.location.href = data.url;
  } else {
    alert("There was a problem starting checkout.");
  }
}

