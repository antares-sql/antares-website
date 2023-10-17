<template>
  <div>
    <Head>
      <Title>Downloads | Free and Open Source Client</Title>
    </Head>
    <main class="flex items-center justify-center">
      <BasePageContent>
        <div class="pb-5 dark:text-slate-50">
          <div class="space-y-10 py-16 px-5">
            <h1 class="text-5xl font-bold leading-relaxed">
              One application,<br>
              different platforms.
            </h1>
            <div class="text-2xl dark:text-gray-50">
              Download Antares SQL for your favorite OS and in the distribution that fits your needs.
            </div>
          </div>
        </div>
        <div class="mb-16 grid gap-6 lg:grid-cols-3">
          <div
            class="
               space-y-6
               rounded-3xl
               p-6
               text-center
               dark:text-gray-50
               lg:col-span-1
            "
            :class="[(os === 'Windows' ? 'bg-slate-600 -m-4' : 'bg-slate-800')]"
          >
            <svg class="m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="64" width="64"><rect width="256" height="256" fill="none" />
              <polygon
                points="216 216 136 201.5 136 201.5 136 144 216 144 216 216"
                fill="none"
                stroke="#FFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
              <polygon
                points="104 195.6 40 184 40 144 104 144 104 195.6"
                fill="none"
                stroke="#FFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
              <polygon
                points="216 40 136 54.5 136 54.5 136 112 216 112 216 40"
                fill="none"
                stroke="#FFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
              <polygon
                points="104 60.4 40 72 40 112 104 112 104 60.4"
                fill="none"
                stroke="#FFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
            </svg>
            <h4 class="text-4xl font-bold">
              Windows
            </h4>
            <table class="w-full table-auto text-left">
              <thead>
                <tr class="uppercase">
                  <th>
                    Arch
                  </th>
                  <th>
                    Format
                  </th>
                  <th class="py-2">
                    Version
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr v-for="release in windowsReleases" :key="release.code">
                  <td class="py-2">
                    {{ release.arch }}
                  </td>
                  <td class="py-2 pr-1">
                    {{ release.format }}
                  </td>
                  <td class="py-2">
                    {{ release.version }}
                  </td>
                  <td class="py-2">
                    <NuxtLink
                      :to="release.data.browser_download_url"
                      :title="`Download ${release.data.name}`"
                      class="
                        ml-auto
                        flex
                        w-fit
                        items-center
                        justify-center
                        whitespace-nowrap
                        rounded-2xl
                        bg-orange-600
                        p-1
                        text-sm
                        font-semibold
                        hover:opacity-80
                        focus:ring-2
                        focus:ring-blue-400
                     "
                    >
                      <DownloadIcon />
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <a class="m-auto block" href="//www.microsoft.com/store/apps/9nhtb9sq51r1?cid=storebadge&amp;ocid=badge" target="_blank">
              <img class="m-auto block" src="https://developer.microsoft.com/store/badges/images/English_get-it-from-MS.png" alt="English badge" style="height: 56px;">
            </a>
          </div>
          <div
            class="
               space-y-6
               rounded-3xl
               p-6
               text-center
               dark:text-gray-50
               lg:col-span-1
            "
            :class="[(os === 'Linux' ? 'bg-slate-600 -m-4' : 'bg-slate-800')]"
          >
            <svg class="m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="64" width="64"><rect width="256" height="256" fill="none" />
              <path
                d="M32,216S64,160,64,96a64,64,0,0,1,128,0c0,64,32,120,32,120"
                fill="none"
                stroke="#FFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
              <circle cx="100" cy="108" r="8" fill="#FFF" /><circle cx="156" cy="108" r="8" fill="#FFF" /><polyline
                points="160 144 128 160 96 144"
                fill="none"
                stroke="#FFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
              <path
                d="M86.4,216a48.1,48.1,0,0,1,83.2,0"
                fill="none"
                stroke="#FFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
            </svg>
            <h4 class="text-4xl font-bold">
              Linux
            </h4>
            <table class="w-full table-auto text-left">
              <thead>
                <tr class="uppercase">
                  <th>
                    Arch
                  </th>
                  <th>
                    Format
                  </th>
                  <th>
                    Version
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-2">
                    All
                  </td>
                  <td class="py-2 pr-1">
                    deb
                  </td>
                  <td class="py-2">
                    stable
                  </td>
                  <td class="py-2">
                    <NuxtLink
                      to="https://github.com/antares-sql/antares-ppa"
                      target="_blank"
                      title="Instructions"
                      class="
                        ml-auto
                        flex
                        w-fit
                        items-center
                        justify-center
                        whitespace-nowrap
                        rounded-2xl
                        bg-orange-600
                        p-1
                        text-sm
                        font-semibold
                        hover:opacity-80
                        focus:ring-2
                        focus:ring-blue-400
                     "
                    >
                      <ExternalLinkIcon />
                    </NuxtLink>
                  </td>
                </tr>
                <tr v-for="release in linuxReleases" :key="release.code">
                  <td class="py-2">
                    {{ release.arch }}
                  </td>
                  <td class="py-2 pr-1">
                    {{ release.format }}
                  </td>
                  <td class="py-2">
                    {{ release.version }}
                  </td>
                  <td class="py-2">
                    <NuxtLink
                      :to="release.data.browser_download_url"
                      :title="`Download ${release.data.name}`"
                      class="
                        ml-auto
                        flex
                        w-fit
                        items-center
                        justify-center
                        whitespace-nowrap
                        rounded-2xl
                        bg-orange-600
                        p-1
                        text-sm
                        font-semibold
                        hover:opacity-80
                        focus:ring-2
                        focus:ring-blue-400
                     "
                    >
                      <DownloadIcon />
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="flex space-x-3">
              <a href="https://snapcraft.io/antares" target="_blank">
                <img alt="Get it from the Snap Store" src="https://snapcraft.io/static/images/badges/en/snap-store-black.svg">
              </a>
              <a href="https://aur.archlinux.org/packages/antares-sql-bin" target="_blank">
                <img alt="Get it from AUR" src="https://raw.githubusercontent.com/antares-sql/antares/3e00c4bae6e036300c752c1a40c5a038fea9c169/docs/aur-badge.svg">
              </a>
            </div>
          </div>
          <div
            class="
               space-y-6
               rounded-3xl
               p-6
               text-center
               dark:text-gray-50
               lg:col-span-1
            "
            :class="[(os === 'MacOS' ? 'bg-slate-600 -m-4' : 'bg-slate-800')]"
          >
            <svg class="m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="64" width="64"><rect width="256" height="256" fill="none" />
              <path
                d="M138.1,32.5A32,32,0,0,1,168,12"
                fill="none"
                stroke="#FFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
              <path
                d="M218.5,162.9C205.9,193.7,183.1,216,164,216H92c-28,0-64-48-64-100A60,60,0,0,1,128,71.3h0a60,60,0,0,1,87.2,7.6h0a48,48,0,0,0,3.3,84Z"
                fill="none"
                stroke="#FFF"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="12"
              />
            </svg>
            <h4 class="text-4xl font-bold">
              MacOS
            </h4>
            <table class="w-full table-auto text-left">
              <thead>
                <tr class="uppercase">
                  <th>
                    Arch
                  </th>
                  <th>
                    Format
                  </th>
                  <th>
                    Version
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                <tr v-for="release in macReleases" :key="release.code">
                  <td class="py-2">
                    {{ release.arch }}
                  </td>
                  <td class="py-2 pr-1">
                    {{ release.format }}
                  </td>
                  <td class="py-2">
                    {{ release.version }}
                  </td>
                  <td class="py-2">
                    <NuxtLink
                      :to="release.data.browser_download_url"
                      :title="`Download ${release.data.name}`"
                      class="
                        ml-auto
                        flex
                        w-fit
                        items-center
                        justify-center
                        whitespace-nowrap
                        rounded-2xl
                        bg-orange-600
                        p-1
                        text-sm
                        font-semibold
                        hover:opacity-80
                        focus:ring-2
                        focus:ring-blue-400
                     "
                    >
                      <DownloadIcon />
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </BasePageContent>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { DownloadIcon, ExternalLinkIcon } from 'vue-tabler-icons'
import getOS from '~/libs/getOS'
type ReleaseInfo = { name:string, browser_download_url : string };
const { data: releases } = await useFetch<{name: string, assets: ReleaseInfo[], prerelease: boolean}[]>('https://api.github.com/repos/antares-sql/antares/releases', { server: false })

const os: Ref<string> = ref(getOS())
const latestStable = computed(() => {
  return releases.value?.find(r => !r.prerelease)
})
const latestBeta = computed(() => {
  return releases.value?.find(r => r.prerelease)
})
// const stableVersion = computed(() => latestStable.value?.name || '')
// const betaVersion = computed(() => latestBeta.value?.name || '')

const linuxReleases = computed(() => {
  return [
    {
      code: 'amd64',
      data: latestStable.value?.assets.find(asset => /^(.*)x86_64.AppImage$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: '64-bit',
      format: 'AppImage',
      version: 'stable'
    },
    {
      code: 'arm64',
      data: latestStable.value?.assets.find(asset => /^(.*)arm64.AppImage$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: 'ARMv8',
      format: 'AppImage',
      version: 'stable'
    },
    {
      code: 'arm32',
      data: latestStable.value?.assets.find(asset => /^(.*)armv7l.AppImage$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: 'ARMv7',
      format: 'AppImage',
      version: 'stable'
    },
    {
      code: 'amd64',
      data: latestBeta.value?.assets.find(asset => /^(.*)x86_64.AppImage$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: '64-bit',
      format: 'AppImage',
      version: 'beta'
    }
  ].filter(rel => rel.data)
})

const windowsReleases = computed(() => {
  return [
    {
      code: 'amd64',
      data: latestStable.value?.assets.find(asset => /^(.*)win.exe$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: '64-bit',
      format: 'exe',
      version: 'stable'
    },
    {
      code: 'portable',
      data: latestStable.value?.assets.find(asset => /^(.*)portable.exe$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: '64-bit',
      format: 'portable.exe',
      version: 'stable'
    },
    {
      code: 'amd64',
      data: latestBeta.value?.assets.find(asset => /^(.*)win.exe$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: '64-bit',
      format: 'exe',
      version: 'beta'
    },
    {
      code: 'portable',
      data: latestBeta.value?.assets.find(asset => /^(.*)portable.exe$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: '64-bit',
      format: 'portable.exe',
      version: 'beta'
    }
  ].filter(rel => rel.data)
})

const macReleases = computed(() => {
  return [
    {
      code: 'amd64',
      data: latestStable.value?.assets.find(asset => /^(.*)mac.dmg$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: '64-bit',
      format: 'dmg',
      version: 'stable'
    },
    {
      code: 'arm64',
      data: latestStable.value?.assets.find(asset => /^(.*)arm64.dmg$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: 'ARMv8',
      format: 'dmg',
      version: 'stable'
    },
    {
      code: 'amd64',
      data: latestBeta.value?.assets.find(asset => /^(.*)mac.dmg$/.test(asset.browser_download_url)) as ReleaseInfo,
      arch: '64-bit',
      format: 'dmg',
      version: 'beta'
    }
  ].filter(rel => rel.data)
})
</script>
