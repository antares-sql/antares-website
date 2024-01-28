<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <header class="w-full">
    <nav class="border-gray-200 bg-white px-4 py-2.5 dark:bg-slate-800 lg:px-6">
      <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4">
        <a href="/" class="flex items-center">
          <img src="~/assets/images/logo.png" class="mr-3 h-6 sm:h-9" alt="Antares Logo">
          <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-gray-50">Antares SQL</span>
        </a>
        <div class="hidden items-center lg:order-2 lg:flex">
          <div class="mx-2 leading-none">
            <GithubButton href="https://github.com/antares-sql/antares" data-show-count="true" data-size="large">
              Star
            </GithubButton>
          </div>
          <a rel="nofollow me" title="GitHub Repository" target="_blank" class="mx-2" href="https://github.com/antares-sql/antares">
            <BrandGithubIcon class="text-gray-50" />
          </a>
          <a rel="nofollow me" title="Follow on Mastodon" target="_blank" class="mx-2" href="https://fosstodon.org/@AntaresSQL">
            <BrandMastodonIcon class="text-gray-50" />
          </a>
          <a rel="nofollow me" title="Follow on Twitter" target="_blank" class="mx-2" href="https://twitter.com/AntaresSql">
            <BrandTwitterIcon class="text-gray-50" />
          </a>
        </div>
        <div class="lg:hidden">
          <button type="button" class="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden" aria-controls="mobile-menu-2" @click="isMenuOpen = !isMenuOpen">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
            <svg class="hidden h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </button>
        </div>
        <div class="w-full items-center justify-between lg:order-1 lg:flex lg:w-auto" :class="[isMenuOpen ? 'block' : 'hidden']">
          <ul class="mt-4 flex flex-col font-medium dark:text-gray-400 lg:mt-0 lg:flex-row lg:space-x-8">
            <li @click="isMenuOpen = false">
              <NuxtLink to="/" class="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 dark:border-gray-700 dark:hover:text-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-gray-50">
                Home
              </NuxtLink>
            </li>
            <ContentNavigation v-slot="{ navigation }">
              <li v-for="(nav, i) in navigation" :key="i">
                <a v-if="nav?.children" class="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 dark:border-gray-700 dark:hover:text-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-gray-50">
                  {{ nav.title }}
                </a>
                <NuxtLink v-else :to="nav._path" class="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 dark:border-gray-700 dark:hover:text-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-gray-50" @click="isMenuOpen = false">
                  {{ nav.title }}
                </NuxtLink>
              </li>
            </ContentNavigation>
            <li>
              <a href="https://github.com/antares-sql/antares/discussions" target="_blank" class="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 dark:border-gray-700 dark:hover:text-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-gray-50">Community</a>
            </li>
            <li>
              <a href="https://github.com/orgs/antares-sql/discussions?discussions_q=category%3A%22Development+updates%22+category%3AReleases+sort%3Adate_created+" target="_blank" class="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 dark:border-gray-700 dark:hover:text-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-gray-50">News</a>
            </li>
            <li @click="isMenuOpen = false">
              <NuxtLink to="/downloads" class="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 dark:border-gray-700 dark:hover:text-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-gray-50">
                Downloads
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>
import GithubButton from 'vue-github-button'
import { BrandTwitterIcon, BrandMastodonIcon, BrandGithubIcon } from 'vue-tabler-icons'

const isMenuOpen = ref(false)
</script>
<style lang="scss">
.router-link-exact-active{
  @apply text-gray-50
}
</style>
