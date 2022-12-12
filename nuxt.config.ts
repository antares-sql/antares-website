import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  devServerHandlers: [],
  generate: {
    routes: ['/404.html']
  },
  vite: {
    plugins: [
      eslintPlugin()
    ]
  },
  sitemap: {
    hostname: 'https://antares-sql.app'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '~/modules/sitemap'
  ],
  buildModules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    sources: ['content']
  }
})
