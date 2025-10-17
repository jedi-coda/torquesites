export default function FAQ() {
  const faqs = [
    {
      q: "Are there any extra fees?",
      a: "No commission, ever. You keep 100% of your bookings. Payments are processed by Stripe at their standard UK rates (e.g. ~1.4% + 20p per domestic card). SMS reminders are billed at cost. That’s it.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes. There are no contracts or tie-ins. If you’re not happy, you can cancel whenever you like.",
    },
    {
      q: "What if it doesn’t work for my garage?",
      a: "We offer a 60-day onboarding guarantee. If we can’t get you live and delivering bookings, you get your money back.",
    },
    {
      q: "Why is the setup fee discounted?",
      a: "Our Early Partner programme is limited to the first 100 garages. Instead of the regular £1,499 setup, Early Partners pay just £999 — and your monthly fee is price-locked for life.",
    },
    {
      q: "How do payouts work?",
      a: "All customer payments go through Stripe. Funds are deposited directly into your bank account, typically within 1-2 business days. MOTmatch never holds your money.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container max-w-4xl">
        <h2 className="text-3xl font-semibold text-center text-brand-navy mb-12">
          Frequently asked questions
        </h2>
        <div className="space-y-8">
          {faqs.map((faq, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold text-brand-navy">{faq.q}</h3>
              <p className="mt-2 text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
