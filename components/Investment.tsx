"use client";

import { motion } from "framer-motion";

export default function Investment() {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20">
      <div className="max-w-6xl mx-auto text-center px-6">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Invest in MOTmatch
        </motion.h2>

        <motion.p
          className="text-lg text-gray-300 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Be part of the future of independent garages. We’re scaling with cutting-edge
          technology, built for independents — and built to last.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { amount: "£25K", desc: "Early investor entry. Back the vision from the start." },
            { amount: "£50K", desc: "Accelerate our growth with strategic funding support." },
            { amount: "£1M", desc: "Scale MOTmatch nationwide. Own a stake in the future." },
          ].map((item, i) => (
            <motion.div
              key={item.amount}
              className="bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold mb-4">{item.amount}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="mt-12 px-8 py-4 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200 transition"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          viewport={{ once: true }}
        >
          Request Investor Pack
        </motion.button>
      </div>
    </section>
  );
}


