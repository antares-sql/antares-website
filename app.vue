<template>
  <div class="dark">
    <BasePageContainer>
      <NuxtPage />
    </BasePageContainer>
  </div>
</template>

<script setup lang="ts">
import '@/assets/scss/main.scss'
import BasePageContainer from './components/BasePageContainer.vue'

// const { data: navigation } = await useAsyncData('navigation', () => {
//   return fetchContentNavigation()
// })

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
    'https://github.com/Fabio286/antares'
  ],
  license: 'https://github.com/Fabio286/antares/blob/master/LICENSE',
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
</script>
