"use client";

export default function Hero() {
  return (
    <section className="bg-white text-center py-24 px-6">
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900">
        MOTmatch
      </h1>
      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Enterprise-grade technology, built for independents. 
        Keep your customers, grow your business, and book with confidence.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <a
          href="#about"
          className="px-6 py-3 bg-black text-white text-lg rounded-lg hover:bg-gray-800 transition"
        >
          Learn More
        </a>
        <a
          href="#get-started"
          className="px-6 py-3 border border-gray-400 text-lg rounded-lg hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}

