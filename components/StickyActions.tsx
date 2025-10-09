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
      <div className="pointer-events-auto backdrop-blur-0 bg-neutral-950/8 dark:bg-white/6 border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,.08)] rounded-2xl px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => {
            if (href && href !== "#enquiry") {
              window.open(href, "_blank", "noopener,noreferrer");
            } else {
              const el = document.getElementById("booking");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className="rounded-lg px-5 py-3 font-semibold shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ backgroundColor: 'var(--ts-accent)', color: 'var(--ts-contrast)' }}
        >
          Book MOT now
        </button>
        {phone && (
          <a
            href={telLink(phone)}
            className="rounded-lg px-5 py-3 font-semibold border hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: 'var(--ts-border)' }}
          >
            Call {phone}
          </a>
        )}
      </div>
    </div>
  );
}


