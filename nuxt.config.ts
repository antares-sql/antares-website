import { defineNuxtConfig } from 'nuxt'
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
