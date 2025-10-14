import type { Metadata } from 'next'
import GemBrandSetup from '@/components/GemBrandSetup'

export const metadata: Metadata = {
  title: 'GEM Motors',
  description: 'Premium automotive services',
}

export default function GemLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <GemBrandSetup />
      <main style={{ backgroundColor: 'var(--brand-bg)' }}>
        {children}
      </main>
    </>
  )
}
