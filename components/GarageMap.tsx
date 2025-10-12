"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  borderColor?: string;
  height?: number;
  lat?: number;
  lng?: number;
};

export default function GarageMap({ src, borderColor, height = 350, lat, lng }: Props) {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const isApple = typeof navigator !== "undefined" && /iP(hone|ad|od)|Mac/.test(navigator.userAgent);
  const hasGeo = typeof lat === "number" && typeof lng === "number" && !!lat && !!lng;
  const directionsHref = hasGeo
    ? isApple
      ? `https://maps.apple.com/?daddr=${lat},${lng}`
      : `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`
    : undefined;

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl overflow-hidden border"
      style={{ borderColor: borderColor || "rgba(0,0,0,0.06)" }}
    >
      {inView && (
        <iframe
          src={src}
          width="100%"
          height={height}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          style={{ border: 0 }}
        />
      )}
      {directionsHref && (
        <div className="p-3 border-t bg-white/80 flex justify-end">
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold px-3 py-1.5 rounded-lg border hover:bg-neutral-50"
          >
            Get Directions
          </a>
        </div>
      )}
    </div>
  );
}


