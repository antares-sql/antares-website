<template>
  <div class="dark min-h-screen dark:bg-gray-900">
    <BasePageContainer>
      <NuxtPage />
    </BasePageContainer>
  </div>
</template>

<script setup lang="ts">
import AOS from 'aos'
import 'aos/dist/aos.css'
import '@/assets/scss/main.scss'
import BasePageContainer from './components/BasePageContainer.vue'

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

onMounted(() => {
  AOS.init()
})
</script>
