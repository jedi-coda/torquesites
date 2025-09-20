import Link from "next/link";

type FooterLink = {
  label: string;
  href: string;
};

const links: FooterLink[] = [
  { label: "Demo 1 – Swift", href: "/garage/swift" },
  { label: "Demo 2 – Apple", href: "/v2" },
  { label: "Demo 3 – Shopify", href: "/v3" },
  { label: "MOT Match Home", href: "https://motmatch.co.uk" }, // example external
];

function SmartLink({ label, href }: FooterLink) {
  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link href={href} className="hover:underline">
        {label}
      </Link>
    );
  }

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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="mb-4 md:mb-0">
          © {new Date().getFullYear()} MOT Match. Internal Demo Only
        </p>
        <div className="flex space-x-6">
          {links.map((link) => (
            <SmartLink key={link.href} {...link} />
          ))}
        </div>
      </div>
    </footer>
  );
}



