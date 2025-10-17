// lib/heroCopy.ts
export type HeroVariant = 'solid'|'customer'|'prestige'|'tech';
type Garage = any;

// Simple luminance check to decide light/dark text
export function pickTextClass(hex?: string) {
  const c = (hex||'#0f172a').replace('#','');
  const r=parseInt(c.substring(0,2),16), g=parseInt(c.substring(2,4),16), b=parseInt(c.substring(4,6),16);
  const lum = (0.2126*r + 0.7152*g + 0.0722*b)/255;
  return lum > 0.55 ? 'text-slate-900' : 'text-white';
}

export function variantCopy(garage: Garage, v: HeroVariant) {
  const name = garage?.name || 'Our Garage';
  const town = garage?.location?.town || '';
  const usp  = garage?.content?.usp || "Trusted MOTs, servicing & repairs near you.";
  const offer = garage?.content?.offer || "Same-day MOT slots. Free re-test.";

  if (v === 'solid') {
    return {
      title: `Good ${greeting()}, welcome to`,
      highlight: name,
      sub: `${town ? `${town}'s ` : ''}trusted experts in MOTs, servicing & full vehicle care.`,
      badge: null
    };
  }
  // Image variants – slightly more sales forward
  return {
    title: `Book your MOT at`,
    highlight: name,
    sub: `${offer}`,
    badge: usp
  };
}

function greeting(d=new Date()){
  const h=d.getHours();
  if (h<12) return 'morning';
  if (h<18) return 'afternoon';
  return 'evening';
}
