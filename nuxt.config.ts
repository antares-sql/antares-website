// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    '~/modules/sitemap'
  ],
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  compatibilityDate: '2026-11-22',
  postcss: {
    plugins: {
      // Not used (nesting is handled by Sass) and not loadable as ESM from Tailwind v3
      'tailwindcss/nesting': false
    }
  },
  eslint: {
    config: {
      stylistic: false
    }
  },
  tailwindcss: {
    // Tailwind directives live in assets/scss/main.scss
    cssPath: false
  },
  sitemap: {
    hostname: 'https://antares-sql.app'
  }
})
