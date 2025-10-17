export const newtownGarageBrand = {
  slug: 'newtown-garage-chesham',
  name: 'Newtown Garage',
  tagline: 'Your One-Stop Shop for All Your Motoring Needs',

  logo: {
    type: 'text',
    text: 'NEWTOWN GARAGE',
    subtitle: 'Chesham',
  },

  brandColor: '#2a2a88', // Adjusted to match live branding (deep garage blue)
  accentColor: '#5089c6', // CTA color to match site buttons

  heroTagline: 'The Best Technicians. The Best Parts. The Best Advice.',
  heroSubtext: 'From MOTs and servicing to hybrid & EV repairs, Newtown Garage delivers expert care for all makes and models in Chesham.',
  heroImageVariant: 'customer',
  heroCTA: {
    primary: 'Book Your MOT',
    secondary: 'Call to Book',
  },

  services: [
    'MOT Testing',
    'Full Vehicle Servicing', 
    'Interim Service',
    'Hybrid & EV Repairs',
    'Diagnostics & Repairs',
    'Brake Service',
    'Exhaust Systems',
    'Air Conditioning',
    'Tyres & Wheels',
    'Battery Service'
  ],

  certifications: [
    'DVSA Approved MOT Test Centre',
    'Motor Ombudsman Code Member',
    'Hybrid & EV Certified Technicians',
    '12-Month Warranty on All Work',
  ],

  openingHours: {
    monday: '08:00 - 18:00',
    tuesday: '08:00 - 18:00',
    wednesday: '08:00 - 18:00',
    thursday: '08:00 - 18:00',
    friday: '08:00 - 18:00',
    saturday: '08:00 - 13:00',
    sunday: 'Closed',
    bankHolidays: 'Closed',
  },

  contact: {
    phone: '01494 772277',
    phoneDisplay: '01494 77 22 77',
    email: 'info@newtowngarage.com', // fixed from 'mail@'
    address: {
      line1: 'Unit A3, Alma Road Industrial Estate',
      line2: 'Chesham',
      county: 'Buckinghamshire',
      postcode: 'HP5 3HB',
    },
    mapLink: 'https://maps.google.com/?q=Unit+A3+Alma+Road+Industrial+Estate+Chesham+HP5+3HB',
  },

  stripeLinks: {
    mot: 'https://buy.stripe.com/test_00abcdef', // placeholder
    service: 'https://buy.stripe.com/test_11abcdef',
  },

  testimonials: [
    {
      quote: "Excellent service from start to finish. The team at Newtown Garage really know their stuff and explained everything clearly.",
      author: "Sarah M.",
      rating: 5
    },
    {
      quote: "Professional, reliable, and honest. They fixed my car quickly and at a fair price. Highly recommended!",
      author: "James R.",
      rating: 5
    },
    {
      quote: "Great experience with my hybrid car service. The technicians are knowledgeable about modern vehicles.",
      author: "Emma L.",
      rating: 5
    }
  ],

  usps: [
    'DVSA Approved MOT Testing',
    'Expert Hybrid & EV Technicians',
    '12-Month Warranty on All Work',
    'Same-Day MOT Appointments',
    'Transparent Pricing',
    'Local Chesham Business'
  ],

  brandPromise: 'With Newtown Garage you can always expect the best technicians, the best quality parts, and the best possible advice when you put your car in our hands.',

  ctaStyle: 'solid',
  ctaEmphasis: 'phone-first',
};
