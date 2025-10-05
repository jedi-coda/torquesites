// app/[slug]/page.tsx
import { redirect } from "next/navigation";
import garages from "@/data/garages.json";
import GarageTemplate from "@/components/GarageTemplate";

type Garage = {
  slug: string;
  // ...plus whatever fields GarageTemplate expects
  [key: string]: any;
};

// Prebuild known demo slugs
export const dynamic = "force-static";

export function generateStaticParams() {
  return (garages as Garage[]).map((g) => ({ slug: g.slug }));
}

export default function GaragePage({ params }: { params: { slug: string } }) {
  const slug = decodeURIComponent(params.slug);
  const garage = (garages as Garage[]).find((g) => g.slug === slug);

  // Unknown slug -> send to pricing (matches live behaviour)
  if (!garage) redirect("/pricing");

  // Known demo -> render the showroom
  return <GarageTemplate garage={garage} />;
}
