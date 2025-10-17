import Image from "next/image";

export default function Showcase() {
  return (
    <section className="bg-white py-20 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 tracking-tight">
          Showcase: Newtown Garage
        </h2>
        <Image
          src="/images/newtown-partnership.png"
          alt="Newtown Garage partnership"
          width={900}
          height={560}
          className="rounded-xl shadow-lg w-full h-auto object-cover mb-6"
        />
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          “Our visibility jumped and the phone started ringing again.
          We keep our customer data and our profits.”
        </p>
        <a
          href="/garage/newtown"
          className="mt-6 inline-block bg-pink-600 hover:bg-pink-500 text-white px-8 py-3 rounded-full shadow-md transition"
        >
          View Demo Microsite
        </a>
      </div>
    </section>
  );
}
