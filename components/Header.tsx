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
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-[#0a0a0a] to-[#111111] backdrop-blur-md opacity-95">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        
        {/* Brand */}
        <div className="flex flex-col gap-1">
          <Link href="/" className="text-[#C4FF00] font-bold text-lg hover:text-[#FF9500] transition duration-300">
            TorqueSites
          </Link>
          <span className="text-sm text-neutral-400 hover:text-[#C4FF00] transition duration-200">
            Performance websites for garages
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex gap-6">
          <Link href="#pricing" className="text-[#f5f5f5] hover:text-[#C4FF00] hover:drop-shadow-[0_0_6px_rgba(196,255,0,0.4)] transition duration-200">
            Pricing
          </Link>
          <Link href="#contact" className="text-[#f5f5f5] hover:text-[#C4FF00] hover:drop-shadow-[0_0_6px_rgba(196,255,0,0.4)] transition duration-200">
            Book a Call
          </Link>
        </nav>
      </div>
    </header>
  );
}

