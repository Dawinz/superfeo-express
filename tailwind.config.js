/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        superfeo: {
          red: '#DC2626',        // Primary red from Super Feo buses
          darkred: '#B91C1C',    // Darker red for hover states
          lightred: '#FEE2E2',   // Light red for backgrounds
          white: '#FFFFFF',      // White from bus design
          gray: '#F3F4F6',       // Light gray for backgrounds
          darkgray: '#374151',   // Dark gray for text
          black: '#111827',      // Black for contrast
          gold: '#F59E0B',       // Gold accent color
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'bebas': ['Bebas Neue', 'sans-serif'],
      }
    },
  },
  plugins: [],
}