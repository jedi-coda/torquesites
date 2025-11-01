"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DEMO_SLUGS = ["gem", "swift-motors", "newtown-garage"];

export default function Header() {
  const pathname = usePathname();
  const first = (pathname || "/").split("/").filter(Boolean)[0] || "";
  const isDemo = DEMO_SLUGS.includes(first);

  if (isDemo) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-black/70 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          <span className="text-[#C4FF00] font-semibold drop-shadow-[0_0_6px_rgba(196,255,0,0.5)]">
            TorqueSites
          </span>
          <p className="text-xs text-neutral-400 tracking-wide">
            Performance websites for garages
          </p>
        </Link>
        <div className="flex gap-8">
          <Link href="#pricing" className="text-white hover:text-[#C4FF00] transition-colors duration-200 font-medium">Pricing</Link>
          <Link href="#contact" className="text-white hover:text-[#C4FF00] transition-colors duration-200 font-medium">Book a Demo</Link>
        </div>
      </div>
    </header>
  );
}

