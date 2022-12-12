import { mkdirSync, writeFileSync } from 'fs'
import { Readable } from 'stream'
import { dirname } from 'path'
import { SitemapStream, streamToPromise } from 'sitemap'
import { defineNuxtModule, createResolver } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'sitemap',
    version: '0.0.1',
    configKey: 'sitemap',
    compatibility: { nuxt: '^3.0.0-rc.11' }
  },
  defaults: {
    hostname: 'http://localhost:3000'
  },
  setup (options, nuxt) {
    function generateSitemap (routes:{path: string}[]) {
      const sitemapRoutes = routes.map(route => route.path)

      // https://github.com/ekalinin/sitemap.js#generate-a-one-time-sitemap-from-a-list-of-urls
      const stream = new SitemapStream({ hostname: options.hostname })
      return streamToPromise(Readable.from(sitemapRoutes).pipe(stream)).then(
        data => data.toString()
      )
    }

    function createSitemapFile (sitemap: string, filepath: string) {
      const dirPath = dirname(filepath)
      mkdirSync(dirPath, { recursive: true })
      writeFileSync('dist/sitemap.xml', sitemap)
    }

    const resolver = createResolver(import.meta.url)
    const filePath = resolver.resolve(
      nuxt.options.srcDir,
      'node_modules/.cache/.sitemap/sitemap.xml'
    )

    nuxt.options.nitro.publicAssets = nuxt.options.nitro.publicAssets || []
    nuxt.options.nitro.publicAssets.push({
      baseURL: '/',
      dir: dirname(filePath)
    })

    nuxt.hook('nitro:build:before', (nitro) => {
      const paths: {path: string}[] = []
      const EXCLUDED_KEYWORDS = ['/api/_content', '/store/apps/9nhtb9sq51r1', '_payload.js', '200.html']

      nitro.hooks.hook('prerender:route', (route) => {
        const shouldBeAddedToSitemap = EXCLUDED_KEYWORDS.every(
          excludedKeyword => !route.route.includes(excludedKeyword)
        )

        if (shouldBeAddedToSitemap) {
          paths.push({ path: route.route })
        }
      })
      nitro.hooks.hook('close', async () => {
        const sitemap = await generateSitemap(paths)
        createSitemapFile(sitemap, filePath)
        // eslint-disable-next-line no-console
        console.log('sitemap.xml created')
      })
    })
  }
})
