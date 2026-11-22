import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Ubuntu', 'sans-serif']
    }
  },
  plugins: [typography]
}
