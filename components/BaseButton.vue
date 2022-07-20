<template>
  <button
    class="flex items-center justify-center uppercase"
    :class="[{'loading': isLoading}, buttonClasses]"
    :type="type"
    :disabled="isLoading"
  >
    <svg
      v-if="isLoading"
      class="mx-3 h-6 w-6 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
    <span
      class="flex"
      :class="{'hidden': isLoading}"
    ><slot /></span>
  </button>
</template>

<script setup  lang="ts">
import { PropType } from 'vue'

type ButtonStyle = 'primary' | 'secondary' | 'plain' | 'link';

const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  isLoading: {
    type: Boolean,
    default: () => false
  },
  buttonStyle: {
    type: String as PropType<ButtonStyle>,
    default: () => 'primary'
  }
})

const buttonClasses = computed(() => {
  switch (props.buttonStyle) {
    case 'link':
      return 'py-2 px-5 text-gray-400 dark:text-gray-200 text-sm focus:ring-2 focus:ring-slate-400 rounded-lg'
    case 'plain':
      return 'font-semibold rounded-xl py-2 px-5 w-22 focus:ring-2 focus:ring-blue-400 border border-gray-400 text-gray-900 hover:opacity-80'
    case 'secondary':
      return 'font-semibold rounded-xl py-2 px-5 w-22 focus:ring-2 focus:ring-blue-400 bg-gray-600 dark:bg-gray-500 text-gray-200 hover:opacity-80'
    case 'primary':
    default:
      return 'font-semibold rounded-xl py-2 px-5 w-22 focus:ring-2 focus:ring-blue-400 bg-gradient-to-tr from-orange-600 to-orange-500 text-white hover:opacity-80'
  }
})
</script>
