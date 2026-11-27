<!-- eslint-disable vue/no-v-html -- titles and leads are trusted markup from the pages -->
<template>
  <!-- Section intro, as in the Themes section: eyebrow, title, lead; extra text and actions in the default slot -->
  <div class="space-y-5 text-gray-50" :class="align === 'center' ? 'mx-auto max-w-3xl text-center' : 'text-center lg:text-left'">
    <p v-if="eyebrow" class="text-sm font-bold uppercase tracking-widest text-accent-500">
      {{ eyebrow }}
    </p>
    <h2 class="text-4xl font-bold leading-tight" v-html="title" />
    <p v-if="lead" class="text-xl text-gray-200" v-html="lead" />
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  eyebrow: { type: String, default: undefined },
  /** Trusted markup (line breaks for desktop) */
  title: { type: String, required: true },
  lead: { type: String, default: undefined },
  align: { type: String as PropType<'left' | 'center'>, default: 'left' }
})
</script>
