<template>
  <div>
    <Head>
      <Title>{{ title }}</Title>
    </Head>
    <BasePageContent>
      <h1 class="text-3xl font-bold dark:text-slate-50">
        Hello, {{ world }}
      </h1>
    </BasePageContent>
  </div>
</template>

<script setup lang="ts">
import BasePageContent from '@/components/BasePageContent.vue'

const title = ref('Antares SQL - Free and Open Source Client')
const world = ref('World!')

</script>
