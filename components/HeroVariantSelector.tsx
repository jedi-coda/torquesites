'use client';
import { useState } from 'react';
import type { HeroVariant } from './Hero';

const variants: HeroVariant[] = ['customer', 'prestige', 'tech'];

export default function HeroVariantSelector({
  value,
  onChange,
}: {
  value?: HeroVariant;
  onChange?: (v: HeroVariant) => void;
}) {
  const [current, setCurrent] = useState<HeroVariant>(value || 'prestige');

  const select = (v: HeroVariant) => {
    setCurrent(v);
    onChange?.(v);
  };

  return (
    <div className="flex items-center gap-2">
      {variants.map(v => (
        <button
          key={v}
          aria-label={`Hero variant ${v}`}
          onClick={() => select(v)}
          className={`h-3 w-3 rounded-full ${current === v ? 'bg-black' : 'bg-gray-300'}`}
        />
      ))}
    </div>
  );
}


