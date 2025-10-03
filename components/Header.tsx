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
    <header className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl text-pink-600">
          TorqueSites
        </Link>
        <div className="flex gap-6">
          <Link href="/pricing" className="hover:opacity-70">Pricing</Link>
          <Link href="/contact" className="hover:opacity-70">Contact</Link>
        </div>
      </nav>
    </header>
  );
}

