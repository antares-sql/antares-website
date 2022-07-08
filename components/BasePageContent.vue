<template>
  <div class="flex-grow p-6">
    <div
      class="mx-auto w-full lg:w-2/4"
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
