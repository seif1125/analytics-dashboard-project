/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Add this section below
  safelist: [
    'bg-purple-500',
    'bg-pink-500',
    'bg-emerald-500',
    'bg-emerald-400',
    'bg-emerald-200',
    'bg-amber-500',
    'shadow-purple-200',
    'shadow-pink-200',
    'shadow-emerald-200',
    'shadow-amber-200',
    'bg-orange-400',
    'bg-sky-400',
    'bg-rose-400',
    'shadow-orange-200',
    'shadow-sky-200',
    'shadow-rose-200',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}