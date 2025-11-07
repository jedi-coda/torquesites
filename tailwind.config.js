/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Use the Inter variable defined in layout.tsx
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        pulse: 'pulse 12s ease-in-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.0125)' },
        },
      },
      colors: {
        'torque-orange': '#FF6B00',
        'torque-gradient-end': '#FF9500',
        'lime-accent': '#C4FF00',
        'dark-bg': '#0E0E0E',
        'card-surface': '#1A1A1A',
        'success-pulse': '#3AFF5C',
        // Legacy brand colors for backward compatibility
        brand: {
          primary: "#FF6B00",     // Torque Orange (Main CTAs, links, gradients)
          gradientEnd: "#FF9500", // Warm amber finish
          accent: "#C4FF00",      // Lime highlight for motion or badges
          dark: "#0E0E0E",        // Graphite carbon background
          surface: "#1A1A1A",     // Cards / hover layers
          success: "#3AFF5C",     // Success/Pulse color
          lime: '#C4FF00',
          'lime-dark': '#A8E600',
          'lime-light': '#D4FF40',
        },
        accent: {
          orange: '#FF6B00',
          'orange-dark': '#E65C00',
          'orange-light': '#FF8533',
        },
        // Legacy colors for backward compatibility
        pink: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          200: "#FED7AA",
          300: "#FDBA74",
          400: "#FB923C",
          500: "#FF6B00",  // Primary Torque Orange
          600: "#EA580C",
          700: "#C2410C",
          800: "#9A3412",
          900: "#7C2D12",
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-gradient': 'linear-gradient(135deg, #0B0B0C 0%, #1B1B1C 50%, #0B0B0C 100%)',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.bg-gradient-radial': {
          'background-image': 'radial-gradient(var(--tw-gradient-stops))',
        },
      })
    },
  ],
};

