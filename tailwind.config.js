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
        brand: {
          pink: "#D81B60",   // Electric Pink (premium accent)
          navy: "#0C1A2B",   // Dark Navy (backgrounds, headings)
          gray: "#F5F7FA",   // Light Gray (backgrounds, sections)
          gold: "#FFB81C",   // Highlight/secondary accent
        },
      },
    },
  },
  plugins: [],
};

