<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/no-v-for-template-key -->
<template>
  <div
    class="mx-4 p-4 pt-12 pb-40"
    data-aos="fade-in"
    data-aos-duration="1500"
  >
    <div class="flex items-center">
      <template v-for="(step,i) in steps" :key="i">
        <div
          class="relative flex items-center"
          :class="[
            {'text-gray-500': step.status === 'incomplete'},
            {'text-orange-600': step.status === 'partial'},
            {'text-white': step.status === 'complete'},
          ]"
        >
          <div
            class="flex h-20 w-20 items-center justify-center rounded-full border-4"
            :class="[
              {'border-gray-300': step.status === 'incomplete'},
              {'border-gray-900': step.status === 'complete'},
              {'border-orange-600': step.status === 'partial'},
              {'bg-orange-600': step.status === 'complete'}
            ]"
            v-html="step.icon"
          />
          <div class="absolute top-0 -ml-8 mt-20 flex h-16 w-32  items-center justify-center text-center text-xl font-medium text-gray-300">
            {{ step.title }}
          </div>
          <div class="absolute top-6 -ml-8 mt-28 w-32 text-center font-medium text-gray-300">
            {{ step.subtitle }}
          </div>
        </div>
        <div
          v-if="step.nextStatus"
          class="flex-auto border-t-4"
          :class="[
            {'border-gray-300': step.nextStatus === 'incomplete'},
            {'border-orange-600': step.nextStatus === 'complete'}
          ]"
        />
      </template>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
export interface Step {
      title: string
      subtitle: string
      status: 'incomplete' | 'partial' | 'complete'
      nextStatus: 'incomplete' | 'complete' | false
      icon: string
    }

defineProps({
  steps: {
    type: Object as PropType<Step[]>,
    required: true
  }
})
</script>
