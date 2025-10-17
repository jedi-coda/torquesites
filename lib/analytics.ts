export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    const posthogKey = (process.env.NEXT_PUBLIC_POSTHOG_KEY || "").trim();
    const plausibleDomain = (process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "").trim();
    if (posthogKey && (window as any).posthog) {
      (window as any).posthog.capture(event, props || {});
      return;
    }
    if (plausibleDomain && (window as any).plausible) {
      (window as any).plausible(event, { props: props || {} });
      return;
    }
  } catch {}
}


