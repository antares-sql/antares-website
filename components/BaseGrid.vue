<template>
  <!-- Row of value blocks: icon, title and a short text -->
  <div class="mb-20 grid gap-6 sm:grid-cols-2 lg:mb-32 lg:grid-cols-4">
    <div
      v-for="(block, i) in blocks"
      :key="block.title"
      data-aos="fade-in"
      data-aos-duration="1500"
      :data-aos-delay="200 * i"
      class="space-y-4 rounded-3xl bg-surface p-8 text-center text-gray-50 ring-1 ring-white/5 transition duration-300 hover:-translate-y-1 hover:ring-accent-500/40"
    >
      <component :is="icons[block.icon]" size="56" class="m-auto text-accent-500" stroke-width="1.5" />
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
