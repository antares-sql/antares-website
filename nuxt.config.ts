import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  target: 'static',
  app: {
    baseURL: '/antares-website/'
  },
  generate: {
    fallback: '404.html'
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
    '@nuxtjs/tailwindcss'
  ],
  content: {}
})
