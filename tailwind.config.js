/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontSize: {
        xxs: ['0.5rem', '0,75rem'],
      },
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
