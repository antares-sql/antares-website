import typography from '@tailwindcss/typography'
import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app.vue',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Named roles of the site palette (see DESIGN.md → Color)
      colors: {
        page: colors.gray[900],
        surface: {
          DEFAULT: colors.slate[800],
          raised: colors.slate[700],
          highlight: colors.slate[600]
        },
        line: colors.slate[700],
        accent: colors.orange
      }
    },
    fontFamily: {
      sans: ['Ubuntu', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Consolas', 'monospace']
    }
  },
  plugins: [typography]
}
