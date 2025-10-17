"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  // Hide nav links on the partnership page
  const hideNav = pathname === "/partnership";

  return (
    <header className="w-full py-4 flex justify-between items-center px-8">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-pink-600">
        TorqueSites
      </Link>

      {/* Navigation (hidden on /partnership) */}
      {!hideNav && (
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="/pricing" className="hover:text-pink-600">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-pink-600">
            Contact
          </Link>
        </nav>
      )}
    </header>
  );
}

