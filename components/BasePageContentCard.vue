<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div class="flex" :class="{'flex-row-reverse': card.imagePosition === 'left'}">
    <div class="flex flex-1 flex-col justify-center space-y-5 p-12">
      <h2 class="text-3xl font-bold dark:text-gray-50" v-html="card.title" />
      <div class="text-xl dark:text-gray-50" v-html="card.subtitle" />
      <div class="text-lg dark:text-gray-50" v-html="card.content" />
    </div>
    <div
      class="
        gradient-animate
        flex
        flex-1
        justify-center
        bg-gradient-to-tl
        from-rose-400
        via-orange-500
        to-purple-500
        pt-16
        dark:text-gray-50
      "
      :class="[card.imagePosition === 'right' ? 'rounded-r-3xl pl-16': 'rounded-l-3xl  pr-16']"
    >
      <img :src="card.imagePath" alt="Context menu" :class="[card.imagePosition === 'right' ? 'rounded-tl-2xl rounded-br-2xl': 'rounded-tr-2xl rounded-bl-2xl']">
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
defineProps({
  card: {
    type: Object as PropType<{
        title: string
        subtitle: string
        content: string
        imagePath: string
        imagePosition: 'left' | 'right'
      }>,
    required: true
  }
})
</script>
