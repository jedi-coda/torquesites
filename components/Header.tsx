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
    <header className="header-brand">
      <nav className="header-nav">
        <Link href="/" className="header-logo">
          <span className="logo-text">TorqueSites</span>
          <p className="logo-tagline">Performance websites for UK garages</p>
        </Link>
        <div className="header-nav-links">
          <Link href="#pricing" className="nav-link">Pricing</Link>
          <Link href="#contact" className="nav-link">Book a Call</Link>
        </div>
      </nav>
    </header>
  );
}

