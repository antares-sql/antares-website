<template>
  <div class="dark min-h-screen dark:bg-gray-900">
    <!-- Full-screen tools (e.g. the theme editor) opt out of the header and footer with definePageMeta({ bare: true }) -->
    <NuxtPage v-if="route.meta.bare" />
    <BasePageContainer v-else>
      <NuxtPage />
    </BasePageContainer>
  </div>
</template>

<script setup lang="ts">
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@/assets/scss/main.scss'
import BasePageContainer from './components/BasePageContainer.vue'

const route = useRoute()

const structuredData = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Antares SQL',
  operatingSystem: 'Windows 10, Windows 7, Linux, OSX',
  applicationCategory: 'DeveloperApplication',
  offers: {
    '@type': 'Offer',
    price: '0'
  },
  sameAs: [
    'https://antares-sql.app',
    'https://github.com/antares-sql/antares'
  ],
  license: 'https://github.com/antares-sql/antares/blob/master/LICENSE',
  author: {
    '@type': 'Person',
    givenName: 'Fabio',
    familyName: 'Di Stasio',
    birthDate: '1986-02-28',
    sameAs: [
      'https://github.com/Fabio286',
      'https://fabiodistasio.it',
      'https://www.linkedin.com/in/distasiofabio/'
    ]
  }
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: structuredData
    },
    {
      async: true,
      defer: true,
      src: 'https://buttons.github.io/buttons.js'
    }
  ]
})

// Defaults for link previews; pages override the description
useSeoMeta({
  description: 'Antares SQL is a modern, fast and productivity driven SQL client for MySQL/MariaDB, PostgreSQL, SQLite and Firebird SQL, forever 100% free and open source.',
  ogSiteName: 'Antares SQL',
  ogType: 'website',
  ogImage: 'https://antares-sql.app/images/og.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: 'Antares SQL: open source SQL client made to be simple',
  twitterCard: 'summary_large_image'
})

onMounted(() => {
  AOS.init({
    once: true,
    disable: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })
})
</script>
