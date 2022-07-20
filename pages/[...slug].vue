<template>
  <div class="">
    <ContentDoc>
      <template #default="{doc}">
        <BasePageContent>
          <div class="pb-20 dark:text-slate-50">
            <div class="py-16 px-5">
              <h1 class="text-5xl">
                {{ doc.title }}
              </h1>
              <small>by {{ doc.author }} - {{ doc.date }}</small>
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
    </ContentDoc>
  </div>
</template>
<script setup>
import NotFound from '../components/NotFound.vue'
</script>
