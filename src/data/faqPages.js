/**
 * Páginas FAQ temáticas — una URL por tema (SEO/AEO).
 */
import { aboutFaqs } from './faqs/about.js'
import { servicesFaqs } from './faqs/services.js'
import { contactFaqs } from './faqs/contact.js'
import { clientsFaqs } from './faqs/clients.js'
import { blogFaqs } from './faqs/blog.js'
import { homeFaqs } from './faqs/home.js'

const pick = (items, prefix) => items.filter((i) => i.id.startsWith(prefix))

const pickIds = (items, ids) => {
  const set = new Set(ids)
  return items.filter((i) => set.has(i.id))
}

const dedupe = (items) => {
  const seen = new Set()
  return items.filter((i) => {
    if (seen.has(i.id)) return false
    seen.add(i.id)
    return true
  })
}

const servicesRest = servicesFaqs.filter(
  (i) =>
    !i.id.startsWith('svc-ia') &&
    !i.id.startsWith('svc-auto') &&
    !i.id.startsWith('svc-bi')
)

/** Preguntas destacadas en el hub /faq (no duplicar el catálogo completo). */
export const faqHubPreview = pickIds(homeFaqs, [
  'home-consultora',
  'home-proyectos-consultoria',
  'home-ia',
  'home-automatizacion',
  'home-bi',
  'home-contacto',
  'home-diferencia',
  'home-primera-pregunta'
])

export const FAQ_TOPICS = [
  {
    slug: 'consultora-tecnologica',
    icon: 'business',
    label: 'Consultora tecnológica',
    title: 'FAQ Consultora tecnológica en España | Metrio Consulting',
    description:
      'Preguntas frecuentes sobre Metrio Consulting: consultora tecnológica en Valencia, proyectos de consultoría, espíritu emprendedor, 150+ proyectos y ejecución en producción en España e internacional.',
    h1: 'Preguntas sobre consultora tecnológica',
    lead: 'Todo sobre Metrio como consultora tecnológica: quiénes somos, historia, valores, Valencia y por qué ejecutamos en producción.',
    items: dedupe([
      ...aboutFaqs,
      ...pickIds(homeFaqs, ['home-consultora', 'home-proyectos-consultoria', 'home-diferencia', 'home-experiencia'])
    ]),
    relatedSlugs: ['inteligencia-artificial', 'servicios-consultoria', 'contacto']
  },
  {
    slug: 'inteligencia-artificial',
    icon: 'psychology',
    label: 'Inteligencia artificial',
    title: 'FAQ Implementación de IA en empresas | Metrio Consulting España',
    description:
      'Respuestas sobre implementación de IA empresarial: agentes, copilots, LLM, seguridad, plazos y casos de uso. Consultora de IA en Valencia, España.',
    h1: 'Preguntas sobre IA e inteligencia artificial',
    lead: 'Implementación de IA aplicada en empresas: agentes, copilots, integración con CRM/ERP y despliegue en producción.',
    items: [...pick(servicesFaqs, 'svc-ia'), ...pickIds(homeFaqs, ['home-ia', 'home-humo'])],
    relatedSlugs: ['automatizacion-procesos', 'servicios-consultoria', 'consultora-tecnologica']
  },
  {
    slug: 'automatizacion-procesos',
    icon: 'settings_suggest',
    label: 'Automatización',
    title: 'FAQ Automatización de procesos empresariales | Metrio Consulting',
    description:
      'Preguntas sobre automatización de procesos, ETL, Excel, ROI, integraciones API y workflows. Consultoría de automatización en España.',
    h1: 'Preguntas sobre automatización de procesos',
    lead: 'Automatización de reportes, ETL, integraciones y eliminación de trabajo manual con ROI medible.',
    items: [...pick(servicesFaqs, 'svc-auto'), ...pickIds(homeFaqs, ['home-automatizacion'])],
    relatedSlugs: ['inteligencia-artificial', 'business-intelligence', 'servicios-consultoria']
  },
  {
    slug: 'business-intelligence',
    icon: 'insights',
    label: 'Business Intelligence',
    title: 'FAQ Power BI, Tableau y Business Intelligence | Metrio Consulting',
    description:
      'Preguntas sobre dashboards, Power BI, Tableau, KPIs, fuente única de verdad y calidad de datos. Consultoría BI en Valencia, España.',
    h1: 'Preguntas sobre Business Intelligence y dashboards',
    lead: 'Power BI, Tableau, KPIs accionables y fuente única de verdad para decidir con datos fiables.',
    items: [...pick(servicesFaqs, 'svc-bi'), ...pickIds(homeFaqs, ['home-bi'])],
    relatedSlugs: ['automatizacion-procesos', 'servicios-consultoria', 'clientes-casos-exito']
  },
  {
    slug: 'servicios-consultoria',
    icon: 'design_services',
    label: 'Servicios de consultoría',
    title: 'FAQ Servicios de consultoría tecnológica | Metrio Consulting',
    description:
      'Preguntas sobre servicios de Metrio: asesoría tecnológica, transformación digital, desarrollo de producto, leads B2B, precios, plazos y proceso de trabajo.',
    h1: 'Preguntas sobre servicios de consultoría',
    lead: 'Asesoría, transformación digital, producto a medida, prospección B2B y cómo trabajamos en cada proyecto.',
    items: servicesRest,
    relatedSlugs: ['inteligencia-artificial', 'consultora-tecnologica', 'contacto']
  },
  {
    slug: 'contacto',
    icon: 'mail',
    label: 'Contacto y primeros pasos',
    title: 'FAQ Contacto Metrio Consulting | Reservar llamada y presupuesto',
    description:
      'Cómo contactar con Metrio Consulting: reservar llamada, formulario, email hola@metrio.es, plazos de respuesta, NDA y presupuestos. Valencia, España.',
    h1: 'Preguntas sobre contacto y primeros pasos',
    lead: 'Reserva llamada de 30 min, escríbenos o pide presupuesto. Respuesta en 48 horas laborables.',
    items: contactFaqs,
    relatedSlugs: ['servicios-consultoria', 'consultora-tecnologica', 'clientes-casos-exito']
  },
  {
    slug: 'clientes-casos-exito',
    icon: 'groups',
    label: 'Clientes y casos',
    title: 'FAQ Clientes y casos de éxito | Metrio Consulting',
    description:
      'Preguntas sobre clientes de Metrio Consulting, sectores, resultados, casos de éxito, referencias y cómo ser el próximo cliente. Consultora en Valencia.',
    h1: 'Preguntas sobre clientes y casos de éxito',
    lead: 'Sectores, resultados medibles, onboarding y casos publicados en metrio.es/clientes.',
    items: clientsFaqs,
    relatedSlugs: ['consultora-tecnologica', 'business-intelligence', 'contacto']
  },
  {
    slug: 'blog-recursos',
    icon: 'menu_book',
    label: 'Blog y recursos',
    title: 'FAQ Blog Metrio Consulting | Artículos y casos de éxito',
    description:
      'Preguntas sobre el blog de Metrio: artículos de IA, automatización, BI, KPIs, casos de éxito y recursos para empresas en España.',
    h1: 'Preguntas sobre el blog y recursos',
    lead: 'Guías, comparativas y casos de éxito sobre consultoría tecnológica y transformación digital.',
    items: blogFaqs,
    relatedSlugs: ['inteligencia-artificial', 'business-intelligence', 'clientes-casos-exito']
  }
]

export function getFaqTopic (slug) {
  return FAQ_TOPICS.find((t) => t.slug === slug) ?? null
}

export function getAllFaqTopicSlugs () {
  return FAQ_TOPICS.map((t) => t.slug)
}

export function getTotalFaqCount () {
  const ids = new Set()
  FAQ_TOPICS.forEach((t) => t.items.forEach((i) => ids.add(i.id)))
  faqHubPreview.forEach((i) => ids.add(i.id))
  return ids.size
}
