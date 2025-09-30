"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function GarageTemplate({ garage }: { garage: any }) {
  return (
    <main className="font-sans">
      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/porsche-hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-3xl px-6">
          {garage.logo && (
            <Image
              src={garage.logo}
              alt={garage.name}
              width={160}
              height={80}
              className="mx-auto mb-4 object-contain"
            />
          )}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {garage.name}
          </h1>
          <p className="text-lg text-gray-200 mb-6">{garage.location}</p>
          <p className="text-xl font-semibold mb-6 text-white">
            {garage.ctaPrice}
          </p>
          <a
            href={`tel:${garage.phone}`}
            className="px-6 py-3 rounded-xl font-semibold shadow text-white"
            style={{ backgroundColor: garage.accent.primary }}
          >
            Book Now
          </a>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-16 px-6 bg-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-6"
          style={{ color: garage.accent.secondary }}
        >
          Why Choose {garage.name}?
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trusted experts with years of experience in MOT, servicing and
          repairs. Customer satisfaction is our top priority.
        </p>
        <div className="mt-10 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {garage.services.map((service: string, idx: number) => (
            <div
              key={idx}
              className="border rounded-xl p-6 shadow-sm hover:shadow-lg transition"
            >
              <p className="font-medium">{service}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <h2
          className="text-3xl font-bold mb-10"
          style={{ color: garage.accent.secondary }}
        >
          What Our Customers Say
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {garage.reviews?.map((review: any, idx: number) => (
            <div
              key={idx}
              className="bg-white border rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <p className="italic text-gray-700 mb-3">&quot;{review.text}&quot;</p>
              <p
                className="font-semibold"
                style={{ color: garage.accent.primary }}
              >
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Map */}
      {garage.mapEmbed && (
        <section className="py-16">
          <h2
            className="text-3xl font-bold text-center mb-8"
            style={{ color: garage.accent.secondary }}
          >
            Find Us
          </h2>
          <div className="max-w-4xl mx-auto">
            <iframe
              src={garage.mapEmbed}
              width="100%"
              height="400"
              className="rounded-xl shadow"
              loading="lazy"
            />
          </div>
        </section>
      )}

      {/* Contact Form / CTA */}
      <section
        className="py-16 px-6 text-white text-center"
        style={{ backgroundColor: garage.accent.secondary }}
      >
        <h2 className="text-3xl font-bold mb-6">Get In Touch</h2>
        <p className="mb-6">Call or email us today to book your appointment.</p>
        <div className="flex justify-center gap-4 mb-10 flex-wrap">
          <a
            href={`tel:${garage.phone}`}
            className="px-6 py-3 rounded-xl font-semibold shadow"
            style={{ backgroundColor: garage.accent.primary }}
          >
            Call {garage.phone}
          </a>
          <a
            href={`mailto:${garage.email}`}
            className="px-6 py-3 rounded-xl font-semibold shadow bg-white text-gray-900"
          >
            Email Us
          </a>
        </div>
        {/* Simple enquiry form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Enquiry submitted!");
          }}
          className="max-w-lg mx-auto bg-white text-gray-900 p-6 rounded-xl shadow"
        >
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border rounded-lg mb-4"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border rounded-lg mb-4"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-3 border rounded-lg mb-4"
            rows={4}
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold text-white"
            style={{ backgroundColor: garage.accent.primary }}
          >
            Send Enquiry
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer
        className="py-8 text-center text-white"
        style={{ backgroundColor: garage.accent.secondary }}
      >
        {garage.logo && (
          <Image
            src={garage.logo}
            alt={garage.name}
            width={120}
            height={60}
            className="mx-auto mb-4 object-contain"
          />
        )}
        <p>{garage.address}</p>
        <p>{garage.email}</p>
        <p>{garage.phone}</p>
        <p className="mt-4 text-sm">© {new Date().getFullYear()} {garage.name}</p>
      </footer>
    </main>
  );
}
