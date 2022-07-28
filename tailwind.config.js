/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './pages/**/*.{vue,js}',
    './components/**/*.{vue,js}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Ubuntu', 'sans-serif']
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
