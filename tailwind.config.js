/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Clash', ...defaultTheme.fontFamily.sans],
        monument: ['Monument', 'sans-serif'], // seems to not working
        clash: ['Clash', 'sans-serif'],
        dreadnoughtus: ['Dreadnoughtus', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
