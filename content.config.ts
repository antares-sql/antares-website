import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        include: '**/*.md',
        exclude: ['_doc/**']
      },
      schema: z.object({
        fullTitle: z.string().optional(),
        author: z.string().optional(),
        head: z.object({
          title: z.string().optional()
        }).optional()
      })
    })
  }
})
