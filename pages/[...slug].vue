<template>
  <div>
    <BasePageContent>
      <ContentDoc v-slot="{doc}">
        <div class="dark:text-slate-50">
          <h1 class="text-2xl">
            {{ doc.title }}
          </h1>
          <small>by {{ doc.author }} - {{ doc.date }}</small>
          <ContentRenderer class="prose dark:prose-invert max-w-none" :value="doc" />
          {{ doc.dummy }}
        </div>
      </ContentDoc>
    </BasePageContent>
  </div>
</template>
