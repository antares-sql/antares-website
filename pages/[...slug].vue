<template>
  <main>
    <BasePageContent v-if="page">
      <div class="pb-20 text-gray-50">
        <div class="px-1 py-12 lg:py-16">
          <h1 class="text-4xl font-bold sm:text-5xl">
            {{ page.fullTitle || page.title }}
          </h1>
        </div>
        <ContentRenderer
          class="prose prose-invert max-w-none rounded-3xl bg-surface p-8 ring-1 ring-white/5 lg:p-12"
          :value="page"
        />
      </div>
    </BasePageContent>
    <NotFound v-else />
  </main>
</template>
<script setup lang="ts">
import NotFound from '~/components/NotFound.vue'

const route = useRoute()
// GitHub Pages serves the pages at /about/, the content paths have no trailing slash
const path = route.path.replace(/(.)\/$/, '$1')

// Redirect old pages
const redirects: Record<string, string> = {
  '/download.html': '/downloads/',
  '/privacy.html': '/_privacy/'
}
if (redirects[path]) {
  await navigateTo(redirects[path], { redirectCode: 301 })
}

const { data: page } = await useAsyncData(`page-${path}`, () =>
  queryCollection('pages').path(path).first()
)

useSeoMeta({
  title: () => page.value?.head?.title || page.value?.title,
  ogTitle: () => page.value?.fullTitle || page.value?.title,
  description: () => page.value?.description || undefined,
  ogDescription: () => page.value?.description || undefined
})
</script>
<style lang="scss">
.prose {
  a {
    text-decoration: none!important;
  }

  :not(h2) a {
    color: theme('colors.accent.500');
  }

  p {
    font-size: 1.2rem;
  }
}
</style>
