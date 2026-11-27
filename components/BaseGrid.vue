<template>
  <!-- Row of value blocks: accent icon tile, title and a short text, open layout (no boxes) -->
  <div class="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="(block, i) in blocks"
      :key="block.title"
      data-aos="fade-in"
      data-aos-duration="1500"
      :data-aos-delay="200 * i"
      class="group space-y-4 text-center text-gray-50 sm:text-left"
    >
      <div class="mx-auto flex size-14 items-center justify-center rounded-2xl bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20 transition group-hover:bg-accent-500/20 sm:mx-0">
        <component :is="icons[block.icon]" size="30" stroke-width="1.6" />
      </div>
      <h3 class="text-xl font-bold">
        {{ block.title }}
      </h3>
      <p class="text-gray-300">
        {{ block.content }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { BrandOpenSourceIcon, CometIcon, SocialIcon, WallIcon } from 'vue-tabler-icons'

const icons: Record<string, unknown> = { BrandOpenSourceIcon, CometIcon, SocialIcon, WallIcon }

defineProps({
  blocks: {
    type: Object as PropType<{
      title: string
      content: string
      /** Name of a Tabler icon registered in `icons` */
      icon: string
    }[]>,
    required: true
  }
})
</script>
