// Garage data structure for TypeScript support
// This file provides type-safe access to garage data

export interface GarageData {
  name: string;
  phone: string;
  email?: string;
  address: string;
  brandColor: string;
  tagline?: string;
  services?: string[];
  pricing?: {
    mot?: string;
    interimFrom?: string;
    fullFrom?: string;
  };
  hours?: string;
  reviews?: Array<{
    quote: string;
    author: string;
  }>;
  logoPath?: string;
  heroImage?: string;
  mapEmbed?: string;
}

// Export garage data as a typed object
export const garageData: Record<string, GarageData> = {
  "newtown-garage": {
    name: "Newtown Garage",
    phone: "01494 772277",
    email: "info@newtown-garage.example",
    address: "Unit A3, Alma Road Industrial Estate, Chesham, Buckinghamshire, HP5 3HB",
    brandColor: "#c8102e",
    tagline: "Your one stop shop for all your motoring needs. Get the best advice from the best technicians using the best parts.",
    services: [
      "MOT Testing",
      "Full Service",
      "Interim Service", 
      "Diagnostics",
      "Brake Service",
      "Air Conditioning"
    ],
    pricing: {
      mot: "£54.85",
      interimFrom: "£149",
      fullFrom: "£199"
    },
    hours: "Mon–Fri 8:00–18:00, Sat 8:00–16:00",
    reviews: [
      {
        quote: "Excellent service, very professional and honest. Will definitely use again.",
        author: "Sarah M."
      },
      {
        quote: "Quick MOT turnaround and fair pricing. Highly recommended.",
        author: "James K."
      }
    ],
    logoPath: "/logos/newtown.png",
    heroImage: "/hero/prestige.jpg",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2478.1234567890!2d-0.1234567890!3d51.1234567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875a37a91381a39%3A0x2661520f84ee2f1f!2sNewtown%20Garage!5e0!3m2!1sen!2suk!4v1759495992967!5m2!1sen!2suk"
  },
  
  "gem": {
    name: "GEM UK Garage",
    phone: "01903 999999",
    email: "info@gem-uk-garage.example",
    address: "Worthing, West Sussex",
    brandColor: "#E0AA3E",
    tagline: "DVSA-approved MOT testing with transparent pricing and female-friendly service.",
    services: [
      "MOT Testing",
      "Servicing",
      "Diagnostics",
      "EV & Hybrid"
    ],
    pricing: {
      mot: "£54.85",
      interimFrom: "£149",
      fullFrom: "£199"
    },
    hours: "Mon–Fri 8:00–17:00",
    reviews: [
      {
        quote: "Great communication and very thorough.",
        author: "Lydia S."
      },
      {
        quote: "Service you can trust. Will use again.",
        author: "Tom R."
      }
    ],
    logoPath: "/logos/gem.png",
    heroImage: "/hero/gem-garage.jpg",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2521.036751197013!2d-0.45191572342136366!3d50.81195777166338!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875a37a91381a39%3A0x2661520f84ee2f1f!2sGem%20Uk%20Garage!5e0!3m2!1sen!2suk!4v1759495992967!5m2!1sen!2suk"
  },

  "swift-motors": {
    name: "Swift Motors",
    phone: "01234 567890",
    email: "info@swift-motors.example",
    address: "123 High Street, Manchester, M1 1AA",
    brandColor: "#1F4FC9",
    tagline: "Fast, reliable MOT testing and vehicle servicing in Manchester.",
    services: [
      "MOT Testing",
      "Full Service",
      "Interim Service",
      "Brake Service",
      "Exhaust Fitting"
    ],
    pricing: {
      mot: "£54.85",
      interimFrom: "£149",
      fullFrom: "£199"
    },
    hours: "Mon–Fri 8:00–18:00, Sat 9:00–15:00",
    reviews: [
      {
        quote: "Quick and efficient service. Great value for money.",
        author: "Mike D."
      },
      {
        quote: "Professional team and honest advice.",
        author: "Emma L."
      }
    ],
    logoPath: "/logos/swift.png",
    heroImage: "/hero/swift-garage.jpg"
  },

  "premium-auto": {
    name: "Premium Auto Services",
    phone: "020 1234 5678",
    email: "info@premium-auto.example",
    address: "45 Commercial Road, London, E1 1LA",
    brandColor: "#2D5016",
    tagline: "Premium automotive services with state-of-the-art equipment.",
    services: [
      "MOT Testing",
      "Full Service",
      "Interim Service",
      "Diagnostics",
      "Air Conditioning",
      "Brake Service"
    ],
    pricing: {
      mot: "£54.85",
      interimFrom: "£179",
      fullFrom: "£249"
    },
    hours: "Mon–Fri 7:30–19:00, Sat 8:00–16:00",
    reviews: [
      {
        quote: "Outstanding service and attention to detail.",
        author: "David R."
      },
      {
        quote: "Worth every penny. Highly professional.",
        author: "Lisa T."
      }
    ],
    logoPath: "/logos/premium.png",
    heroImage: "/hero/premium-garage.jpg"
  }
};

// Helper function to get garage data by slug
export function getGarageData(slug: string): GarageData | undefined {
  return garageData[slug];
}

// Helper function to get all garage slugs
export function getAllGarageSlugs(): string[] {
  return Object.keys(garageData);
}

// Helper function to check if garage exists
export function garageExists(slug: string): boolean {
  return slug in garageData;
}
