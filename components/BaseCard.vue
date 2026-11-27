<template>
  <!-- Feature: text on one side, the framed app video on the other over a slab of the signature gradient -->
  <article class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
    <SectionHeader
      :eyebrow="card.eyebrow"
      :title="card.title"
      :lead="card.subtitle"
      :class="{ 'lg:order-2': card.mediaPosition === 'left' }"
    >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="space-y-3 text-lg text-gray-300" v-html="card.content" />
    </SectionHeader>
    <div class="relative mx-auto w-full max-w-xl">
      <div
        class="gradient-animate absolute inset-0 rounded-3xl bg-gradient-to-tl from-rose-400 via-orange-500 to-purple-500"
        :class="card.mediaPosition === 'left' ? '-translate-x-4 translate-y-4 -rotate-2' : 'translate-x-4 translate-y-4 rotate-2'"
        aria-hidden="true"
      />
      <AppFrame
        class="relative shadow-black/60"
        :video="card.isVideo ? card.mediaPath : undefined"
        :poster="card.poster"
        :alt="card.alt"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import AppFrame from './AppFrame.vue'
import SectionHeader from './SectionHeader.vue'

export interface Card {
  eyebrow?: string
  title: string
  subtitle: string
  content: string
  /** Video (webm) shown in the frame when isVideo */
  mediaPath?: string
  /** Still image: video poster, or the image shown when there is no video */
  poster: string
  alt?: string
  mediaPosition: 'left' | 'right'
  isVideo?: boolean
}

defineProps({
  card: {
    type: Object as PropType<Card>,
    required: true
  }
})
</script>
