<template>
  <div class="flex-grow">
    <div
      class="mx-auto max-w-screen-xl px-4"
      :style="{'grid-template-columns': `repeat(${gridSize}, minmax(0, 1fr))`, gap: `${gapSize*0.25}rem`}"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  gridSize: {
    type: Number,
    default: () => 3
  },
  gapSize: {
    type: Number,
    default: () => 6
  }
})
</script>
