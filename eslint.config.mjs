// @ts-check
import tailwind from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        // State marker classes and the few site classes defined in CSS (assets/scss/main.scss, TheHeader.vue)
        whitelist: ['loading', 'gradient-animate', 'nav-link']
      }
    }
  },
  {
    files: ['components/theme-editor/**', 'pages/theme-editor.vue'],
    rules: {
      'tailwindcss/no-custom-classname': 'off'
    }
  }
)
