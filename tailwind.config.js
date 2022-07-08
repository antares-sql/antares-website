/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app.vue',
    './pages/**/*.{vue,js}',
    './components/**/*.{vue,js}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
