/** @type {import('tailwindcss').Config} */

// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'cambria': ['Cambria', 'Georgia', 'serif'],
      },
    },
  },
  content: [
    './pages/**/*.{html,js,ts,jsx,tsx}',
    './components/**/*.{html,js,ts,jsx,tsx}',
    './src/**/*.{html,js,ts,jsx,tsx}',
  ], plugins: [],
}



