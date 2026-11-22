// @ts-check
import tailwind from 'eslint-plugin-tailwindcss'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        // State marker classes, not Tailwind utilities
        whitelist: ['loading']
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
