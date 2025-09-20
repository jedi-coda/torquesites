function Feature({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="p-8 bg-white rounded-xl shadow hover:shadow-lg transition transform hover:-translate-y-1">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="text-gray-600 mt-3">{desc}</p>
    </div>
  );
}

export default function Features() {
  return (
    <section className="bg-white py-24 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
        Why join MOTmatch?
      </h2>
      <div className="grid gap-8 md:grid-cols-4 max-w-7xl mx-auto">
        <Feature title="Branded Microsites" desc="Your garage online in 3–5 days." />
        <Feature title="Instant Stripe Payouts" desc="Money straight to your account." />
        <Feature title="Customer Ownership" desc="Keep your data, build loyalty." />
        <Feature title="Smart Reminders" desc="Automated recalls, texts & reviews." />
      </div>
    </section>
  );
}
