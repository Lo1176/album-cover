/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        monument: ['Monument', 'sans-serif'],
        clash: ['Clash', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
