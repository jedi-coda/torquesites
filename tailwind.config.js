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
      colors: {
        "torque-orange": "#FF6B00",
        "torque-gradient-end": "#FF9500",
        "lime-accent": "#C4FF00",
        "dark-bg": "#0E0E0E",
        "card-surface": "#1A1A1A",
        "success-pulse": "#3AFF5C",
      },
    },
  },
  plugins: [],
};

