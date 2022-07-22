<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <div>
    <Head>
      <Title>Antares SQL - Free and Open Source Client</Title>
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
            <div class="relative hidden min-h-fit flex-1 overflow-hidden lg:block">
              <img src="/images/screen1c.png" alt="Antares screenshot" class="relative rounded-l-lg object-cover lg:-right-1">
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
          <BasePageContentCard :card="card" />
        </div>
        <BasePageContentGrid :blocks="blocks" />
      </BasePageContent>
    </main>
  </div>
</template>
<script setup lang="ts">
import BasePageContentCard from '~/components/BasePageContentCard.vue'
import BasePageContentGrid from '~/components/BasePageContentGrid.vue'

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
    mediaPath: '/images/screen3.png',
    mediaPosition: 'left' as 'left' | 'right'
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
    icon: 'HeartIcon'
  },
  {
    title: 'NEW FEATURES COMES',
    content: 'This project is currently in development and new features will be released with each update!',
    icon: 'CometIcon'
  },
  {
    title: 'SECURE',
    content: 'All saved connections data, including passwords, are encrypted and the key is kept safe.',
    icon: 'LockIcon'
  },
  {
    title: 'PRIVATE',
    content: 'No spyware, telemetry or other sort of background activities. Spontaneous feedbacks are enough.',
    icon: 'WallIcon'
  }
]
</script>