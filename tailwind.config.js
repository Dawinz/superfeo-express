/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        superfeo: {
          pink: '#E0218A',       // Primary pink from Super Feo branding
          darkpink: '#AD1A6D',   // Darker pink for hover states
          lightpink: '#F8BBD0',  // Light pink for backgrounds
          white: '#FFFFFF',      // White from bus design
          gray: '#F3F4F6',       // Light gray for backgrounds
          darkgray: '#374151',   // Dark gray for text
          black: '#111827',      // Black for contrast
          gold: '#F59E0B',       // Gold accent color
        },
        selous: {
          purple: '#9333EA',     // Selous Express brand purple
          darkpurple: '#7C3AED',  // Darker purple for hover states
        }
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'heading': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'body': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'display': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}