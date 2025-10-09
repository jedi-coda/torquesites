'use client';
import { motion } from 'framer-motion';

export function AccentCard({
  children, garage, className = ''
}: { children: React.ReactNode; garage?: any; className?: string }) {
  return (
    <motion.div
      initial={{ y: 12, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.35 }}
      className={`relative rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-md transition-shadow p-5 md:p-6 ${className}`}
    >
      <span
        className="absolute left-5 top-5 h-[3px] w-14 rounded-full"
        style={{ background: 'var(--ts-accent)' }}
      />
      {children}
    </motion.div>
  );
}
