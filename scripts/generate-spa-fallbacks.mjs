#!/usr/bin/env node
/**
 * Genera dist/<ruta>/index.html para cada ruta de la SPA.
 * Así GitHub Pages, Cloudflare Pages, etc. responden HTTP 200 (indexable por Google).
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { blogPosts } from '../src/data/blogPosts.js'
import { FAQ_TOPICS } from '../src/data/faqPages.js'
import { getAllLocationRoutes } from '../src/data/locationPages.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = join(__dirname, '../dist')
const indexPath = join(distDir, 'index.html')
const indexHtml = readFileSync(indexPath, 'utf8')

const STATIC_ROUTES = [
  '/sobre-nosotros',
  '/services',
  '/clientes',
  '/blog',
  '/contact',
  '/trabaja-con-nosotros',
  '/faq',
  '/casos-exito'
]

function collectRoutes () {
  const paths = new Set(STATIC_ROUTES)

  for (const topic of FAQ_TOPICS) {
    paths.add(`/faq/${topic.slug}`)
  }

  for (const post of blogPosts) {
    paths.add(`/blog/${post.slug}`)
  }

  for (const route of getAllLocationRoutes()) {
    paths.add(route.path)
  }

  return [...paths].sort()
}

function writeFallback (routePath) {
  const relative = routePath.replace(/^\//, '')
  const targetDir = join(distDir, relative)
  mkdirSync(targetDir, { recursive: true })
  writeFileSync(join(targetDir, 'index.html'), indexHtml)
}

const routes = collectRoutes()
for (const route of routes) {
  writeFallback(route)
}

console.log(`SPA fallbacks: ${routes.length} rutas con index.html (HTTP 200)`)
