<template>
  <div class="overflow-hidden">
    <Head>
      <Title>Errorr 404</Title>
    </Head>
    <BasePageContent>
      <div class="-mt-24 flex h-screen items-center justify-center">
        <div class="space-y-10 pt-44 text-center">
          <h1 class="text-7xl font-bold dark:text-gray-50">
            Page not found!
          </h1>
          <NuxtLink
            to="/"
            class="
                inline-flex
                items-center
                justify-center
                whitespace-nowrap
                rounded-2xl
                bg-gradient-to-tr
                from-orange-700
                to-orange-500
                py-3
                px-5
                text-2xl
                font-semibold
                uppercase
                text-white
                hover:opacity-80
                focus:ring-2
                focus:ring-blue-400
              "
          >
            <Home2Icon class="mr-2" />
            Go to Home
          </NuxtLink>
        </div>
      </div>
    </BasePageContent>
  </div>
</template>
<script setup>
import { Home2Icon } from 'vue-tabler-icons'
</script>
