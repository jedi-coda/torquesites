// lib/stripe.ts
// Stripe checkout utility for B2B pricing packages

export async function handleCheckout(priceId: string) {
  // Safety check: Validate priceId format
  if (!priceId || typeof priceId !== 'string' || !priceId.startsWith('price_')) {
    console.error("[CHECKOUT] Invalid priceId provided:", priceId);
    alert("Invalid pricing configuration. Please contact support.");
    return;
  }

  try {
    console.log("[CHECKOUT] Initiating checkout for priceId:", priceId);
    
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error("[CHECKOUT] API error response:", {
        status: res.status,
        statusText: res.statusText,
        data
      });
      const errorMsg = data?.details || data?.error || "Checkout failed";
      alert(`Checkout error: ${errorMsg}`);
      return;
    }

    if (data?.url) {
      console.log("[CHECKOUT] Opening Stripe checkout in new tab:", data.url);
      window.open(data.url, '_blank', 'noopener,noreferrer');
    } else {
      console.error("[CHECKOUT] Missing checkout URL in response:", data);
      alert("Checkout session created but no redirect URL received. Please contact support.");
    }
  } catch (err: any) {
    console.error("[CHECKOUT] Network or parsing error:", {
      message: err.message,
      name: err.name
    });
    alert(`Network error: ${err.message || "Failed to connect to checkout service"}`);
  }
}

