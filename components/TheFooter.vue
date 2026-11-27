<template>
  <footer id="app-footer" class="border-t border-white/5 bg-surface text-gray-300">
    <div class="mx-auto grid max-w-screen-xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:px-8">
      <div class="space-y-3">
        <NuxtLink to="/" class="flex items-center gap-3 text-gray-50">
          <img src="~/assets/images/logo.png" class="h-8" alt="">
          <span class="text-lg font-semibold">Antares SQL</span>
        </NuxtLink>
        <p class="max-w-xs text-sm">
          A modern, fast and productivity driven SQL client, forever 100% free and open source.
        </p>
      </div>
      <nav v-for="column in columns" :key="column.title" :aria-label="column.title" class="space-y-3">
        <h2 class="text-sm font-bold uppercase tracking-widest text-gray-50">
          {{ column.title }}
        </h2>
        <ul class="space-y-2 text-sm">
          <li v-for="link in column.links" :key="link.title">
            <NuxtLink v-if="link.to.startsWith('/')" :to="link.to" class="transition hover:text-accent-500">
              {{ link.title }}
            </NuxtLink>
            <a v-else :href="link.to" target="_blank" rel="noopener" class="transition hover:text-accent-500">{{ link.title }}</a>
          </li>
        </ul>
      </nav>
    </div>
    <div class="border-t border-white/5">
      <div class="mx-auto flex max-w-screen-xl flex-wrap justify-between gap-2 p-4 text-sm lg:px-8">
        <span><span class="font-bold text-gray-50">Antares</span> by <a href="https://fabiodistasio.it" rel="author" class="font-bold text-accent-500 hover:underline" target="_blank">Fabio Di Stasio</a></span>
        <span>Released under the <a href="https://github.com/antares-sql/antares/blob/master/LICENSE" target="_blank" class="hover:text-accent-500">MIT License</a></span>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const columns = [
  {
    title: 'Product',
    links: [
      { title: 'Downloads', to: '/downloads' },
      { title: 'Nightly builds', to: 'https://github.com/antares-sql/antares-nightly/releases' },
      { title: 'Theme editor', to: '/theme-editor' },
      { title: 'Theme gallery', to: 'https://github.com/antares-sql/themes' }
    ]
  },
  {
    title: 'Community',
    links: [
      { title: 'GitHub', to: 'https://github.com/antares-sql/antares' },
      { title: 'Discussions', to: 'https://github.com/antares-sql/antares/discussions' },
      { title: 'Report a bug', to: 'https://github.com/antares-sql/antares/issues' },
      { title: 'Mastodon', to: 'https://fosstodon.org/@AntaresSQL' }
    ]
  },
  {
    title: 'Project',
    links: [
      { title: 'About', to: '/about' },
      { title: 'Donate', to: 'https://www.paypal.com/paypalme/fabiodistasio' },
      { title: 'Privacy', to: '/_privacy' }
    ]
  }
]
</script>
