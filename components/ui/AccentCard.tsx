'use client';

export function AccentCard({
  children, className = ''
}: { children: React.ReactNode; garage?: any; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 ${className}`}
    >
      <span
        className="absolute left-5 top-5 h-[3px] w-14 rounded-full"
        style={{ background: 'var(--ts-accent)' }}
      />
      {children}
    </div>
  );
}
