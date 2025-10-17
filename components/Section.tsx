'use client';

export default function Section({
  children, garage, index = 0, className = ''
}: { children: React.ReactNode; garage?: any; index?: number; className?: string }) {
  const bg = index % 2 === 0 ? 'var(--ts-surface-soft)' : 'transparent';
  return (
    <section
      className={`py-16 md:py-20 ${className}`}
      style={{ background: bg }}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </section>
  );
}
