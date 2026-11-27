<template>
  <div>
    <Head>
      <Title>Download Antares SQL | Free and Open Source SQL Client</Title>
    </Head>
    <main>
      <BasePageContent>
        <div class="space-y-6 px-1 py-12 text-gray-50 lg:py-16">
          <h1 class="text-4xl font-bold leading-tight sm:text-5xl">
            One application, <br class="hidden sm:inline">different platforms.
          </h1>
          <p class="text-xl text-gray-200 sm:text-2xl">
            Download Antares SQL for your favorite OS and in the distribution that fits your needs.
          </p>
          <p v-if="latestStable" class="flex flex-wrap items-center gap-x-3 gap-y-1 text-gray-400">
            <span>Latest stable: <b class="text-gray-50">{{ latestStable.tag_name }}</b></span>
            <span aria-hidden="true">·</span>
            <span>{{ formatDate(latestStable.published_at) }}</span>
            <span aria-hidden="true">·</span>
            <a :href="latestStable.html_url" target="_blank" class="inline-flex items-center gap-1 font-medium text-accent-500 hover:underline">
              Release notes <ExternalLinkIcon size="16" />
            </a>
          </p>
        </div>

        <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          <DownloadPlatform
            name="Windows"
            icon="windows"
            :current="os === 'Windows'"
            :class="{ 'order-first lg:order-none': os === 'Windows' }"
            :groups="groups('windows')"
          >
            <a href="https://apps.microsoft.com/detail/9nhtb9sq51r1?mode=direct" rel="nofollow" target="_blank">
              <img class="h-12" src="https://get.microsoft.com/images/en-us%20dark.svg" alt="Get it from Microsoft Store">
            </a>
          </DownloadPlatform>

          <DownloadPlatform
            name="Linux"
            icon="linux"
            :current="os === 'Linux'"
            :class="{ 'order-first lg:order-none': os === 'Linux' }"
            :groups="groups('linux')"
          >
            <a href="https://flathub.org/apps/it.fabiodistasio.AntaresSQL" target="_blank" rel="nofollow">
              <img class="h-12" alt="Download on Flathub" src="https://dl.flathub.org/assets/badges/flathub-badge-en.svg">
            </a>
            <a href="https://snapcraft.io/antares" target="_blank" rel="nofollow">
              <img class="h-12" alt="Get it from the Snap Store" src="~/assets/images/snap-store-black.svg">
            </a>
            <a href="https://aur.archlinux.org/packages/antares-sql-bin" target="_blank" rel="nofollow">
              <img class="h-12" alt="Get it from AUR" src="https://raw.githubusercontent.com/antares-sql/antares/master/docs/aur-badge.svg">
            </a>
          </DownloadPlatform>

          <DownloadPlatform
            name="macOS"
            icon="apple"
            :current="os === 'macOS'"
            :class="{ 'order-first lg:order-none': os === 'macOS' }"
            :groups="groups('mac')"
          >
            <BaseButton to="https://support.apple.com/guide/mac-help/mh40616/mac" variant="light" size="sm">
              How to install on macOS <ExternalLinkIcon size="16" />
            </BaseButton>
          </DownloadPlatform>
        </div>

        <section class="my-16 flex flex-col gap-5 rounded-3xl bg-surface p-8 text-gray-50 ring-1 ring-purple-400/20 lg:flex-row lg:items-start lg:p-10">
          <AlertTriangleIcon size="40" class="shrink-0 text-purple-300" />
          <div class="space-y-3">
            <h2 class="text-2xl font-bold">
              About pre-release builds
            </h2>
            <p class="text-gray-300">
              <b class="text-gray-50">Beta</b> versions are release candidates of the next version.
              <b class="text-gray-50">Nightly</b> builds are made every night from the <code class="rounded bg-white/10 px-1 font-mono text-sm">develop</code> branch,
              to try the latest features before they are released: they are <strong class="text-gray-50">untested</strong> and may be unstable.
              For everyday use, prefer the stable version.
            </p>
            <p class="text-gray-300">
              Antares Nightly is a separate app with its own settings: it installs side by side with the stable version and auto-updates to newer nightlies.
              <template v-if="latestNightly?.name">
                Latest: <b class="text-gray-50">{{ latestNightly.name }}</b>.
              </template>
            </p>
            <a
              href="https://github.com/antares-sql/antares-nightly/releases"
              target="_blank"
              class="inline-flex items-center gap-1 font-semibold text-accent-500 hover:underline"
            >
              All nightly builds <ExternalLinkIcon size="16" />
            </a>
          </div>
        </section>
      </BasePageContent>
    </main>
  </div>
</template>

<script setup lang="ts">
import { AlertTriangleIcon, ExternalLinkIcon } from 'vue-tabler-icons'
import BaseButton from '~/components/BaseButton.vue'
import type { DownloadGroup, DownloadRow } from '~/components/DownloadPlatform.vue'
import DownloadPlatform from '~/components/DownloadPlatform.vue'
import getOS from '~/libs/getOS'

const description = 'Download Antares SQL for Windows, Linux and macOS: installers, portable, AppImage, deb, store packages, plus beta and nightly builds.'
useSeoMeta({
  description,
  ogDescription: description,
  ogTitle: 'Download Antares SQL'
})

type Asset = { name: string, browser_download_url: string }
type Release = { name: string, tag_name: string, html_url: string, published_at: string, prerelease: boolean, assets: Asset[] }
type Platform = 'windows' | 'linux' | 'mac'

// Fetched in the browser: the page is prerendered and the releases must be fresh
const { data: releases, status } = await useFetch<Release[]>('https://api.github.com/repos/antares-sql/antares/releases', { server: false })
// Nightly builds of the develop branch (Windows and Linux x64 only), published by antares-sql/antares-nightly
const { data: latestNightly } = await useFetch<Release>('https://api.github.com/repos/antares-sql/antares-nightly/releases/latest', { server: false })

const os = ref<string | undefined>()
onMounted(() => {
  os.value = getOS()
})

const latestStable = computed(() => releases.value?.find(r => !r.prerelease))
// A beta older than the latest stable is not worth showing
const latestBeta = computed(() => {
  const beta = releases.value?.find(r => r.prerelease)
  return beta && latestStable.value && beta.published_at < latestStable.value.published_at ? undefined : beta
})

/** Files of each platform, matched by name (they follow the artifactName of the app build) */
const files: Record<Platform, { arch: string, format: string, pattern: RegExp }[]> = {
  windows: [
    { arch: '64-bit', format: 'Installer (.exe)', pattern: /(win|win_x64)\.exe$/ },
    { arch: '64-bit', format: 'Portable (.exe)', pattern: /portable\.exe$/ }
  ],
  linux: [
    { arch: '64-bit', format: 'AppImage', pattern: /x86_64\.AppImage$/ },
    { arch: '64-bit', format: '.deb', pattern: /linux_amd64\.deb$/ },
    { arch: 'ARMv8', format: 'AppImage', pattern: /arm64\.AppImage$/ },
    { arch: 'ARMv8', format: '.deb', pattern: /linux_arm64\.deb$/ },
    { arch: 'ARMv7', format: 'AppImage', pattern: /armv7l\.AppImage$/ },
    { arch: 'ARMv7', format: '.deb', pattern: /linux_armv7l\.deb$/ }
  ],
  mac: [
    { arch: '64-bit', format: '.dmg', pattern: /(mac|mac_x64)\.dmg$/ },
    { arch: 'ARMv8', format: '.dmg', pattern: /mac_arm64\.dmg$/ }
  ]
}

function rowsOf (release: Release | null | undefined, platform: Platform, channel?: DownloadRow['channel']): DownloadRow[] {
  if (!release?.assets) return []
  return files[platform].flatMap(({ arch, format, pattern }) => {
    const asset = release.assets.find(a => pattern.test(a.name))
    return asset ? [{ arch, format, url: asset.browser_download_url, fileName: asset.name, channel, version: release.tag_name }] : []
  })
}

function groups (platform: Platform): DownloadGroup[] {
  const loading = status.value === 'pending' || status.value === 'idle'
  const stable: DownloadRow[] = rowsOf(latestStable.value, platform)
  if (platform === 'linux') {
    stable.push({ arch: 'All', format: 'APT repository', url: 'https://github.com/antares-sql/antares-ppa', external: true, title: 'Install from the APT repository (instructions)' })
  }
  const prerelease = [
    ...rowsOf(latestBeta.value, platform, 'beta'),
    // Only the main package of each platform for nightlies
    ...rowsOf(latestNightly.value, platform, 'nightly').filter(row => !row.format.includes('Portable') && row.format !== '.deb')
  ]
  return [
    { label: 'Stable', version: latestStable.value?.tag_name, loading, rows: stable },
    ...(prerelease.length ? [{ label: 'Pre-release', rows: prerelease }] : [])
  ]
}

const formatDate = (date: string) => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
</script>
