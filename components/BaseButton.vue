<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener' : undefined"
    :type="to ? undefined : type"
    :disabled="to ? undefined : isLoading"
    class="inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
    :class="[variantClasses, sizeClasses, { loading: isLoading }]"
  >
    <svg
      v-if="isLoading"
      class="size-5 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
    <slot v-else />
  </component>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { NuxtLink } from '#components'

/**
 * Button, or link styled as a button when `to` is set (internal path or external URL).
 * Variants: `primary` (orange gradient), `light` (white on the hero gradient), `secondary` (surface), `ghost` (outlined).
 */
const props = defineProps({
  to: { type: String, default: undefined },
  type: { type: String as PropType<'button' | 'submit' | 'reset'>, default: 'button' },
  variant: { type: String as PropType<'primary' | 'light' | 'secondary' | 'ghost'>, default: 'primary' },
  size: { type: String as PropType<'sm' | 'md' | 'lg'>, default: 'md' },
  isLoading: { type: Boolean, default: false }
})

const external = computed(() => !!props.to && /^https?:\/\//.test(props.to))

const variantClasses = computed(() => ({
  primary: 'bg-gradient-to-tr from-accent-600 to-accent-500 text-white',
  light: 'bg-gray-50 text-gray-900',
  secondary: 'bg-surface-raised text-gray-50',
  ghost: 'border border-white/40 text-gray-50 hover:bg-white/10'
})[props.variant])

const sizeClasses = computed(() => ({
  sm: 'rounded-lg px-3 py-1.5 text-sm',
  md: 'rounded-xl px-5 py-2.5 text-base',
  lg: 'rounded-2xl px-6 py-3 text-xl lg:text-2xl'
})[props.size])
</script>
