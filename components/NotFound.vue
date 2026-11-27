<template>
  <div class="overflow-hidden">
    <Head>
      <Title>Error 404</Title>
    </Head>
    <BasePageContent>
      <div class="-mt-24 flex h-screen items-center justify-center">
        <div class="space-y-10 pt-44 text-center">
          <Error404Icon class="mx-auto text-accent-500" size="128" stroke-width="1.5" />
          <h1 class="text-5xl font-bold text-gray-50 sm:text-7xl">
            Page not found!
          </h1>
          <BaseButton to="/" size="lg">
            <Home2Icon /> Go to Home
          </BaseButton>
        </div>
      </div>
    </BasePageContent>
  </div>
</template>
<script setup>
import { Home2Icon, Error404Icon } from 'vue-tabler-icons'
import BaseButton from './BaseButton.vue'
</script>
