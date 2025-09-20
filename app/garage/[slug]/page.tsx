import Image from "next/image";
import garageData from "@/components/garageData";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GaragePage({ params }: Props) {
  const { slug } = await params; // ✅ await params
  const data = garageData[slug];

  if (!data) {
    notFound();
  }

  return (
    <main className="font-sans text-gray-900">
      {/* HERO */}
      <section
        className="relative bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${data.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center py-20 px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">
            {data.heroLine}
          </h1>
          <p className="text-lg md:text-xl">{data.address}</p>
          <a
            href={`tel:${data.phone}`}
            className="mt-6 bg-white text-blue-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold shadow transition"
          >
            Call Now
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-24 text-center">
        <Image
          src={data.logo}
          alt={`${data.name} logo`}
          width={200}
          height={200}
          className="mx-auto mb-6"
        />
        <h2 className="text-3xl font-bold mb-4">{data.name}</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Contact us at <strong>{data.phone}</strong> or email{" "}
          <strong>{data.emailFallback}</strong>.
        </p>
      </section>

      {/* SERVICES */}
      <section className="bg-gray-50 py-16 px-6 md:px-12 lg:px-24">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Our Services
        </h2>
        <div className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {data.services.map((service: any, i: number) => (
            <div
              key={i}
              className="p-6 bg-white shadow rounded-lg text-center"
            >
              <Image
                src={service.image}
                alt={service.name}
                width={400}
                height={250}
                className="rounded-lg mx-auto mb-4"
              />
              <h3 className="font-semibold">{service.name}</h3>
              <p className="text-gray-600 mt-2">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-white py-16 px-6 md:px-12 lg:px-24 text-center">
        <h2 className="text-2xl md:text-3xl font-bold">
          Contact {data.name}
        </h2>
        <p>{data.address}</p>
        <p className="mt-2">{data.phone}</p>
        <p className="mt-1">{data.emailFallback}</p>
      </section>
    </main>
  );
}




