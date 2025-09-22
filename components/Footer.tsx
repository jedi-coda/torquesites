import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
  external?: boolean;
};

const links: FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "💼 Investors", href: "/investors" },
  // keep demo links for internal use if you want
  { label: "Demo – Swift", href: "/garage/swift" },
  { label: "Demo – v2", href: "/v2" },
  { label: "Demo – v3", href: "/v3" },
  { label: "MOT Match Home", href: "https://motmatch.co.uk", external: true },
];

function SmartLink({ label, href, external }: FooterLink) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className="hover:underline">
      {label}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">
          © {new Date().getFullYear()} MOTmatch. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-6 justify-center md:justify-end">
          {links.map((link) => (
            <SmartLink key={link.href} {...link} />
          ))}
        </div>
      </div>
    </footer>
  );
}
