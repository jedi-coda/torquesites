import { redirect } from "next/navigation";
// adjust the path if your folder layout differs:
import garages from "../../data/garages.json";
import GarageTemplate from "../../components/GarageTemplate";

type Params = { params: { slug: string } };

export default function GaragePage({ params }: Params) {
  const garage = (garages as any[]).find((g) => g.slug === params.slug);

  if (!garage) {
    // Backstop — if unknown slug, send to home (or a 404 if you prefer)
    redirect("/");
  }

  // Remove global site nav on garage pages (we render only the partner bar + template)
  return <GarageTemplate garage={garage} />;
}
