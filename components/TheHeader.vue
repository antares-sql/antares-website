<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <header class="w-full">
    <nav class="border-gray-200 bg-white px-4 py-2.5 dark:bg-gray-800 lg:px-6">
      <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        <a href="/" class="flex items-center">
          <img src="~/assets/images/logo.png" class="mr-3 h-6 sm:h-9" alt="Antares Logo">
          <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-gray-50">Antares SQL</span>
        </a>
        <div class="flex items-center lg:order-2">
          <div class="mx-2 mt-1">
            <a
              class="github-button"
              href="https://github.com/fabio286/antares"
              data-color-scheme="no-preference: light; light: light; dark: light;"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star fabio286/antares on GitHub"
            >Star</a>
          </div>
          <a title="GitHub Repository" target="_blank" class="mx-2" href="https://github.com/Fabio286/antares">
            <BrandGithubIcon class="text-gray-50" />
          </a>
          <a title="Follow on Twitter" target="_blank" class="mx-2" href="https://twitter.com/AntaresSql">
            <BrandTwitterIcon class="text-gray-50" />
          </a>
          <button data-collapse-toggle="mobile-menu-2" type="button" class="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden" aria-controls="mobile-menu-2" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
            <svg class="hidden h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
          </button>
        </div>
        <div id="mobile-menu-2" class="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto">
          <ul class="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
            <li>
              <NuxtLink to="/" class="bg-primary-700 lg:text-primary-700 block rounded py-2 pr-4 pl-3 text-gray-50 dark:text-gray-50 lg:bg-transparent lg:p-0" aria-current="page">
                Home
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/download" class="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-gray-50">
                Download
              </NuxtLink>
            </li>
            <li>
              <a href="https://github.com/Fabio286/antares/discussions" class="lg:hover:text-primary-700 block border-b border-gray-100 py-2 pr-4 pl-3 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-50 lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-gray-50">Support</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>
import { BrandGithubIcon, BrandTwitterIcon } from 'vue-tabler-icons'
</script>
