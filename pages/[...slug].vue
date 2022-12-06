<template>
  <main>
    <ContentDoc>
      <template #default="{doc}">
        <BasePageContent>
          <div class="pb-20 dark:text-slate-50">
            <div class="py-16 px-5">
              <h1 class="text-5xl">
                {{ doc.fullTitle || doc.title }}
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
              :value="doc"
            />
          </div>
        </BasePageContent>
      </template>

      <template #not-found>
        <NotFound />
      </template>

      <template #empty>
        <h1 class="text-5xl">
          Document is empty
        </h1>
      </template>
    </ContentDoc>
  </main>
</template>
<script setup lang="ts">
import NotFound from '~/components/NotFound.vue'

const route = useRoute()
const router = useRouter()
const routePath = computed(() => route.path)

// Redirect old pages
switch (routePath.value) {
  case '/download.html':
    router.push('/downloads')
    break
  case '/privacy.html':
    router.push('/_privacy')
    break
}
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
