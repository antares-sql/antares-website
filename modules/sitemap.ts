import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { Readable } from 'node:stream'
import { SitemapStream, streamToPromise } from 'sitemap'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'sitemap',
    version: '0.0.2',
    configKey: 'sitemap',
    compatibility: { nuxt: '>=4.0.0' }
  },
  defaults: {
    hostname: 'http://localhost:3000'
  },
  setup (options, nuxt) {
    // Pages that must not be listed even though they are prerendered
    const EXCLUDED_PATHS = ['/200.html', '/404.html', '/theme-editor', '/store/apps/9nhtb9sq51r1']

    nuxt.hook('nitro:init', (nitro) => {
      const paths: string[] = []

      nitro.hooks.hook('prerender:route', (route) => {
        const isPage = route.contentType?.includes('text/html')
        const isExcluded = EXCLUDED_PATHS.some(path => route.route.startsWith(path))

        if (isPage && !route.error && !isExcluded) {
          // GitHub Pages redirects /about to /about/: list the final URLs
          paths.push(route.route.replace(/\/?$/, '/'))
        }
      })

      nitro.hooks.hook('prerender:done', async () => {
        if (!paths.length) {
          return
        }

        // https://github.com/ekalinin/sitemap.js#generate-a-one-time-sitemap-from-a-list-of-urls
        const stream = new SitemapStream({ hostname: options.hostname })
        const sitemap = await streamToPromise(Readable.from(paths.sort()).pipe(stream))

        const publicDir = nitro.options.output.publicDir
        mkdirSync(publicDir, { recursive: true })
        writeFileSync(join(publicDir, 'sitemap.xml'), sitemap.toString())
        nitro.logger.success('sitemap.xml created')
      })
    })
  }
})
