'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

type Slide = { key: string; kind: 'gradient' | 'image'; src?: string; alt?: string }

const slides: Slide[] = [
  { key: 'welcome', kind: 'gradient' },
  { key: 'handover', kind: 'image', src: '/hero/customer.jpg', alt: 'Customer handing keys' },
  { key: 'black-car', kind: 'image', src: '/hero/prestige.jpg', alt: 'Performance car' },
  { key: 'diagnostics', kind: 'image', src: '/hero/tech.jpg', alt: 'Diagnostics in workshop' },
]

function useAutoPlay(count: number, ms = 6500) {
  const [i, setI] = useState(0)
  const timer = useRef<ReturnType<typeof setInterval> | null>(null)
  const isReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const pause = () => { if (timer.current) clearInterval(timer.current) }
  const resume = () => {
    if (isReduced) return
    pause()
    timer.current = setInterval(() => setI(prev => (prev + 1) % count), ms)
  }
  useEffect(() => { resume(); return pause }, [count, ms])
  return { i, setI, pause, resume }
}

function SlideLayer({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-hidden={!active}
    >
      {children}
    </div>
  )
}

export default function GemHero() {
  const { i, setI, pause, resume } = useAutoPlay(slides.length)

  return (
    <section className="full-bleed h-[clamp(420px,60vh,860px)] relative overflow-hidden">
      {/* Slides */}
      <div className="absolute inset-0">
        {slides.map((s, idx) => (
          <SlideLayer key={s.key} active={i === idx}>
            {s.kind === 'gradient' ? (
              <div className="h-full w-full" style={{ background: 'var(--g-hero)' }} />
            ) : (
              <div className="absolute inset-0">
                <Image src={s.src!} alt={s.alt ?? ''} fill priority sizes="100vw" className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-br from-black/55 via-black/45 to-black/65" />
              </div>
            )}
          </SlideLayer>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center" onMouseEnter={pause} onMouseLeave={resume}>
        <div className="container-page px-fluid text-white">
          {/* Copy tailored by first slide vs others */}
          <div className="max-w-3xl">
            <h1 className="text-[clamp(28px,4vw,56px)] font-bold text-white leading-tight">
              {i === 0 ? 'Good afternoon, welcome to GEM UK Garage' : (i === 1 ? 'Friendly, fair & fast at GEM UK Garage' : i === 2 ? 'Book your MOT at GEM UK Garage' : 'Dealer-level diagnostics at GEM UK Garage')}
            </h1>
            <p className="mt-6 p-base text-white/85">
              Performance servicing & MOTs. Same-day slots available.
            </p>
            <div className="mt-6 md:mt-8 flex flex-wrap gap-4">
            <a href="tel:01903999999" className="btn-primary">Call 01903 999999</a>
            <a href="#reviews" className="btn-secondary">Read reviews</a>
            <a href="/partnership" className="btn-ghost">Secure partner slot</a>
            </div>
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 right-6">
            <div role="tablist" aria-label="Hero slides" className="dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-label={`Show slide ${idx + 1}`}
                  aria-current={i === idx}
                  className="dot"
                  onClick={() => setI(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}