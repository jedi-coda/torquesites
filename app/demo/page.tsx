export default function DemosPage() {
  return (
    <section className="max-w-5xl mx-auto text-center py-20 px-6">
      <h1 className="text-4xl font-bold mb-6">See Demo Garage Sites</h1>
      <p className="text-gray-600 mb-12">
        Check out some example websites built with TorqueSites.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="border rounded-xl shadow p-6">
          <h2 className="font-bold text-xl mb-2">Swift Motors</h2>
          <p className="text-gray-600">Customer-focused design with easy booking.</p>
        </div>
        <div className="border rounded-xl shadow p-6">
          <h2 className="font-bold text-xl mb-2">Newtown Garage</h2>
          <p className="text-gray-600">Modern, tech-first layout built for conversions.</p>
        </div>
      </div>
    </section>
  );
}
