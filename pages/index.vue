<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div>
    <Head>
      <Title>Antares SQL | Free and Open Source Client</Title>
    </Head>
    <main class="flex items-center justify-center">
      <BasePageContent>
        <div class="pb-10 pt-5 lg:pt-20" data-aos="fade-in" data-aos-duration="1500">
          <div
            class="
              gradient-animate
              rounded-3xl
              bg-gradient-to-tl
              from-rose-400
              via-orange-500
              to-purple-500
              p-6
              dark:text-gray-50
              lg:flex
              lg:justify-center
              lg:p-16
              lg:pr-0
            "
          >
            <div class="space-y-10 py-10 text-center lg:flex lg:flex-1 lg:flex-col lg:content-center lg:justify-center lg:text-left">
              <h1 class="text-5xl font-bold dark:text-gray-50">
                Open source SQL client<br>
                made to be simple.
              </h1>
              <div class="text-2xl dark:text-gray-50">
                A modern, fast and productivity driven,<br>
                <strong class="font-bold">forever 100% free</strong> solution with a focus in UX.
              </div>
              <NuxtLink
                to="/downloads"
                class="
                  m-auto
                  flex
                  w-fit
                  items-center
                  justify-center
                  whitespace-nowrap
                  rounded-2xl
                  bg-gray-50
                  py-3
                  px-5
                  text-2xl
                  font-semibold
                  text-gray-900
                  hover:opacity-80
                  focus:ring-2
                  focus:ring-blue-400
                  lg:m-0
                "
              >
                <DownloadIcon class="mr-2" /> Download Antares
              </NuxtLink>
            </div>
            <div class="relative hidden min-h-fit flex-1 overflow-hidden rounded-l-xl lg:block">
              <video ref="player" muted loop>
                <source src="/videos/main.webm" type="video/webm">
                <img src="/images/screen1c.png" alt="Antares screenshot" class="relative rounded-l-lg object-cover lg:-right-1">
              </video>
            </div>
          </div>
        </div>

        <div class="space-y-20 pb-16 lg:pb-40" data-aos="fade-in" data-aos-duration="1500" data-aos-delay="500">
          <div class="space-y-5 pt-24 text-center">
            <h2 class="text-5xl font-bold dark:text-gray-50">
              About Antares Project
            </h2>
            <div class="text-2xl dark:text-gray-50">
              A new star is born, and is growing fast.
            </div>
            <div class="text-lg dark:text-gray-50">
              <a class="font-bold text-orange-500" href="https://en.wikipedia.org/wiki/Antares" target="_blank" rel="nofollow">Antares</a> is an SQL client that aims to become an useful and complete tool, especially for developers.<br>
              The target is to support as many databases as possible, and all major operating systems, including the ARM versions.<br>
              At the moment this application is in development state, many features will come in future updates, and actually supports <b>MySQL/MariaDB</b>, <b>PostgreSQL</b> and <b>SQLite</b>.<br>
              Most of its current features are enough to have a pleasant user experience with MySQL/MariaDB, PostgreSQL and SQLite, so give it a chance and <a class="font-bold text-orange-500" href="https://github.com/Fabio286/antares/discussions" target="_blank">send us your feedback</a>,
              we would really appreciate it.
            </div>
          </div>
        </div>
        <div
          v-for="(card, i) in cards"
          :key="i"
          class="
            mb-16
            max-w-none
            rounded-3xl
            bg-slate-800
            dark:text-gray-50
            lg:mb-32
          "
          data-aos="fade-in"
          data-aos-duration="1500"
          data-aos-delay="500"
        >
          <BaseCard :card="card" />
        </div>
        <BaseGrid :blocks="blocks" />
        <BaseStepper :steps="steps">
          <template #header>
            <div class="space-y-5 pb-24 text-center">
              <h2 class="text-4xl font-bold dark:text-gray-50">
                Supported Databases
              </h2>
              <div class="text-2xl dark:text-gray-50">
                Antares SQL is in a beta phase but it fully supports MySQL/MariaDB, PostgreSQL and SQLite. Support to other databases will come in future releases.
              </div>
            </div>
          </template>
        </BaseStepper>
      </BasePageContent>
    </main>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import BaseCard from '~/components/BaseCard.vue'
import BaseGrid from '~/components/BaseGrid.vue'
import BaseStepper, { Step } from '~/components/BaseStepper.vue'

const cards = [
  {
    title: 'Simple, but complete',
    subtitle: `Features in the right places,<br>
      not hundreds of tiny buttons or submenu.`,
    content: `
      Antares SQL development is driven by the idea to create a <b>full featured</b> tool,
      <b>fast</b> and with a <b>modern and intuitive UI</b>.<br>
      All features are accessible with a few clicks, without having to search for them in dozens of drop-down
      menus; productivity comes first.`,
    mediaPath: '/videos/video1.webm',
    mediaPosition: 'right' as 'left' | 'right',
    isVideo: true
  },
  {
    title: 'Autocomplete or format your queries',
    subtitle: `Built-in autocomplete and database suggestions<br>
      will speed up the writing of your queries.`,
    content: `
      Thanks to the auto-completion functions and the suggestion of database elements write queries will be a pleasure.<br>
      With the formatter function the queries you write will be even more readable.`,
    mediaPath: '/videos/video2.webm',
    mediaPosition: 'left' as 'left' | 'right',
    isVideo: true
  },
  {
    title: 'All data you need',
    subtitle: `Fill your test tables<br>
      with a massive number fake random data.`,
    content: `
      Antares SQL integrates a table filling function that allows you to <b>generate a large number of fake data</b> to be chosen from different categories, such as names, addresses, dates, texts or financial data.
      This feature will help you set up your development environment, saving you valuable time.`,
    mediaPath: '/images/screen4.png',
    mediaPosition: 'right' as 'left' | 'right'
  }
]

const blocks = [
  {
    title: 'FREE AND OPEN SOURCE',
    content: 'No paid content, subscriptions or ads. Antares will be always 100% free and open source.',
    icon: 'BrandOpenSourceIcon'
  },
  {
    title: 'NEW FEATURES COMES',
    content: 'Antares is a constantly developing project and we try to implement new features with each update!',
    icon: 'CometIcon'
  },
  {
    title: 'COMMUNITY DRIVEN',
    content: 'We pay close attention to our users\' feedback to create a useful tool for the community.',
    icon: 'SocialIcon'
  },
  {
    title: 'PRIVATE',
    content: 'No spyware, telemetry or other sort of background activities. Spontaneous feedbacks are enough.',
    icon: 'WallIcon'
  }
]

const steps: Step[] = [
  {
    title: 'MySQL & MariaDB',
    subtitle: 'Fully supported',
    status: 'complete',
    nextStatus: 'complete',
    icon: `<div class="relative w-20 h-20">
      <img class="absolute top-2 left-0 w-12" src="icons/mysql.svg" title="MySQL">
      <img class="absolute bottom-1 right-1 w-12" src="icons/mariadb.svg" title="MariaDB">
    </div>`
  },
  {
    title: 'PostgreSQL',
    subtitle: 'Supported',
    status: 'complete',
    nextStatus: 'complete',
    icon: '<img class="w-16" src="icons/pg.svg" title="PostgreSQL">'
  },
  {
    title: 'SQLite',
    subtitle: 'Supported',
    status: 'complete',
    nextStatus: 'incomplete',
    icon: '<img class="w-16" src="icons/sqlite.svg" title="SQLite">'
  },
  {
    title: 'SQL Server',
    subtitle: 'Coming',
    status: 'incomplete',
    nextStatus: 'incomplete',
    icon: '<img class="w-16" src="icons/mssql.svg" title="SQL Server">'
  },
  {
    title: 'More...',
    subtitle: 'Coming',
    status: 'incomplete',
    nextStatus: false,
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" fill="none" viewBox="0 0 24 24" stroke="#FFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="w-12">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>`
  }
]

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
