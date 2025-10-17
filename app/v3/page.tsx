import Hero from "@/components/Hero";
import Features from "@/components/Features";
import RoadAhead from "@/components/RoadAhead";
import Showcase from "@/components/Showcase";
import Footer from "@/components/Footer";

export default function ShopifyPage() {
  return (
    <>
      <Hero />
      <Features />

      {/* Testimonial */}
      <section className="bg-teal-100 py-20 text-center">
        <blockquote className="max-w-3xl mx-auto text-xl italic text-gray-800">
          “MOTmatch gives us the tools we need to compete online — without
          taking advantage. Finally, tech built for garages, not against us.”
        </blockquote>
        <p className="mt-4 text-gray-600">— First Partner Garage</p>
      </section>

      <RoadAhead />
      <Showcase />

      {/* Investment Section with Shopify-style gradient */}
      <section className="bg-gradient-to-r from-green-400 to-teal-500 text-white py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Invest in MOTmatch</h2>
        <p className="max-w-2xl mx-auto text-lg mb-12">
          We’re building the future of independent garages. Join us as we scale across the UK,
          offering simple, fair tools that empower independents — not exploit them.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold mb-2">£25k</h3>
            <p className="text-gray-600">Early supporter tier with long-term upside.</p>
          </div>
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold mb-2">£50k</h3>
            <p className="text-gray-600">Accelerator tier — scale with us, share our growth.</p>
          </div>
          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold mb-2">£1M</h3>
            <p className="text-gray-600">Strategic partner tier for serious investors.</p>
          </div>
        </div>

        <div className="mt-12">
          <a
            href="#"
            className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Request Investor Pack
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}




