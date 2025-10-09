// lib/brand.ts
export type BrandKey = 'gem' | 'newtown' | 'swift';
export type BrandTheme = {
  primary: string;   // hex like #0a4bff
  secondary?: string; // optional secondary stop
  textOnPrimary?: 'light' | 'dark';
  heroGradient?: string; // Tailwind gradient class
};

export const brand = {
  gem: {
    name: 'GEM UK Garage',
    // solid + gradient
    solid: { primary: '#F5B53B', onPrimary: '#0F0F10', surface: '#0C0D10', onSurface: '#FFFFFF' },
    gradient: {
      // hero + buttons
      from: '#F5B53B',  // gold 600
      via: '#C68E22',   // gold 700
      to:  '#0C0D10'    // near black
    },
    dotActive: '#FDBA74', // warm (amber-ish) for active dot
    dotIdle:   '#E5E7EB'
  },
  newtown: {
    name: 'Newtown Garage',
    solid: { primary: '#1E4DD8', onPrimary: '#FFFFFF', surface: '#0C0D10', onSurface: '#FFFFFF' },
    gradient: { from: '#1E4DD8', via: '#0F2E93', to: '#0B1020' },
    dotActive: '#60A5FA',
    dotIdle:   '#E5E7EB'
  },
  swift: {
    name: 'Swift Motors',
    solid: { primary: '#D4A91C', onPrimary: '#0F0F10', surface: '#0C0D10', onSurface: '#FFFFFF' },
    gradient: { from: '#D4A91C', via: '#9B7A13', to: '#0C0D10' },
    dotActive: '#FACC15',
    dotIdle:   '#E5E7EB'
  }
};

export function brandKeyFromHost(host?: string): BrandKey {
  const h = (host || '').toLowerCase();
  if (h.includes('gem')) return 'gem';
  if (h.includes('swift')) return 'swift';
  return 'newtown';
}

export function brandTokens(brandKey: BrandKey) {
  return brand[brandKey];
}

// Gradient overlay from brand primary to page bg
export function heroOverlay(brandKey: BrandKey) {
  const tokens = brandTokens(brandKey);
  return `linear-gradient(90deg, ${tokens.solid.surface}CC 0%, ${tokens.solid.surface}99 35%, ${tokens.solid.surface}F0 100%)`;
}

export function brandGradient(theme: BrandTheme) {
  // Derive a tasteful, deep gradient from primary → a darkened mix
  const p = theme.primary;
  const s = theme.secondary ?? mixHex(p, '#0a0f1f', 0.35); // gentle, not black
  return {
    from: p,
    to: s,
    className: theme.heroGradient ?? 
      'bg-[radial-gradient(120%_120%_at_0%_0%,var(--from)_0%,transparent_45%),linear-gradient(135deg,var(--from)_0%,var(--to)_100%)]',
    cssVars: { '--from': p, '--to': s } as React.CSSProperties,
  };
}

// Brand-specific gradients for premium feel
export const brandGradients = {
  gem: 'bg-gradient-to-r from-[#E0AA3E] via-[#E0AA3E]/80 to-transparent',
  'swift-motors': 'bg-gradient-to-r from-[#1F4FC9] via-[#1F4FC9]/80 to-transparent',
  'newtown-garage': 'bg-gradient-to-r from-[#1F4FC9] via-[#1F4FC9]/80 to-transparent',
  'arundel-road-garage': 'bg-gradient-to-r from-[#0a4bff] via-[#0a4bff]/80 to-transparent',
};

// Simple hex mixer to avoid bringing a dep
function mixHex(a: string, b: string, t = 0.5) {
  const pa = parseHex(a), pb = parseHex(b);
  const m = pa.map((v, i) => Math.round(v + (pb[i] - v) * t));
  return `#${m.map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}
function parseHex(h: string) {
  const x = h.replace('#', '');
  const v = x.length === 3
    ? x.split('').map((c) => parseInt(c + c, 16))
    : [0, 2, 4].map((i) => parseInt(x.slice(i, i + 2), 16));
  return v;
}