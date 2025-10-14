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
    <div className="sticky bottom-0 z-40 backdrop-blur-md bg-black/60 ring-subtle pb-[env(safe-area-inset-bottom)]">
      <div className="container-page py-3 flex gap-3 justify-between md:justify-center">
        <button
          onClick={() => {
            if (href && href !== "#enquiry") {
              window.open(href, "_blank", "noopener,noreferrer");
            } else {
              const el = document.getElementById("booking");
              el?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          className={slug === 'gem' ? "btn-primary-gradient flex-1 md:flex-none" : "rounded-full px-4 py-2 text-sm font-semibold shadow-md hover:brightness-95 focus-visible:outline-2 focus-visible:outline-white/80 md:px-5 md:py-3 md:text-base"}
          style={slug === 'gem' ? {} : { backgroundColor: 'var(--ts-accent)', color: 'var(--ts-contrast)' }}
        >
          Book MOT now
        </button>
        {phone && (
          <a
            href={telLink(phone)}
            className={slug === 'gem' ? "btn-ghost" : "rounded-full px-3 py-2 text-xs font-semibold border border-white/20 dark:border-white/10 text-white hover:bg-white/18 focus-visible:outline-2 focus-visible:outline-white/80 md:px-4 md:py-2 md:text-sm"}
          >
            Call {phone}
          </a>
        )}
        <a
          href="/partnership"
          className={slug === 'gem' ? "btn-ghost" : "rounded-full px-3 py-2 text-xs font-medium border border-white/20 dark:border-white/10 text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white/80 md:px-4 md:py-2 md:text-sm"}
        >
          Secure partner slot
        </a>
      </div>
    </div>
  );
}


