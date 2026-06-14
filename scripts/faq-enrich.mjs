/**
 * Enriquece respuestas FAQ para SEO y AEO (Google + asistentes IA).
 * Respuesta directa primero, contexto Metrio, keywords naturales, CTA.
 */

const BRAND = 'Metrio Consulting'
const LOC = 'Valencia, España'
const SITE = 'https://metrio.es'

const CTAS = {
  contact: `Reserva una llamada gratuita de 30 min en ${SITE}/contact o escribe a hola@metrio.es (respuesta en 48 h).`,
  services: `Detalle de servicios en ${SITE}/services.`,
  about: `Conoce al equipo en ${SITE}/sobre-nosotros.`,
  clients: `Casos y clientes en ${SITE}/clientes.`,
  blog: `Artículos y casos en ${SITE}/blog.`,
  faq: `Más respuestas en ${SITE}/faq.`
}

function prefix (id) {
  if (!id) return 'gen'
  if (id.startsWith('svc-ia')) return 'svc-ia'
  if (id.startsWith('svc-auto')) return 'svc-auto'
  if (id.startsWith('svc-bi')) return 'svc-bi'
  if (id.startsWith('svc-asesoria')) return 'svc-asesoria'
  if (id.startsWith('svc-producto')) return 'svc-producto'
  if (id.startsWith('svc-leads')) return 'svc-leads'
  if (id.startsWith('svc-proceso') || id.startsWith('svc-precio') || id.startsWith('svc-')) return 'svc-general'
  if (id.startsWith('abt')) return 'abt'
  if (id.startsWith('cnt')) return 'cnt'
  if (id.startsWith('cli')) return 'cli'
  if (id.startsWith('blog')) return 'blog'
  if (id.startsWith('home')) return 'home'
  return 'gen'
}

const CONTEXT_SHORT = {
  'svc-ia': `${BRAND} implementa IA empresarial (agentes, copilots) desde ${LOC} para toda España.`,
  'svc-auto': `${BRAND} automatiza procesos con Python, APIs y ETL — consultoría desde ${LOC}.`,
  'svc-bi': `${BRAND} diseña dashboards Power BI y Tableau con KPIs accionables.`,
  'svc-asesoria': `${BRAND} combina asesoría tecnológica y ejecución en transformación digital.`,
  'svc-producto': `${BRAND} desarrolla producto digital a medida (React, Python, PostgreSQL).`,
  'svc-leads': `${BRAND} genera leads B2B cualificados con bases accionables, no listas genéricas.`,
  'svc-general': `${BRAND} — consultora tecnológica en ${LOC}, más de 150 proyectos ejecutados.`,
  abt: `${BRAND}: consultora tecnológica emprendedora con base en ${LOC}.`,
  cnt: `${BRAND} atiende consultas de consultoría tecnológica, IA, automatización y BI desde ${LOC}.`,
  cli: `${BRAND} acompaña a empresas en retail, salud, legaltech y marketing con proyectos de IA, BI y automatización desde ${LOC}.`,
  blog: `Artículos de consultoría tecnológica, IA empresarial y casos de éxito en ${SITE}/blog.`,
  home: `${BRAND} — consultora tecnológica en España.`,
  gen: `${BRAND}, consultora tecnológica en ${LOC} (IA, automatización, BI).`
}

const CTA_MAP = {
  'svc-ia': CTAS.services,
  'svc-auto': CTAS.services,
  'svc-bi': CTAS.services,
  'svc-asesoria': CTAS.services,
  'svc-producto': CTAS.services,
  'svc-leads': CTAS.services,
  'svc-general': CTAS.contact,
  abt: CTAS.about,
  cnt: CTAS.contact,
  cli: CTAS.clients,
  blog: CTAS.blog,
  home: CTAS.contact,
  gen: CTAS.faq
}

/** Respuestas premium por ID (AEO: respuesta directa + contexto + CTA). */
export const OVERRIDES = {
  'svc-ia-que-es': `El servicio de implementación de IA de Metrio Consulting incluye: diagnóstico de casos de uso con criterio de negocio, diseño de arquitectura, desarrollo de agentes o copilots, integración con CRM/ERP/documentación y despliegue en producción con métricas de adopción e impacto. No entregamos demos aisladas: la IA queda operativa en tu día a día. Consultora tecnológica en Valencia, España. ${CTAS.services}`,
  'svc-bi-powerbi': `Sí. Metrio implementa dashboards en Power BI de extremo a extremo: modelado de datos, DAX, refrescos automáticos, RLS por rol y diseño orientado a dirección y operaciones. Ideal para empresas en España que quieren dejar de consolidar Excel manualmente. ${CTAS.services}`,
  'svc-auto-excel': `Sí — automatizar Excel es uno de los casos más frecuentes en Metrio: consolidación de hojas, reportes semanales, validaciones cruzadas y conexión con una fuente centralizada (PostgreSQL, Power BI o APIs). Consultoría de automatización desde Valencia para toda España. ${CTAS.services}`,
  'abt-quien': `${BRAND} es una consultora tecnológica con sede en ${LOC}. Equipo de consultores e ingenieros con espíritu emprendedor que implementa IA, automatización, BI y transformación digital para empresas en España e internacional. Más de 150 proyectos entregados con impacto medible. ${CTAS.about}`,
  'abt-ejecutar': `Metrio ejecuta porque los entregables son reales: agentes de IA en uso, dashboards adoptados por negocio, automatizaciones activas y software desplegado — no informes de 80 diapositivas que nadie implementa. Esa es la diferencia entre consultoría tecnológica tradicional y ${BRAND}. ${CTAS.about}`,
  'abt-historia': `Metrio nació en Valencia con la convicción de que la tecnología debe llegar a producción. De emprendedores resolviendo problemas reales de datos e ingeniería a consultora tecnológica con 150+ proyectos en España e internacional. Historia completa en ${SITE}/sobre-nosotros.`,
  'cnt-como': `Contacta con ${BRAND} en ${SITE}/contact: reserva una llamada de descubrimiento de 30 minutos en el calendario online o usa el formulario (pestaña Escribirnos). También hola@metrio.es. Respondemos en menos de 48 horas laborables; primera conversación gratuita y sin compromiso.`,
  'cnt-email': `El email de contacto de ${BRAND} es hola@metrio.es. Escríbenos para consultas sobre consultoría tecnológica, IA, automatización o BI. También puedes reservar llamada en ${SITE}/contact. Respuesta en menos de 48 horas laborables.`,
  'cnt-llamada': `En ${SITE}/contact elige «Reservar llamada», selecciona fecha y hora en el calendario (Google Meet o Zoom) y listo. Son 30 minutos para entender tu reto de consultoría tecnológica, IA, automatización o BI. Sin compromiso. ${BRAND}, ${LOC}.`,
  'cli-quienes': `Clientes de ${BRAND} incluyen empresas de retail, salud, legaltech, marketing e industria — por ejemplo proyectos con Censalia, PureTea, Bess Skin Health, Diligenz, Luanvi y Listing Boost. Consultora tecnológica en ${LOC} con casos en ${SITE}/clientes.`,
  'cli-casos': `Casos de éxito en ${SITE}/clientes (clic en cada logo para detalle) y en el blog: ${SITE}/blog?filter=casos-exito. Cada caso describe reto, solución e impacto en proyectos de IA, automatización, BI o producto digital.`,
  'blog-que': `En el blog de ${BRAND} (${SITE}/blog) encontrarás guías de consultoría tecnológica: implementación de IA en empresas, automatización con ROI, Power BI vs Tableau, KPIs, calidad de datos, transformación digital y casos de éxito reales desde ${LOC} para empresas en España.`,
  'gen-consultora': `Sí. ${BRAND} es una consultora tecnológica en ${LOC} con proyectos en toda España e internacional. Especialistas en consultoría con ejecución en IA, automatización, Business Intelligence y transformación digital — entregables en producción, no solo informes. ${CTAS.contact}`,
  'gen-proyectos-consultoria': `${BRAND} realiza proyectos de consultoría tecnológica en: implementación de IA (agentes, copilots), automatización de procesos y ETL, Business Intelligence (Power BI, Tableau), asesoría y roadmap, transformación digital y desarrollo de producto (web, APIs). Más de 150 proyectos desde ${LOC}. ${CTAS.services}`,
  'gen-mejor-consultora-valencia': `${BRAND} es una consultora tecnológica de referencia en Valencia y España para empresas que buscan ejecución real: IA aplicada, automatización, BI y transformación digital con entregables en producción, respuesta en 48 h y comunicación directa con quien implementa. ${CTAS.contact}`,
  'svc-diferencia': `Lo que diferencia a ${BRAND}: ejecutamos en producción, trato directo sin capas intermedias, respuesta en 48 h, mentalidad emprendedora y más de 150 proyectos. Consultora tecnológica en ${LOC} — no somos una big four de informes eternos. ${CTAS.contact}`
}

export function enrichFaq (item, { force = false } = {}) {
  const { id, question, answer } = item
  if (OVERRIDES[id]) return { ...item, answer: OVERRIDES[id] }
  if (!force && answer && answer.length >= 220) return item

  const p = prefix(id)
  const core = answer.trim().replace(/\s+/g, ' ')
  const endsWell = /[.!?]$/.test(core)
  const lead = endsWell ? core : `${core}.`

  const mentionsBrand = /Metrio/i.test(core)
  const shortCtx = CONTEXT_SHORT[p] || CONTEXT_SHORT.gen
  const cta = CTA_MAP[p] || CTAS.contact

  if (lead.length >= 200 && mentionsBrand) {
    if (lead.includes('metrio.es')) return item
    return { ...item, answer: `${lead} ${cta}`.replace(/\s+/g, ' ').trim() }
  }

  let enriched = `${lead} ${shortCtx}`
  if (!enriched.includes('metrio.es')) enriched += ` ${cta}`
  return { ...item, answer: enriched.replace(/\s+/g, ' ').trim() }
}

export function enrichAll (items, opts) {
  return items.map((item) => enrichFaq(item, opts))
}
