"use client";

import { useEffect, useState } from "react";
import { telLink, stripeLink } from "@/lib/links";

export default function StickyActions(props: { slug: string; phone?: string; brand?: { primary?: string; secondary?: string }; starterHref?: string }) {
  const { slug, phone, brand, starterHref } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const href = stripeLink(starterHref);

  if (!visible) return null;

  return (
    <div className="full-bleed sticky bottom-0 z-40 bg-neutral-900/90 backdrop-blur px-fluid py-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            if (href && href !== "#enquiry") {
              window.open(href, "_blank", "noopener,noreferrer");
            } else {
              const el = document.getElementById("booking");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className={slug === 'gem' ? "btn-primary" : "rounded-full px-5 py-3 font-semibold shadow-md hover:brightness-95 focus-visible:outline-2 focus-visible:outline-white/80"}
          style={slug === 'gem' ? {} : { backgroundColor: 'var(--ts-accent)', color: 'var(--ts-contrast)' }}
        >
          Book MOT now
        </button>
        {phone && (
          <a
            href={telLink(phone)}
            className={slug === 'gem' ? "btn-ghost" : "rounded-full px-5 py-3 font-semibold border border-white/20 dark:border-white/10 text-white hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-white/80"}
          >
            Call {phone}
          </a>
        )}
        <a
          href="/partnership"
          className={slug === 'gem' ? "btn-secondary" : "rounded-full px-5 py-3 text-sm font-medium border border-white/20 dark:border-white/10 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white/80"}
        >
          Secure partner slot
        </a>
      </div>
    </div>
  );
}


