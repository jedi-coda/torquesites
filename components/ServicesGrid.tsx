import { Wrench, Droplets, Car, AlertCircle, Settings, Shield, Zap } from 'lucide-react';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesGridProps {
  services: Service[];
}

const iconMap = {
  wrench: Wrench,
  oil: Droplets,
  car: Car,
  'alert-circle': AlertCircle,
  settings: Settings,
  shield: Shield,
  zap: Zap,
};

export default function ServicesGrid({ services }: ServicesGridProps) {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Professional automotive services to keep your vehicle running smoothly
          </p>
        </div>

        {/* Services Grid - Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6 text-lg">
            Don't see what you're looking for?
          </p>
          <a
            href="#enquiry"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
}