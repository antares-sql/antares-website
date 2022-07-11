<template>
  <div class="container bg-gray-200 dark:bg-gray-900">
    <TheHeader />
    <div class="flex flex-col justify-between flex-grow">
      <slot />
    </div>
    <TheFooter />
  </div>
</template>

<style lang="scss" scoped>
.container {
    max-width: 100%;
    // height: calc(100vh - #{$footer-height})
}
</style>
