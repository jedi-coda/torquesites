// lib/heroConfig.ts
export type HeroSlide = {
  id?: string;
  src?: string;
  alt?: string;
  headline?: string;
  sub?: string;
  variant?: 'solid' | 'prestige' | 'customer' | 'tech';
  objectPosition?: string;
};

export type HeroByBrand = {
  [brandSlug: string]: HeroSlide[];
  default: HeroSlide[];
};

export const heroByBrand: HeroByBrand = {
  'swift-motors': [
    {
      id: 'swift-prestige',
      src: '/hero/prestige.jpg',
      alt: 'Swift Motors prestige service',
      headline: 'Book your MOT at Swift Motors',
      sub: 'Performance servicing & MOTs. Same-day slots available.',
      variant: 'prestige',
      objectPosition: '70% 55%'
    },
    {
      id: 'swift-tech',
      src: '/hero/tech.jpg',
      alt: 'Swift Motors diagnostics',
      headline: 'Dealer-level diagnostics at Swift Motors',
      sub: 'Same-day MOTs. Transparent checklist & free re-test.',
      variant: 'tech',
      objectPosition: '30% 50%'
    }
  ],
  'gem': [
    {
      id: 'gem-customer',
      src: '/hero/customer.jpg',
      alt: 'GEM customer service',
      headline: 'Friendly, fair & fast at GEM',
      sub: 'Trusted service, clear pricing, local team.',
      variant: 'customer',
      objectPosition: '30% 50%'
    },
    {
      id: 'gem-prestige',
      src: '/hero/prestige.jpg',
      alt: 'GEM prestige service',
      headline: 'Book your MOT at GEM',
      sub: 'Performance servicing & MOTs. Same-day slots available.',
      variant: 'prestige',
      objectPosition: '70% 55%'
    }
  ],
  'newtown-garage': [
    {
      id: 'newtown-prestige',
      src: '/hero/prestige.jpg',
      alt: 'Newtown Garage prestige service',
      headline: 'Book your MOT at Newtown Garage',
      sub: 'Performance servicing & MOTs. Same-day slots available.',
      variant: 'prestige',
      objectPosition: '70% 55%'
    },
    {
      id: 'newtown-tech',
      src: '/hero/tech.jpg',
      alt: 'Newtown Garage diagnostics',
      headline: 'Dealer-level diagnostics at Newtown Garage',
      sub: 'Same-day MOTs. Transparent checklist & free re-test.',
      variant: 'tech',
      objectPosition: '30% 50%'
    }
  ],
  'arundel-road-garage': [
    {
      id: 'arundel-customer',
      src: '/hero/customer.jpg',
      alt: 'Arundel Road Garage customer service',
      headline: 'Friendly, fair & fast at Arundel Road Garage',
      sub: 'Trusted service, clear pricing, local team.',
      variant: 'customer',
      objectPosition: '30% 50%'
    },
    {
      id: 'arundel-prestige',
      src: '/hero/prestige.jpg',
      alt: 'Arundel Road Garage prestige service',
      headline: 'Book your MOT at Arundel Road Garage',
      sub: 'Performance servicing & MOTs. Same-day slots available.',
      variant: 'prestige',
      objectPosition: '70% 55%'
    }
  ],
  default: [
    {
      id: 'default-solid',
      src: undefined, // No image - gradient only
      alt: '',
      headline: 'Book your MOT today',
      sub: 'Trusted experts in MOTs, servicing & full vehicle care.',
      variant: 'solid',
      objectPosition: '50% 50%'
    }
  ]
};
