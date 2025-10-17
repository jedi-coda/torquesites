'use client'

import { useEffect } from 'react'

export default function GemBrandSetup() {
  useEffect(() => {
    // Set CSS variables from garage config if available
    const garageConfig = {
      brand: {
        accent: '#D7A34B', // from garage.json theme.accent
        bg: '#0b0b0b' // default dark background
      }
    }

    // Set CSS variables on document root
    document.documentElement.style.setProperty('--brand-accent', garageConfig.brand.accent)
    document.documentElement.style.setProperty('--brand-bg', garageConfig.brand.bg)
  }, [])

  return null
}
