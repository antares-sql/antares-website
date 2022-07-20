<template>
  <div class="container min-h-screen bg-gray-200 dark:bg-gray-800">
    <TheHeader />
    <div class="flex grow flex-col justify-between">
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
