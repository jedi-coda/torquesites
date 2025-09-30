import garages from "@/data/garages.json";
import GarageTemplate from "@/components/GarageTemplate";

interface PageProps {
  params: { slug: string };
}

export default function GaragePage({ params }: PageProps) {
  const garage = garages.find((g) => g.slug === params.slug);

  if (!garage) {
    return (
      <main className="h-screen flex items-center justify-center text-center">
        <h1 className="text-3xl font-bold">Garage not found</h1>
      </main>
    );
  }

  return <GarageTemplate garage={garage} />;
}
