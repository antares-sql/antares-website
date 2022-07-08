<template>
  <div class="container w-screen h-screen bg-gray-200 dark:bg-gray-700">
    <div class="flex flex-col justify-between flex-grow h-full overflow-auto">
      <slot />
      <TheFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import TheFooter from './TheFooter.vue'
</script>

<style lang="scss" scoped>
.container {
    max-width: 100%;
    // height: calc(100vh - #{$footer-height})
}
</style>
