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
    <header className="w-full bg-black/80 backdrop-blur-sm sticky top-0 z-40 border-b border-white/10" style={{ backdropFilter: 'blur(6px)', boxShadow: '0 0 12px rgba(0,0,0,0.25)' }}>
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          <div>
            <span className="text-[#C4FF00] font-semibold drop-shadow-[0_0_6px_rgba(196,255,0,0.5)]">
              TorqueSites
            </span>
            <p className="text-xs text-[#999] tracking-wide">
              Performance websites for garages
            </p>
          </div>
        </Link>
        <div className="flex gap-8">
          <Link href="#pricing" className="text-white hover:text-[#C4FF00] transition-colors duration-200 font-medium">Pricing</Link>
          <Link href="#contact" className="text-white hover:text-[#C4FF00] transition-colors duration-200 font-medium">Book a Call</Link>
        </div>
      </nav>
    </header>
  );
}

