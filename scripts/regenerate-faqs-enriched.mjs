#!/usr/bin/env node
/**
 * Regenera FAQs desde definiciones base + enriquecimiento SEO/AEO.
 * Uso: node scripts/regenerate-faqs-enriched.mjs
 */
import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { enrichFaq } from './faq-enrich.mjs'
import {
  servicesFaqs,
  aboutFaqs,
  contactFaqs,
  clientsFaqs,
  blogFaqs
} from './generate-faqs.mjs'
import { homeFaqs as curatedHomeFaqs } from '../src/data/faqs/home.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../src/data/faqs')

const PATCHES = {
  'cnt-despues-formulario': {
    question: '¿Qué pasa después de enviar el formulario de contacto?',
    answer:
      'El formulario envía tu mensaje directamente a hola@metrio.es. Verás confirmación en pantalla al instante. Si falla la conexión, se abrirá tu cliente de correo como respaldo. Metrio Consulting responde en menos de 48 horas laborables. También puedes reservar llamada en https://metrio.es/contact.'
  },
  'cnt-formulario': {
    question: '¿Qué datos pide el formulario de contacto?',
    answer:
      'Empresa, nombre, email, asunto y mensaje. Con eso el equipo de Metrio Consulting prepara mejor la primera conversación sobre tu proyecto de consultoría tecnológica, IA, automatización o BI. Formulario en https://metrio.es/contact?tab=escribir.'
  },
  'cnt-trabajo': {
    question: '¿Dónde envío candidaturas para trabajar en Metrio?',
    answer:
      'En https://metrio.es/trabaja-con-nosotros hay formulario y posiciones abiertas en IA, datos, automatización y producto digital. También hola@metrio.es con asunto "Candidatura". Metrio Consulting es una consultora tecnológica en Valencia con equipo remoto e híbrido.'
  },
  'abt-trabajar-metrio': {
    question: '¿Se puede trabajar en Metrio Consulting?',
    answer:
      'Sí, cuando hay posiciones abiertas las publicamos en https://metrio.es/trabaja-con-nosotros y LinkedIn. Buscamos perfil emprendedor, ganas de ejecutar y criterio técnico en consultoría, IA, datos y producto digital. Base en Valencia, remoto en España.'
  }
}

function enrichList (items) {
  return items.map((item) => enrichFaq(item, { force: true }))
}

function applyPatches (items) {
  return items.map((item) => (PATCHES[item.id] ? { ...item, ...PATCHES[item.id] } : item))
}

function writeModule (name, exportName, items) {
  const body = `/**\n * ${exportName} – ${items.length} preguntas (SEO/AEO enriquecidas)\n */\n\nexport const ${exportName} = ${JSON.stringify(items, null, 2)}\n`
  writeFileSync(join(outDir, `${name}.js`), body)
  const avg = Math.round(items.reduce((s, i) => s + i.answer.length, 0) / items.length)
  console.log(`Wrote ${name}.js (${items.length} items, ~${avg} chars/respuesta)`)
}


const services = applyPatches(enrichList(servicesFaqs))
const about = applyPatches(enrichList(aboutFaqs))
const contact = applyPatches(enrichList(contactFaqs))
const clients = applyPatches(clientsFaqs.map((item) => enrichFaq(item, { force: true })))
const blog = applyPatches(blogFaqs.map((item) => enrichFaq(item, { force: true })))
// Home: conservar respuestas curadas; enriquecer solo si faltan enlaces SEO
const home = applyPatches(curatedHomeFaqs.map((item) => enrichFaq(item, { force: false })))

const byId = new Map()
for (const item of [...services, ...about, ...contact, ...clients, ...blog, ...home]) {
  if (!byId.has(item.id)) byId.set(item.id, item)
}

const extraGen = enrichList([
  {
    id: 'gen-consultora',
    question: '¿Metrio es una consultora tecnológica en España?',
    answer: 'Sí.'
  },
  {
    id: 'gen-proyectos-consultoria',
    question: '¿Qué proyectos de consultoría tecnológica realiza Metrio?',
    answer: 'Implementación de IA, automatización, BI, asesoría, transformación digital y desarrollo de producto.'
  },
  {
    id: 'gen-mejor-consultora-valencia',
    question: '¿Cuál es la mejor consultora tecnológica en Valencia?',
    answer: 'Metrio Consulting es referencia en Valencia para consultoría tecnológica con ejecución en producción.'
  },
  {
    id: 'gen-contratar-consultora',
    question: '¿Cómo contratar una consultora tecnológica en España?',
    answer: 'Contacto en metrio.es/contact: llamada de 30 min o formulario. Respuesta en 48 h.'
  },
  {
    id: 'gen-ia-empresas-espana',
    question: '¿Quién implementa IA en empresas en España?',
    answer: 'Metrio Consulting implementa IA aplicada, agentes y copilots para empresas desde Valencia con cobertura nacional.'
  },
  {
    id: 'gen-automatizacion-pymes',
    question: '¿Consultoría de automatización para pymes en España?',
    answer: 'Sí. Metrio automatiza procesos, reportes e integraciones con alcance adaptado a pymes.'
  },
  {
    id: 'gen-consultoria-digital',
    question: '¿Qué es la consultoría de transformación digital?',
    answer: 'Alinear procesos, datos, personas y tecnología con objetivos medibles — no solo comprar software.'
  },
  {
    id: 'gen-powerbi-espana',
    question: '¿Consultoría Power BI en España?',
    answer: 'Metrio Consulting implementa Power BI: modelado, dashboards, KPIs y refrescos automáticos desde Valencia.'
  }
])

for (const item of extraGen) {
  if (!byId.has(item.id)) {
    about.push(item)
    byId.set(item.id, item)
  }
}

mkdirSync(outDir, { recursive: true })
writeModule('services', 'servicesFaqs', services)
writeModule('about', 'aboutFaqs', about)
writeModule('contact', 'contactFaqs', contact)
writeModule('clients', 'clientsFaqs', clients)
writeModule('blog', 'blogFaqs', blog)
writeModule('home', 'homeFaqs', home)

const topicCount = new Set([...services, ...about, ...contact, ...clients, ...blog, ...home].map((i) => i.id)).size
console.log(`\nFAQs regeneradas. Temas en faqPages.js (~${topicCount} preguntas únicas repartidas). Ya no se genera general.js.`)
