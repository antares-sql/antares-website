<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div class="lg:flex" :class="{'flex-row-reverse': card.mediaPosition === 'left'}">
    <div class="flex flex-1 flex-col justify-center space-y-5 p-12">
      <h2 class="text-3xl font-bold dark:text-gray-50" v-html="card.title" />
      <div class="text-xl dark:text-gray-50" v-html="card.subtitle" />
      <div class="text-lg dark:text-gray-50" v-html="card.content" />
    </div>
    <div
      class="
        gradient-animate
        freezeframe
        flex
        flex-1
        justify-center
        overflow-hidden
        rounded-b-3xl
        bg-gradient-to-tl
        from-rose-400
        via-orange-500
        to-purple-500
        pt-16
        dark:text-gray-50
        lg:rounded-b-none
      "
      :class="[card.mediaPosition === 'right' ? 'lg:rounded-r-3xl lg:pl-16': 'lg:rounded-l-3xl  lg:pr-16']"
    >
      <div
        v-if="card.isVideo"
        class="-mb-1 w-full overflow-hidden rounded-b-3xl lg:rounded-b-none"
        :class="[card.mediaPosition === 'right' ? 'lg:rounded-tl-2xl lg:rounded-br-2xl': 'lg:rounded-tr-2xl lg:rounded-bl-2xl']"
      >
        <video ref="player" muted loop>
          <source :src="card.mediaPath" type="video/webm">
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
      <img
        v-else
        :src="card.mediaPath"
        alt="Context menu"
        class="w-full rounded-b-3xl lg:rounded-b-none"
        :class="[card.mediaPosition === 'right' ? 'lg:rounded-tl-2xl lg:rounded-br-2xl': 'lg:rounded-tr-2xl lg:rounded-bl-2xl']"
      >
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType, ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'

defineProps({
  card: {
    type: Object as PropType<{
      title: string
        subtitle: string
        content: string
        mediaPath: string
        mediaPosition: 'left' | 'right',
        isVideo?: boolean
      }>,
    required: true
  }
})

const player = ref(null)
const isPlayerVisible = useElementVisibility(player)

watch(isPlayerVisible, (val) => {
  if (val) {
    player.value.play()
  } else {
    player.value.pause()
  }
})
</script>
