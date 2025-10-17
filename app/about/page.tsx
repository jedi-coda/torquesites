export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gray-50 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        About MOTmatch
      </h1>
      <p className="max-w-2xl text-lg text-gray-700 mb-6">
        MOTmatch is building the UK’s smartest booking platform for MOTs,
        servicing, tyres & diagnostics. Our mission is to connect drivers with
        trusted local garages, while giving garages the tools to fill empty
        slots and grow their business.
      </p>
      <p className="text-gray-600">
        We combine AI convenience with fair pricing — no middlemen, no monopoly
        fees. Just garages and drivers working together.
      </p>
    </main>
  );
}
