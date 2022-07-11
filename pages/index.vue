<template>
  <div>
    <Head>
      <Title>Antares SQL - Free and Open Source Client</Title>
    </Head>
    <div class="hero-wrapper flex justify-center items-center">
      <BasePageContent>
        <div class="space-y-20 pb-40">
          <div class="space-y-10 pt-44 text-center">
            <h1 class="text-7xl font-bold dark:text-gray-50">
              Open source SQL client<br>
              made to be simple.
            </h1>
            <div class="dark:text-gray-50 text-2xl">
              A modern, fast and productivity driven, <strong class="bold">forever 100% free</strong> solution with a focus in UX.
            </div>
            <NuxtLink
              to="/downloads"
              class="
              inline-flex
              justify-center
              items-center
              whitespace-nowrap
              text-uppercase
              font-semibold
              rounded-2xl
              py-3
              px-5
              text-2xl
              focus:ring-2
              focus:ring-blue-400
              bg-gradient-to-tr
              from-orange-600
              to-orange-500
              text-white
              hover:opacity-80
            "
            >
              <DownloadIcon class="mr-2" /> Download Antares
            </NuxtLink>
          </div>
          <div class="flex justify-center dark:text-gray-50 px-28 rounded-3xl bg-gradient-to-tl from-rose-400 via-fuchsia-500 to-indigo-500">
            <img src="../assets/images/screen1.png" alt="Antares screenshot" class="-mb-20 mt-20 rounded-2xl">
          </div>
        </div>
      </BasePageContent>
    </div>
  </div>
</template>
<script setup>
import { DownloadIcon } from 'vue-tabler-icons'
</script>
<style lang="scss">
// .hero-wrapper{
//   background-image: url("/static/bg.jpg");
// }
</style>
