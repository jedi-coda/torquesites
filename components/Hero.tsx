'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { type Garage } from '@/lib/garage'

interface HeroProps {
  garage?: Garage | null;
}

export default function Hero({ garage }: HeroProps) {
  const [greeting, setGreeting] = useState('Good day')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) {
      setGreeting('Good morning')
    } else if (hour < 18) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good evening')
    }
  }, [])

  // Use garage data or fallback to defaults
  const garageName = garage?.name || 'Newtown Garage'
  const garageLocation = garage?.branches?.[0]?.address?.split(',')[1]?.trim() || 'Chesham'
  const garagePhone = garage?.contact?.phone || '01494 772277'

  return (
    <section className="relative flex flex-col items-center justify-center h-[50vh] bg-gradient-to-b from-[#0f172a] to-[#111827] text-white text-center px-4">
      <div className="z-10 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-md md:text-lg font-medium mb-3 text-white">{greeting},</p>

          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
            Welcome to {garageName}
          </h1>

          <p className="text-sm md:text-base text-gray-300 mb-8">
            Your trusted local garage in {garageLocation}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap gap-4 justify-center"
        >
          <button className="bg-white text-black font-semibold px-6 py-2 rounded-full shadow-md hover:scale-105 transition">
            Book MOT now
          </button>

          <a
            href={`tel:${garagePhone.replace(/\s/g, '')}`}
            className="border border-white text-white font-semibold px-6 py-2 rounded-full hover:scale-105 transition"
          >
            Call {garagePhone}
          </a>

          <a
            href="https://www.torquesites.co.uk/partnership"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#ec4899] text-[#ec4899] font-semibold px-6 py-2 rounded-full hover:scale-105 transition"
          >
            Secure Partner Slot
          </a>
        </motion.div>
      </div>
    </section>
  )
}