#!/usr/bin/env node
/**
 * Regenera public/sitemap.xml con páginas principales, FAQ, blog y ubicaciones SEO.
 * Uso: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { blogPosts } from '../src/data/blogPosts.js'
import { FAQ_TOPICS } from '../src/data/faqPages.js'
import { getAllLocationRoutes } from '../src/data/locationPages.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const SITE = 'https://metrio.es'
const TODAY = new Date().toISOString().slice(0, 10)

function entry (loc, priority, changefreq = 'monthly') {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

const urls = [
  entry(`${SITE}/`, '1.0', 'weekly'),
  entry(`${SITE}/sobre-nosotros`, '0.9'),
  entry(`${SITE}/services`, '0.9'),
  entry(`${SITE}/clientes`, '0.85'),
  entry(`${SITE}/blog`, '0.9', 'weekly'),
  entry(`${SITE}/contact`, '0.8'),
  entry(`${SITE}/trabaja-con-nosotros`, '0.85'),
  entry(`${SITE}/faq`, '0.85'),
  ...FAQ_TOPICS.map((t) => entry(`${SITE}/faq/${t.slug}`, '0.82')),
  ...blogPosts.map((p) => entry(`${SITE}/blog/${p.slug}`, '0.75')),
  ...getAllLocationRoutes().map((r) =>
    entry(`${SITE}${r.path}`, r.citySlug ? '0.72' : '0.78')
  )
]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`

writeFileSync(join(__dirname, '../public/sitemap.xml'), xml)
console.log(`Sitemap generado: ${urls.length} URLs`)
