import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
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
    fallback: '404.html',
    routes: ['/404.html']
  },
  vite: {
    plugins: [
      eslintPlugin()
    ]
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content'
  ],
  buildModules: [
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  content: {
    sources: ['content']
  }
})
