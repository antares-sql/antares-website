<!-- eslint-disable tailwindcss/no-custom-classname -->
<template>
  <main>
    <Head>
      <Title>Antares SQL | Free and Open Source Client</Title>
    </Head>
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
          <div class="space-y-10 py-10 text-center lg:flex lg:flex-1 lg:flex-col lg:place-content-center lg:text-left">
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
                  px-5
                  py-3
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
              <img src="/images/main.png" alt="Antares screenshot" class="relative rounded-l-lg object-cover lg:-right-1">
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
            At the moment this application is in development state, many features will come in future updates, and currently supports <b>MySQL/MariaDB</b>, <b>PostgreSQL</b>, <b>SQLite</b> and <b>Firebird SQL</b>.<br>
            Most of its current features are enough to have a pleasant user experience with supported databases, so give it a chance and <a class="font-bold text-orange-500" href="https://github.com/antares-sql/antares/discussions" target="_blank">send us your feedback</a>,
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
              Antares SQL is in a beta phase but it fully supports MySQL/MariaDB, PostgreSQL, SQLite and Firebird SQL. SQL Server and DuckDB are the next ones, and more databases will come in future releases.
            </div>
          </div>
        </template>
      </BaseStepper>
    </BasePageContent>
  </main>
</template>
<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { useElementVisibility } from '@vueuse/core'
import { DownloadIcon } from 'vue-tabler-icons'
import BaseCard from '~/components/BaseCard.vue'
import BaseGrid from '~/components/BaseGrid.vue'
import type { Step } from '~/components/BaseStepper.vue'
import BaseStepper from '~/components/BaseStepper.vue'

const cards = [
  {
    title: 'Simple, but complete',
    subtitle: `Features in the right places,<br>
      not hundreds of tiny buttons or submenu.`,
    content: `
      Antares SQL development is driven by the idea to create a <b>full featured</b> tool,
      <b>fast</b> and with a <b>modern and intuitive UI</b>.<br>
      All features are accessible with a few clicks, without having to search for them in dozens of drop-down
      menus; productivity comes first.<br>
      Right-click a schema to open its <b>diagram</b>: tables and foreign keys at a glance,
      to drag around and zoom, with the relations of the selected table highlighted.`,
    mediaPath: '/videos/schema-diagram.webm',
    mediaPosition: 'right' as 'left' | 'right',
    isVideo: true
  },
  {
    title: 'Autocomplete or format your queries',
    subtitle: `Built-in autocomplete and database suggestions<br>
      will speed up the writing of your queries.`,
    content: `
      The query editor speaks the SQL dialect of each database and suggests tables, columns and keywords while you type.<br>
      With the formatter (<b>Ctrl + B</b>) the queries you write will be even more readable.`,
    mediaPath: '/videos/query-editor.webm',
    mediaPosition: 'left' as 'left' | 'right',
    isVideo: true
  },
  {
    title: 'Import and export',
    subtitle: `Move your data<br>
      between databases with plain SQL dumps.`,
    content: `
      Export a whole schema, or only the tables you need, to a <b>.sql</b> file, and import it on another connection in a few clicks,
      with MySQL/MariaDB, PostgreSQL, SQLite and Firebird SQL.<br>
      Antares also imports the dumps made by <b>mysqldump</b>, <b>mariadb-dump</b>, <b>pg_dump</b> and <b>pgAdmin</b>, so moving from another tool is easy.`,
    mediaPath: '/videos/import-export.webm',
    mediaPosition: 'right' as 'left' | 'right',
    isVideo: true
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
    icons: ['brand:mysql', 'brand:mariadb']
  },
  {
    title: 'PostgreSQL',
    subtitle: 'Supported',
    status: 'complete',
    nextStatus: 'complete',
    icons: ['brand:postgresql']
  },
  {
    title: 'SQLite',
    subtitle: 'Supported',
    status: 'complete',
    nextStatus: 'complete',
    icons: ['brand:sqlite']
  },
  {
    title: 'Firebird SQL',
    subtitle: 'Supported',
    status: 'complete',
    nextStatus: 'incomplete',
    icons: ['brand:firebird']
  },
  {
    title: 'SQL Server',
    subtitle: 'Coming',
    status: 'incomplete',
    nextStatus: 'incomplete',
    icons: ['brand:sqlserver']
  },
  {
    title: 'DuckDB',
    subtitle: 'Coming',
    status: 'incomplete',
    nextStatus: 'incomplete',
    icons: ['brand:duckdb']
  },
  {
    title: 'More...',
    subtitle: 'Coming',
    status: 'incomplete',
    nextStatus: false,
    icons: ['database']
  }
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const player: Ref<any> = ref(null)
const isPlayerVisible = useElementVisibility(player)

watch(isPlayerVisible, (val) => {
  if (val) {
    player.value.play()
  } else {
    player.value.pause()
  }
})
</script>
