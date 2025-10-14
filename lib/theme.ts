// lib/theme.ts
export function withTints(accent: string | undefined) {
  const a = (accent || '#0a4bff').replace('#','');
  const r = parseInt(a.slice(0,2),16), g = parseInt(a.slice(2,4),16), b = parseInt(a.slice(4,6),16);
  const rgba = (o:number)=>`rgba(${r},${g},${b},${o})`;
  return {
    surface: rgba(0.04),     // section bg
    surfaceSoft: rgba(0.02), // lighter pass
    border: rgba(0.15),      // card border
    bar: rgba(0.85),         // accent bar
    glow: rgba(0.2)          // inner glow
  };
}
