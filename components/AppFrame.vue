<template>
  <!-- Frame of the app media (videos, screenshots): reads as a desktop window over the gradient -->
  <div class="overflow-hidden bg-[#1e1e1e] shadow-2xl shadow-black/50 ring-1 ring-white/10" :class="rounded">
    <video
      v-if="video"
      ref="player"
      class="block w-full"
      :poster="poster"
      :preload="preload"
      muted
      loop
      playsinline
      aria-hidden="true"
    >
      <source :src="video" type="video/webm">
    </video>
    <img
      v-else
      :src="poster"
      :alt="alt"
      class="block w-full"
      loading="lazy"
    >
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useElementVisibility, useMediaQuery } from '@vueuse/core'

defineProps({
  /** WebM video; plays only while visible, never with reduced motion */
  video: { type: String, default: undefined },
  /** Still image: poster of the video, or the image itself */
  poster: { type: String, required: true },
  alt: { type: String, default: '' },
  preload: { type: String as PropType<'none' | 'metadata' | 'auto'>, default: 'none' },
  /** Rounded corners (Tailwind classes): the frame can bleed off an edge of its container */
  rounded: { type: String, default: 'rounded-xl' }
})

const player = ref<HTMLVideoElement | null>(null)
const isVisible = useElementVisibility(player)
const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

watch([isVisible, reducedMotion], ([visible, reduced]) => {
  if (!player.value) return
  if (visible && !reduced) player.value.play().catch(() => {})
  else player.value.pause()
})
</script>
