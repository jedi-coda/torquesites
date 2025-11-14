'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

// Default Google Maps embed for Newtown Garage
const DEFAULT_MAP_URL =
  "https://www.google.com/maps?q=Newtown+Garage+114A+Broad+Street+Chesham+HP5+3ED&output=embed";

interface MapEmbedProps {
  name: string
  address?: string
  mapUrl?: string
  garage?: any // Raw garage object for address resolution
}

export default function MapEmbed({ name, address, mapUrl, garage }: MapEmbedProps) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!name) return null

  // Safely resolve address using comprehensive fallback logic
  // Supports both data shapes: garage.address and garage.branches[0].address
  const resolvedAddress =
    address ||
    garage?.address ||
    garage?.branches?.[0]?.address ||
    "Address not available";
  
  // Debug logging for address resolution
  console.log("Resolved address:", resolvedAddress);

  // Enhanced prop logic with fallback
  const safeMapUrl = mapUrl && mapUrl.startsWith("https")
    ? mapUrl
    : DEFAULT_MAP_URL;
  
  const isUsingFallback = !mapUrl || !mapUrl.startsWith("https");

  // Check if address is available for clickable link
  const hasValidAddress = resolvedAddress && resolvedAddress !== "Address not available";

  // LocalBusiness JSON-LD schema for SEO - only create on client side
  const schema = isClient ? {
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": name,
    "image": `${window.location.origin}/favicon.ico`,
    "address": resolvedAddress,
    "telephone": garage?.contact?.phone || garage?.phone || "",
    "openingHours": garage?.openingHours
      ?.map((h: any) => `${h.day} ${h.hours}`)
      .filter(Boolean),
    "url": window.location.href,
    "priceRange": "$$",
  } : null;

  return (
    <section className="relative py-20 md:py-28 px-6 bg-gradient-to-b from-emerald-50 via-teal-50 to-white text-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center mb-4 w-12 h-12 rounded-xl bg-emerald-500/90 text-white shadow-md">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">Find Us Easily</h2>
          <p className="mt-4 text-gray-600">
            Visit Newtown Garage in Chesham, Buckinghamshire
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-white/80 backdrop-blur-sm">
            <motion.iframe
              src={safeMapUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[400px] md:h-[450px] transition-transform duration-300 hover:scale-[1.02]"
              title={`Map of ${name}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/5 to-transparent" />
          </div>
          
          {/* Fallback info line */}
          {isUsingFallback && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="mt-2 text-sm text-gray-500 italic text-center"
            >
              Showing default UK map — custom map will appear once configured.
            </motion.p>
          )}
        </motion.div>

        {/* LocalBusiness JSON-LD Schema for SEO */}
        {isClient && schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
          />
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Newtown Garage, 114A Broad Street, Chesham HP5 3ED")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 bg-white/60 px-4 py-2 rounded-full border border-gray-200 hover:bg-white/80 hover:text-gray-700 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>Get directions to Newtown Garage</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
