import { Check } from "lucide-react";

function Point({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <Check className="text-green-600 w-5 h-5" />
      <span className="text-gray-700">{text}</span>
    </div>
  );
}

export default function RoadAhead() {
  return (
    <section className="bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          The Road Ahead
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          We’re building MOTmatch with garages, not just for them. 
          Like Shopify for retail, our mission is to empower — not control. 
          We know tech, they know cars. Together, we’ll scale.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            For Garages
          </h3>
          <div className="space-y-4">
            <Point text="Branded online presence in days" />
            <Point text="Instant, direct payments" />
            <Point text="Customer retention tools" />
            <Point text="Insights & future features as we grow" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-6 text-gray-900">
            For Drivers
          </h3>
          <div className="space-y-4">
            <Point text="Simple, trustworthy booking" />
            <Point text="Transparent pricing" />
            <Point text="Reminders that keep them safe" />
            <Point text="Support for local independents" />
          </div>
        </div>
      </div>
    </section>
  );
}

