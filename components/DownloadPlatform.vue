<template>
  <!-- Download column of one operating system: stable files first, pre-release builds below -->
  <section
    class="flex flex-col gap-6 rounded-3xl p-6 text-gray-50 ring-1 transition lg:p-8"
    :class="current ? 'bg-surface-raised ring-accent-500/60' : 'bg-surface ring-white/5'"
    :aria-labelledby="`platform-${name}`"
  >
    <header class="flex flex-col items-center gap-3 text-center">
      <AntaresIcon :name="`brand:${icon}`" size="56" style="--icon-stroke-width: 1" />
      <h2 :id="`platform-${name}`" class="text-3xl font-bold">
        {{ name }}
      </h2>
      <span v-if="current" class="rounded-full bg-accent-500/15 px-3 py-0.5 text-sm font-medium text-accent-400">Your system</span>
    </header>

    <div v-for="group in groups" :key="group.label" class="space-y-2">
      <h3 class="flex items-baseline justify-between border-b border-line pb-1 text-sm font-bold uppercase tracking-widest text-gray-400">
        {{ group.label }}
        <span v-if="group.version" class="font-mono text-xs normal-case tracking-normal text-gray-400">{{ group.version }}</span>
      </h3>
      <p v-if="group.loading" class="py-2 text-sm text-gray-400">
        Loading…
      </p>
      <ul v-else class="divide-y divide-white/5">
        <li v-for="row in group.rows" :key="row.url" class="flex items-center gap-3 py-2">
          <span class="w-16 shrink-0 text-gray-300">{{ row.arch }}</span>
          <span class="grow">{{ row.format }}</span>
          <span v-if="row.channel" class="rounded-md px-2 py-0.5 text-xs font-medium" :class="channelClass[row.channel]" :title="row.version">{{ row.channel }}</span>
          <a
            :href="row.url"
            :title="row.external ? row.title : `Download ${row.fileName}`"
            :target="row.external ? '_blank' : undefined"
            class="flex size-9 shrink-0 items-center justify-center rounded-xl bg-accent-600 text-white transition hover:bg-accent-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <ExternalLinkIcon v-if="row.external" size="20" />
            <DownloadIcon v-else size="20" />
            <span class="sr-only">{{ row.external ? row.title : `Download ${row.fileName}` }}</span>
          </a>
        </li>
      </ul>
    </div>

    <div v-if="$slots.default" class="mt-auto flex flex-wrap items-center justify-center gap-3 pt-2">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { DownloadIcon, ExternalLinkIcon } from 'vue-tabler-icons'
import AntaresIcon from './theme-editor/AntaresIcon.vue'

export interface DownloadRow {
  arch: string
  format: string
  url: string
  fileName?: string
  /** Pre-release channel shown as a badge */
  channel?: 'beta' | 'nightly'
  /** Release version, shown on hover of the channel badge */
  version?: string
  /** Link to a page instead of a file (e.g. the APT repository instructions) */
  external?: boolean
  title?: string
}

export interface DownloadGroup {
  label: string
  /** Version of the release the rows come from */
  version?: string
  loading?: boolean
  rows: DownloadRow[]
}

defineProps({
  name: { type: String, required: true },
  /** Brand icon of the Antares set (windows, linux, apple) */
  icon: { type: String, required: true },
  /** The visitor's operating system */
  current: { type: Boolean, default: false },
  groups: { type: Array as PropType<DownloadGroup[]>, required: true }
})

const channelClass = {
  beta: 'bg-accent-500/15 text-accent-400',
  nightly: 'bg-purple-500/20 text-purple-300'
}
</script>
