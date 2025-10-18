'use client'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock, Phone } from 'lucide-react'

interface OpeningHoursProps {
  hours: {
    day: string
    hours: string
    open: boolean
  }[]
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function OpeningHours({ hours }: OpeningHoursProps) {
  const today = new Date().toLocaleString('en-GB', { weekday: 'long' })

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(interval)
  }, [])

  // expand grouped ranges (e.g. "Mon–Fri")
  const expandedHours = (() => {
    const expanded: { day: string; hours: string; open: boolean }[] = []
    hours.forEach(entry => {
      const match = entry.day.match(/(Mon|Tue|Wed|Thu|Fri|Sat|Sun)/g)
      if (match && match.length > 1) {
        const start = DAYS.findIndex(d => d.startsWith(match[0]))
        const end = DAYS.findIndex(d => d.startsWith(match[match.length - 1]))
        for (let i = start; i <= end; i++) {
          expanded.push({ ...entry, day: DAYS[i] })
        }
      } else {
        expanded.push(entry)
      }
    })
    DAYS.forEach(d => {
      if (!expanded.find(e => e.day === d)) {
        expanded.push({ day: d, hours: 'Closed', open: false })
      }
    })
    return expanded
  })()

  const todayHours = expandedHours.find(h => h.day === today)
  const isOpenNow = todayHours?.open ?? false

  if (!hours || hours.length === 0) return null

  return (
    <section className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-emerald-50 via-teal-50 to-white text-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center justify-center mb-4 w-12 h-12 rounded-xl bg-emerald-500/90 text-white shadow-md">
          <Clock className="w-6 h-6" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Opening Hours</h2>
        <div className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold shadow-sm
          ${isOpenNow ? 'bg-emerald-100 text-emerald-700 animate-pulse' : 'bg-gray-200 text-gray-600'}`}>
          {isOpenNow ? '🟢 Open Now' : '🔴 Closed Now'}
        </div>
        <p className="mt-4 text-gray-600">We're here when you need us most.</p>
      </div>

      <div className="mt-10 max-w-3xl mx-auto space-y-2">
        {expandedHours.map((d, i) => {
          const isToday = d.day === today
          return (
            <motion.div
              key={d.day}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex justify-between items-center px-6 py-4 rounded-2xl shadow-sm border
                ${isToday ? 'bg-emerald-100/70 border-emerald-200' : 'bg-white/80 border-gray-100 hover:bg-emerald-50'}
                backdrop-blur-sm transition-all duration-300`}
            >
              <span className="font-medium">
                {d.day} {isToday && <span className="ml-2 text-xs bg-emerald-500 text-white px-2 py-0.5 rounded-full">TODAY</span>}
              </span>
              <span className={`${d.open ? 'text-emerald-600' : 'text-red-500'} font-semibold`}>
                {d.hours}
              </span>
            </motion.div>
          )
        })}
      </div>

      <div className="mt-10 text-center">
        <a href="tel:01494772277" className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition">
          <Phone className="w-5 h-5" /> Call for Assistance
        </a>
      </div>
    </section>
  )
}