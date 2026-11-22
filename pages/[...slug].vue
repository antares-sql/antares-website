<template>
  <main>
    <BasePageContent v-if="page">
      <div class="pb-20 dark:text-slate-50">
        <div class="px-5 py-16">
          <h1 class="text-5xl">
            {{ page.fullTitle || page.title }}
          </h1>
        </div>
        <ContentRenderer
          class="
            prose
            max-w-none
            rounded-3xl
            bg-slate-800
            p-8
            dark:prose-invert
          "
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

// Redirect old pages
const redirects: Record<string, string> = {
  '/download.html': '/downloads',
  '/privacy.html': '/_privacy'
}
if (redirects[route.path]) {
  await navigateTo(redirects[route.path], { redirectCode: 301 })
}

const { data: page } = await useAsyncData(`page-${route.path}`, () =>
  queryCollection('pages').path(route.path).first()
)

useHead(() => ({
  title: page.value?.head?.title || page.value?.title,
  meta: page.value?.description
    ? [{ name: 'description', content: page.value.description }]
    : []
}))
</script>
<style lang="scss">
.prose {
  a {
    text-decoration: none!important;
  }

  :not(h2) a {
    color: theme('colors.orange.500');
  }

  p {
    font-size: 1.2rem;
  }
}
</style>
