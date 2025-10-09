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
    <div className="fixed inset-x-4 bottom-4 md:bottom-6 z-30 pointer-events-none">
      <div className="pointer-events-auto bg-white/65 dark:bg-black/40 backdrop-saturate-100 border border-white/30 dark:border-white/10 shadow-lg/20 rounded-2xl px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => {
            if (href && href !== "#enquiry") {
              window.open(href, "_blank", "noopener,noreferrer");
            } else {
              const el = document.getElementById("booking");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="rounded-full px-5 py-3 font-semibold shadow-md hover:brightness-95 focus-visible:outline-2 focus-visible:outline-white/80"
          style={{ backgroundColor: 'var(--ts-accent)', color: 'var(--ts-contrast)' }}
        >
          Book MOT now
        </button>
        {phone && (
          <a
            href={telLink(phone)}
            className="rounded-full px-5 py-3 font-semibold border border-white/20 dark:border-white/10 text-white hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-white/80"
          >
            Call {phone}
          </a>
        )}
      </div>
    </div>
  );
}


