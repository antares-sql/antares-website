<template>
  <main>
    <Head>
      <Title>Antares SQL | Free and Open Source Client</Title>
    </Head>
    <BasePageContent>
      <!-- Hero -->
      <section class="pb-10 pt-6 lg:pt-16" data-aos="fade-in" data-aos-duration="1500">
        <div
          class="gradient-animate overflow-hidden rounded-3xl bg-gradient-to-tl from-rose-400 via-orange-500 to-purple-500 text-gray-50 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-16 lg:pl-16"
        >
          <div class="space-y-8 p-6 py-12 text-center lg:p-0 lg:text-left">
            <h1 class="text-4xl font-bold leading-tight sm:text-5xl">
              Open source SQL client <br class="hidden lg:inline">made to be simple.
            </h1>
            <p class="text-xl sm:text-2xl">
              A modern, fast and productivity driven, <br class="hidden lg:inline"><strong class="font-bold">forever 100% free</strong> solution with a focus on UX.
            </p>
            <div class="flex flex-wrap justify-center gap-3 lg:justify-start">
              <BaseButton to="/downloads" variant="light" size="lg">
                <DownloadIcon /> Download Antares
              </BaseButton>
              <BaseButton to="https://github.com/antares-sql/antares" variant="ghost" size="lg">
                <BrandGithubIcon /> GitHub
              </BaseButton>
            </div>
            <div class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
              <span class="text-sm font-medium uppercase tracking-widest text-white/80">Works with</span>
              <span v-for="engine in engines" :key="engine.icon" :title="engine.name" class="text-white">
                <AntaresIcon :name="`brand:${engine.icon}`" size="30" />
                <span class="sr-only">{{ engine.name }}</span>
              </span>
            </div>
          </div>
          <div class="px-6 lg:px-0">
            <AppFrame
              class="hidden lg:block"
              video="/videos/main.webm"
              poster="/images/posters/main.webp"
              preload="metadata"
              rounded="rounded-l-xl"
            />
            <AppFrame
              class="lg:hidden"
              poster="/images/posters/main.webp"
              alt="Antares SQL showing the rows of a MySQL table"
              rounded="rounded-t-xl"
            />
          </div>
        </div>
      </section>

      <!-- About -->
      <section class="grid items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-32" data-aos="fade-in" data-aos-duration="1500">
        <SectionHeader eyebrow="About" title="About Antares Project" lead="A new star is born, and is growing fast.">
          <p class="text-lg text-gray-300">
            <a class="font-bold text-accent-500 hover:underline" href="https://en.wikipedia.org/wiki/Antares" target="_blank" rel="nofollow">Antares</a>
            is an SQL client that aims to become a useful and complete tool, especially for developers.
            It runs on Windows, Linux and macOS, ARM included, and works with <b class="text-gray-50">MySQL/MariaDB</b>, <b class="text-gray-50">PostgreSQL</b>,
            <b class="text-gray-50">SQLite</b> and <b class="text-gray-50">Firebird SQL</b>; more databases are on the way.
          </p>
          <p class="text-lg text-gray-300">
            Give it a try and <a class="font-bold text-accent-500 hover:underline" href="https://github.com/antares-sql/antares/discussions" target="_blank">send us your feedback</a>:
            it shapes what comes next.
          </p>
        </SectionHeader>
        <dl class="grid grid-cols-2 gap-x-8 gap-y-10 border-line text-gray-50 lg:border-l lg:pl-16">
          <div v-for="fact in facts" :key="fact.label" class="flex flex-col-reverse gap-1 text-center sm:text-left">
            <dt class="text-sm text-gray-400">
              {{ fact.label }}
            </dt>
            <dd class="bg-gradient-to-r from-accent-400 to-rose-400 bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
              {{ fact.value }}
            </dd>
          </div>
        </dl>
      </section>

      <!-- Features -->
      <div class="space-y-24 lg:space-y-36">
        <BaseCard
          v-for="card in cards"
          :key="card.title"
          :card="card"
          data-aos="fade-in"
          data-aos-duration="1500"
        />
      </div>

      <!-- Themes -->
      <section class="py-24 lg:py-36" data-aos="fade-in" data-aos-duration="1500">
        <div class="grid items-center gap-12 text-gray-50 lg:grid-cols-2">
          <SectionHeader eyebrow="Themes" title="Make it yours" lead="Light or dark, high contrast or your favorite editor colors.">
            <p class="text-lg text-gray-300">
              Install themes from the gallery right inside the app: each one restyles the whole interface together with the code editor.
              Want your own? Design it in the theme editor with a live preview, then share it in the gallery.
            </p>
            <div class="flex flex-wrap justify-center gap-3 lg:justify-start">
              <BaseButton to="/theme-editor">
                <AntaresIcon name="palette" size="20" /> Open the theme editor
              </BaseButton>
              <BaseButton to="https://github.com/antares-sql/themes" variant="secondary">
                Browse the gallery <ExternalLinkIcon size="18" />
              </BaseButton>
            </div>
          </SectionHeader>
          <div class="relative mx-auto aspect-[1024/800] w-full max-w-xl" aria-hidden="true">
            <img
              v-for="(theme, i) in themes"
              :key="theme"
              :src="`/images/themes/${theme}.webp`"
              alt=""
              loading="lazy"
              class="absolute w-[78%] rounded-xl shadow-2xl shadow-black/60 ring-1 ring-white/10"
              :class="themeLayout[i]"
            >
          </div>
        </div>
      </section>

      <!-- Values -->
      <section class="space-y-14 border-t border-line py-20 lg:py-28">
        <SectionHeader
          eyebrow="Principles"
          title="Made by developers, for the community"
          align="center"
          data-aos="fade-in"
          data-aos-duration="1500"
        />
        <BaseGrid :blocks="blocks" />
      </section>

      <!-- Databases -->
      <section class="space-y-16 border-t border-line py-20 lg:py-28">
        <SectionHeader
          eyebrow="Databases"
          title="Supported Databases"
          lead="Antares SQL fully supports MySQL/MariaDB, PostgreSQL, SQLite and Firebird SQL. SQL Server and DuckDB are the next ones, and more databases will come in future releases."
          align="center"
          data-aos="fade-in"
          data-aos-duration="1500"
        />
        <BaseStepper :steps="steps" />
      </section>

      <!-- Closing call to action -->
      <section class="mb-20 lg:mb-28" data-aos="fade-in" data-aos-duration="1500">
        <div class="gradient-animate rounded-3xl bg-gradient-to-tl from-rose-400 via-orange-500 to-purple-500 p-px">
          <div class="flex flex-col items-center gap-6 rounded-[calc(1.5rem-1px)] bg-surface px-6 py-12 text-center text-gray-50 lg:flex-row lg:justify-between lg:px-12 lg:text-left">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold">
                Ready to give it a try?
              </h2>
              <p class="text-lg text-gray-300">
                Free forever, for Windows, Linux and macOS.
              </p>
            </div>
            <div class="flex flex-wrap justify-center gap-3">
              <BaseButton to="/downloads" size="lg">
                <DownloadIcon /> Download
              </BaseButton>
              <BaseButton to="https://github.com/antares-sql/antares" variant="ghost" size="lg">
                <StarIcon /> Star on GitHub
              </BaseButton>
            </div>
          </div>
        </div>
      </section>
    </BasePageContent>
  </main>
</template>

<script setup lang="ts">
import { BrandGithubIcon, DownloadIcon, ExternalLinkIcon, StarIcon } from 'vue-tabler-icons'
import AntaresIcon from '~/components/theme-editor/AntaresIcon.vue'
import AppFrame from '~/components/AppFrame.vue'
import BaseButton from '~/components/BaseButton.vue'
import type { Card } from '~/components/BaseCard.vue'
import BaseCard from '~/components/BaseCard.vue'
import BaseGrid from '~/components/BaseGrid.vue'
import type { Step } from '~/components/BaseStepper.vue'
import BaseStepper from '~/components/BaseStepper.vue'
import SectionHeader from '~/components/SectionHeader.vue'

useSeoMeta({
  ogTitle: 'Antares SQL | Free and Open Source Client',
  ogUrl: 'https://antares-sql.app/'
})

const engines = [
  { name: 'MySQL', icon: 'mysql' },
  { name: 'MariaDB', icon: 'mariadb' },
  { name: 'PostgreSQL', icon: 'postgresql' },
  { name: 'SQLite', icon: 'sqlite' },
  { name: 'Firebird SQL', icon: 'firebird' }
]

// Key figures of the About section (keep them in line with the app README)
const facts = [
  { value: '100%', label: 'Free and open source' },
  { value: '4', label: 'Database engines, more coming' },
  { value: '3', label: 'Operating systems, ARM included' },
  { value: '0', label: 'Telemetry or ads' }
]

const cards: Card[] = [
  {
    eyebrow: 'Schema diagram',
    title: 'Simple, but complete',
    subtitle: 'Features in the right places,<br> not hundreds of tiny buttons or submenus.',
    content: `
      <p>Antares SQL is driven by the idea of a <b>full featured</b> tool, <b>fast</b> and with a <b>modern and intuitive UI</b>:
      every feature is a few clicks away, productivity comes first.</p>
      <p>Right-click a schema to open its <b>diagram</b>: tables and foreign keys at a glance,
      to drag around and zoom, with the relations of the selected table highlighted.</p>`,
    mediaPath: '/videos/schema-diagram.webm',
    poster: '/images/posters/schema-diagram.webp',
    mediaPosition: 'right',
    isVideo: true
  },
  {
    eyebrow: 'Query editor',
    title: 'Autocomplete or format your queries',
    subtitle: 'Built-in autocomplete and database suggestions<br> speed up the writing of your queries.',
    content: `
      <p>The query editor speaks the SQL dialect of each database and suggests tables, columns and keywords while you type.</p>
      <p>With the formatter (<b>Ctrl + B</b>) the queries you write become even more readable.</p>`,
    mediaPath: '/videos/query-editor.webm',
    poster: '/images/posters/query-editor.webp',
    mediaPosition: 'left',
    isVideo: true
  },
  {
    eyebrow: 'Import and export',
    title: 'Move your data around',
    subtitle: 'Plain SQL dumps,<br> between any of your connections.',
    content: `
      <p>Export a whole schema, or only the tables you need, to a <b>.sql</b> file and import it on another connection in a few clicks,
      with MySQL/MariaDB, PostgreSQL, SQLite and Firebird SQL.</p>
      <p>Antares also imports the dumps made by <b>mysqldump</b>, <b>mariadb-dump</b>, <b>pg_dump</b> and <b>pgAdmin</b>, so moving from another tool is easy.</p>`,
    mediaPath: '/videos/import-export.webm',
    poster: '/images/posters/import-export.webp',
    mediaPosition: 'right',
    isVideo: true
  }
]

// Previews of gallery themes (antares-sql/themes), fanned out
const themes = ['github', 'gruvbox', 'dracula']
const themeLayout = [
  'left-0 top-0 -rotate-3',
  'right-0 top-[8%] rotate-2',
  'bottom-0 left-[11%]'
]

const blocks = [
  {
    title: 'Free and open source',
    content: 'No paid content, subscriptions or ads. Antares will always be 100% free and open source.',
    icon: 'BrandOpenSourceIcon'
  },
  {
    title: 'Always evolving',
    content: 'Antares is a constantly developing project, and every update brings new features.',
    icon: 'CometIcon'
  },
  {
    title: 'Community driven',
    content: 'We pay close attention to our users\' feedback to create a useful tool for the community.',
    icon: 'SocialIcon'
  },
  {
    title: 'Private',
    content: 'No spyware, telemetry or other background activities. Spontaneous feedback is enough.',
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
</script>
