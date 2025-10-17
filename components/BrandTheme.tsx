'use client';

import { CSSProperties, PropsWithChildren, useMemo } from 'react';

// small helpers – keep here to avoid extra imports
const clamp = (n:number,min=0,max=255)=>Math.min(max,Math.max(min,n));
const toRGB = (hex:string):[number,number,number] => {
  const h = hex.replace('#','').trim();
  const v = h.length===3
    ? h.split('').map(c=>parseInt(c+c,16))
    : [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
  return v as [number,number,number];
};
const rgba = (r:number,g:number,b:number,a=1)=>`rgba(${r}, ${g}, ${b}, ${a})`;

type Props = PropsWithChildren<{ garage?: any }>;

export default function BrandTheme({ garage, children }: Props) {
  // Try multiple places for an accent color, fallback to a tasteful blue
  const accentHex: string =
    garage?.theme?.accent ||
    garage?.accent ||
    '#1e40af'; // slate-royal fallback

  const style = useMemo<CSSProperties>(() => {
    const hex = (accentHex || '#1e40af').replace('#','');
    const [r,g,b] = toRGB('#'+hex);

    // Softer tone ladder so "solid" never becomes neon
    const gradFrom = rgba(clamp(r-18), clamp(g-18), clamp(b-18), 1);
    const gradTo   = rgba(clamp(r+5),  clamp(g+5),  clamp(b+5),  1);

    // Good overlay for image legibility
    const overlay  = 'rgba(0,0,0,0.30)';

    const lum = (0.2126*r + 0.7152*g + 0.0722*b)/255;
    const contrast = lum > 0.6 ? '#0b1223' : '#ffffff';

    return {
      // brand variables
      ['--ts-accent' as any]: `#${hex}`,
      ['--ts-contrast' as any]: contrast,
      ['--ts-grad-from' as any]: gradFrom,
      ['--ts-grad-to' as any]: gradTo,
      ['--ts-overlay' as any]: overlay,

      // optional surfaces used by cards
      ['--ts-surface' as any]: rgba(r,g,b,0.06),
      ['--ts-surface-soft' as any]: rgba(r,g,b,0.03),
      ['--ts-border' as any]: rgba(r,g,b,0.22),
    } as CSSProperties;
  }, [accentHex]);

  return (
    <div style={style}>
      {children}
    </div>
  );
}