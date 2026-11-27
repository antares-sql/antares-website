<!-- eslint-disable vue/no-v-html -->
<template>
  <!-- Feature card: text on one side, the framed app media over the signature gradient on the other -->
  <article class="overflow-hidden rounded-3xl bg-surface text-gray-50 lg:grid lg:grid-cols-2">
    <div
      class="flex flex-col justify-center gap-5 p-8 lg:p-12"
      :class="{ 'lg:order-2': card.mediaPosition === 'left' }"
    >
      <p v-if="card.eyebrow" class="text-sm font-bold uppercase tracking-widest text-accent-500">
        {{ card.eyebrow }}
      </p>
      <h2 class="text-3xl font-bold" v-html="card.title" />
      <p class="text-xl text-gray-200" v-html="card.subtitle" />
      <div class="space-y-3 text-lg text-gray-300" v-html="card.content" />
    </div>
    <div
      class="gradient-animate flex bg-gradient-to-tl from-rose-400 via-orange-500 to-purple-500 pt-10 lg:pt-16"
      :class="card.mediaPosition === 'left' ? 'pr-6 lg:pr-16' : 'pl-6 lg:pl-16'"
    >
      <AppFrame
        class="mt-auto w-full"
        :video="card.isVideo ? card.mediaPath : undefined"
        :poster="card.poster"
        :alt="card.alt"
        :rounded="card.mediaPosition === 'left' ? 'rounded-tr-xl' : 'rounded-tl-xl'"
      />
    </div>
  </article>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import AppFrame from './AppFrame.vue'

export interface Card {
  eyebrow?: string
  title: string
  subtitle: string
  content: string
  /** Video (webm) shown in the frame when isVideo, otherwise unused */
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
