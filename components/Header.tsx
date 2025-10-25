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
    <header className="site-header refined-header">
      <div className="header-container">
        {/* Brand */}
        <div className="header-brand">
          <span className="brand-glow-bg"></span>
          <Link href="/" className="brand-name hover-transition">TorqueSites</Link>
          <span className="brand-tagline refined-tagline">
            Performance websites for garages
          </span>
        </div>

        {/* Navigation */}
        <nav className="header-nav">
          <Link href="#pricing" className="nav-link refined-nav">Pricing</Link>
          <Link href="#contact" className="nav-link nav-link-cta refined-nav">Book a Call</Link>
        </nav>
      </div>
    </header>
  );
}

