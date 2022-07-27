<template>
  <div
    class="
      mb-16
      grid
      max-w-none
      lg:mb-32
    "
    :style="{ 'grid-template-columns': `repeat(${gridSize}, minmax(0, 1fr))`, gap: `${gapSize * 0.25}rem` }"
  >
    <div
      v-for="(block, i) in blocks"
      :key="i"
      data-aos="fade-in"
      data-aos-duration="1500"
      :data-aos-delay="200 * i"
      class="
    col-span-4
    space-y-6
    rounded-3xl
    bg-slate-800
    p-6
    text-center
    dark:text-gray-50
    lg:col-span-1
  "
    >
      <component :is="block.icon" size="64" class="m-auto" />
      <h4 class="text-xl font-bold">
        {{ block.title }}
      </h4>
      <p>{{ block.content }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
defineProps({
  blocks: {
    type: Object as PropType<{
      title: string
      content: string
      icon: string
    }[]>,
    required: true
  },
  gridSize: {
    type: Number,
    default: () => 4
  },
  gapSize: {
    type: Number,
    default: () => 6
  }
})
</script>
