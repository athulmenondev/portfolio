/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-bg)',
        primary: 'var(--color-primary)',
        accent: 'var(--color-accent)',
        highlight: 'var(--color-highlight)',
        paper: '#F9F7F2',
      },
      fontFamily: {
        // We will use Option A: Modern/Swiss
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.05em', // Crucial for the massive sans-serif headers
        'widest': '0.1em',     // For small metadata text
      },
      fontSize: {
        'display-lg': ['clamp(4rem, 8vw, 10rem)', { lineHeight: '0.9' }], // Massive dynamic text
        'editorial-p': ['clamp(1.1rem, 2vw, 1.5rem)', { lineHeight: '1.6' }],
      }
    },
  },
  plugins: [],
}
