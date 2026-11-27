<template>
  <!-- Timeline of steps (supported databases): horizontal on desktop, vertical on phones -->
  <ol class="relative grid gap-6 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))] lg:gap-0" :style="{ '--steps': steps.length }">
    <li
      v-for="(step, i) in steps"
      :key="step.title"
      class="relative flex items-center gap-5 lg:flex-col lg:gap-4 lg:text-center"
      data-aos="fade-in"
      data-aos-duration="1200"
      :data-aos-delay="100 * i"
    >
      <!-- segment from the previous step, colored by its nextStatus -->
      <span
        v-if="i > 0"
        aria-hidden="true"
        class="absolute -top-6 left-8 h-6 w-0.5 lg:-left-1/2 lg:right-1/2 lg:top-8 lg:h-0.5 lg:w-auto"
        :class="steps[i - 1].nextStatus === 'complete' ? 'bg-accent-600' : 'bg-white/10'"
      />
      <div
        class="relative flex size-16 shrink-0 items-center justify-center rounded-full ring-4 ring-page"
        :class="step.status === 'complete' ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/30' : 'bg-surface text-gray-400 outline-dashed outline-1 outline-offset-[-1px] outline-white/20'"
      >
        <div v-if="step.icons.length > 1" class="relative size-11">
          <AntaresIcon :name="step.icons[0]" size="26" class="absolute left-0 top-0" />
          <AntaresIcon :name="step.icons[1]" size="26" class="absolute bottom-0 right-0" />
        </div>
        <AntaresIcon v-else :name="step.icons[0]" size="34" />
      </div>
      <div class="space-y-1">
        <p class="text-lg font-bold" :class="step.status === 'complete' ? 'text-gray-50' : 'text-gray-300'">
          {{ step.title }}
        </p>
        <p class="text-sm font-medium" :class="step.status === 'complete' ? 'text-accent-500' : 'text-gray-400'">
          {{ step.subtitle }}
        </p>
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import AntaresIcon from '~/components/theme-editor/AntaresIcon.vue'

export interface Step {
  title: string
  subtitle: string
  status: 'incomplete' | 'complete'
  /** Status of the segment towards the next step (false on the last one) */
  nextStatus: 'incomplete' | 'complete' | false
  /** Antares icon names (`brand:mysql`, `database`...): one, or two drawn overlapped */
  icons: string[]
}

defineProps({
  steps: {
    type: Object as PropType<Step[]>,
    required: true
  }
})
</script>
