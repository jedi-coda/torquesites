import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="bg-gray-50 py-24 px-6 md:px-12 lg:px-24">
      <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            About MOTmatch
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            MOTmatch was created to give independent garages control over their
            own customers. No middlemen, no sky-high commissions — just simple,
            fair technology that helps drivers book MOTs and servicing online
            with confidence.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Our mission is clear: empower garages with branded microsites,
            instant payments, and smart reminders — while drivers enjoy
            convenience, trust, and local service.
          </p>
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/garage.png"
            alt="Garage workshop"
            width={900}
            height={560}
            className="rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
