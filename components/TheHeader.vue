<template>
  <header class="sticky top-0 z-40 w-full border-b border-white/5 bg-surface/85 backdrop-blur">
    <nav class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4 py-2.5 lg:px-8">
      <NuxtLink to="/" class="flex items-center" @click="isMenuOpen = false">
        <img src="~/assets/images/logo.png" class="mr-3 h-7 sm:h-9" alt="">
        <span class="self-center whitespace-nowrap text-xl font-semibold text-gray-50">Antares SQL</span>
      </NuxtLink>
      <div class="hidden items-center gap-4 lg:order-2 lg:flex">
        <div class="leading-none">
          <GithubButton href="https://github.com/antares-sql/antares" data-show-count="true" data-size="large">
            Star
          </GithubButton>
        </div>
        <a rel="nofollow me" title="GitHub repository" target="_blank" class="text-gray-300 transition hover:text-gray-50" href="https://github.com/antares-sql/antares">
          <BrandGithubIcon />
        </a>
        <a rel="nofollow me" title="Follow on Mastodon" target="_blank" class="text-gray-300 transition hover:text-gray-50" href="https://fosstodon.org/@AntaresSQL">
          <BrandMastodonIcon />
        </a>
      </div>
      <button
        type="button"
        class="inline-flex items-center rounded-lg p-2 text-gray-400 hover:bg-surface-raised focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 lg:hidden"
        aria-controls="main-menu"
        :aria-expanded="isMenuOpen"
        @click="isMenuOpen = !isMenuOpen"
      >
        <span class="sr-only">{{ isMenuOpen ? 'Close main menu' : 'Open main menu' }}</span>
        <XIcon v-if="isMenuOpen" />
        <MenuIcon v-else />
      </button>
      <div id="main-menu" class="w-full lg:order-1 lg:flex lg:w-auto" :class="[isMenuOpen ? 'block' : 'hidden']">
        <ul class="mt-3 flex flex-col font-medium lg:mt-0 lg:flex-row lg:gap-8">
          <li v-for="link in links" :key="link.title">
            <NuxtLink
              v-if="!link.external"
              :to="link.to"
              class="nav-link"
              @click="isMenuOpen = false"
            >
              {{ link.title }}
            </NuxtLink>
            <a
              v-else
              :href="link.to"
              target="_blank"
              class="nav-link"
            >
              {{ link.title }}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import GithubButton from 'vue-github-button'
import { BrandMastodonIcon, BrandGithubIcon, MenuIcon, XIcon } from 'vue-tabler-icons'

const isMenuOpen = ref(false)

const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('pages')
)

const links = computed(() => [
  { title: 'Home', to: '/' },
  ...(navigation.value ?? []).filter(nav => !nav.children).map(nav => ({ title: nav.title, to: nav.path })),
  { title: 'Community', to: 'https://github.com/antares-sql/antares/discussions', external: true },
  { title: 'News', to: 'https://github.com/orgs/antares-sql/discussions?discussions_q=category%3A%22Development+updates%22+category%3AReleases+sort%3Adate_created+', external: true },
  { title: 'Downloads', to: '/downloads' }
])
</script>

<style lang="scss">
.nav-link {
  @apply block border-b border-line py-2 pl-3 pr-4 text-gray-400 transition-colors hover:text-gray-50 lg:border-0 lg:p-0;

  &.router-link-exact-active {
    @apply text-gray-50 lg:underline lg:decoration-accent-500 lg:decoration-2 lg:underline-offset-[10px];
  }
}
</style>
