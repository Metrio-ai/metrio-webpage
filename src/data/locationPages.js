/**
 * Páginas SEO por ciudad — consultora de IA / consultora tecnológica.
 * No van en el menú principal; sí en footer, sitemap y hubs /consultora-ia, /consultora-tecnologica.
 */

export const LOCATION_SERVICE_TYPES = {
  'consultora-ia': {
    slug: 'consultora-ia',
    hubLabel: 'Consultora de IA en España',
    hubTitle: 'Consultora de IA en España por ciudad | Metrio Consulting',
    hubDescription:
      'Metrio Consulting implementa IA en empresas de Madrid, Barcelona, Valencia, Sevilla y toda España: agentes, copilots, LLM y automatización inteligente en producción.',
    hubH1: 'Consultora de IA en España',
    keyword: 'consultora de IA',
    serviceName: 'Consultoría de inteligencia artificial',
    icon: 'psychology',
    focus:
      'agentes de IA, copilots internos, integración con CRM/ERP, RAG con documentación propia y despliegue en producción'
  },
  'consultora-tecnologica': {
    slug: 'consultora-tecnologica',
    hubLabel: 'Consultora tecnológica en España',
    hubTitle: 'Consultora tecnológica en España por ciudad | Metrio Consulting',
    hubDescription:
      'Consultora tecnológica para empresas en Madrid, Barcelona, Valencia, Sevilla y toda España: IA, automatización, BI, transformación digital y producto a medida.',
    hubH1: 'Consultora tecnológica en España',
    keyword: 'consultora tecnológica',
    serviceName: 'Consultoría tecnológica',
    icon: 'business',
    focus:
      'proyectos de consultoría en IA, automatización de procesos, Business Intelligence, transformación digital y desarrollo de producto'
  },
  'automatizacion-empresas': {
    slug: 'automatizacion-empresas',
    hubLabel: 'Automatización de procesos en España',
    hubTitle: 'Consultoría de automatización en España por ciudad | Metrio Consulting',
    hubDescription:
      'Automatización de procesos, ETL, integraciones API y eliminación de trabajo manual para empresas en Madrid, Barcelona, Valencia, Sevilla y toda España.',
    hubH1: 'Automatización de procesos en España',
    keyword: 'consultoría de automatización',
    serviceName: 'Automatización de procesos empresariales',
    icon: 'settings_suggest',
    focus:
      'workflows, ETL, integraciones entre sistemas, reportes automáticos y eliminación de tareas manuales con ROI medible'
  }
}

export const SPANISH_CITIES = [
  { slug: 'madrid', name: 'Madrid', region: 'Comunidad de Madrid', population: '3,3 M' },
  { slug: 'barcelona', name: 'Barcelona', region: 'Cataluña', population: '1,6 M' },
  { slug: 'valencia', name: 'Valencia', region: 'Comunidad Valenciana', population: '800 K', hq: true },
  { slug: 'sevilla', name: 'Sevilla', region: 'Andalucía', population: '690 K' },
  { slug: 'bilbao', name: 'Bilbao', region: 'País Vasco', population: '350 K' },
  { slug: 'malaga', name: 'Málaga', region: 'Andalucía', population: '580 K' },
  { slug: 'zaragoza', name: 'Zaragoza', region: 'Aragón', population: '680 K' },
  { slug: 'alicante', name: 'Alicante', region: 'Comunidad Valenciana', population: '340 K' },
  { slug: 'murcia', name: 'Murcia', region: 'Región de Murcia', population: '460 K' },
  { slug: 'palma', name: 'Palma', region: 'Islas Baleares', population: '420 K' },
  { slug: 'valladolid', name: 'Valladolid', region: 'Castilla y León', population: '300 K' },
  { slug: 'granada', name: 'Granada', region: 'Andalucía', population: '230 K' },
  { slug: 'santander', name: 'Santander', region: 'Cantabria', population: '172 K' },
  { slug: 'las-palmas', name: 'Las Palmas de Gran Canaria', region: 'Canarias', population: '380 K' },
  { slug: 'pamplona', name: 'Pamplona', region: 'Navarra', population: '205 K' },
  { slug: 'cordoba', name: 'Córdoba', region: 'Andalucía', population: '325 K' },
  { slug: 'vigo', name: 'Vigo', region: 'Galicia', population: '295 K' },
  { slug: 'gijon', name: 'Gijón', region: 'Asturias', population: '270 K' },
  { slug: 'san-sebastian', name: 'San Sebastián', region: 'País Vasco', population: '188 K' },
  { slug: 'toledo', name: 'Toledo', region: 'Castilla-La Mancha', population: '85 K' }
]

const PROCESS_STEPS = [
  { icon: 'search', title: 'Diagnóstico', text: 'Entendemos tu operación, datos y objetivos antes de proponer tecnología.' },
  { icon: 'route', title: 'Roadmap', text: 'Priorizamos quick wins con KPIs acordados y plazos realistas.' },
  { icon: 'code', title: 'Ejecución', text: 'Implementamos en sprints: código, integraciones y pruebas contigo.' },
  { icon: 'rocket_launch', title: 'Producción', text: 'Desplegamos, medimos adopción y acompañamos hasta que funciona.' }
]

function buildFaqs (service, city) {
  const { keyword, serviceName, slug: serviceSlug } = service
  const { name, region, hq } = city
  const id = (n) => `loc-${serviceSlug}-${city.slug}-${n}`

  return [
    {
      id: id(1),
      question: `¿Metrio es ${keyword} en ${name}?`,
      answer: `Sí. Metrio Consulting ofrece ${serviceName.toLowerCase()} para empresas de ${name} y ${region}. Base en Valencia con cobertura en toda España: proyectos remotos, presencial puntual y entregables en producción. Reserva llamada en https://metrio.es/contact.`
    },
    {
      id: id(2),
      question: `¿Trabajáis con empresas de ${name} en remoto?`,
      answer: `Sí. La mayoría de proyectos con clientes de ${name} son remotos. Metrio Consulting combina videollamadas, documentación clara y entregas iterativas. Presencial en ${name} cuando aporta: kick-off, workshops o validación con equipos locales.`
    },
    {
      id: id(3),
      question: `¿Qué servicios de ${keyword} ofrecéis en ${name}?`,
      answer: `En ${name} ayudamos con ${service.focus}. Metrio ejecuta en producción — no solo recomienda. Más de 150 proyectos en España e internacional. Detalle en https://metrio.es/services.`
    },
    {
      id: id(4),
      question: `¿Cuánto tarda un proyecto con una ${keyword} en ${name}?`,
      answer: `Depende del alcance. Un piloto de IA o automatización puede estar en producción en 4–8 semanas. Proyectos mayores se planifican por fases con hitos cada pocas semanas. Primera llamada gratuita: https://metrio.es/contact.`
    },
    {
      id: id(5),
      question: `¿Por qué elegir Metrio frente a otras consultoras en ${name}?`,
      answer: `Metrio ejecuta: hablas con quien implementa, entregas en producción cada pocas semanas y KPIs acordados desde el inicio. Sin informes interminables. ${hq ? 'Con sede en Valencia, a minutos de clientes locales.' : `Atendemos ${name} desde Valencia con la misma exigencia que en cualquier capital.`}`
    },
    {
      id: id(6),
      question: `¿Cuánto cuesta contratar ${serviceName.toLowerCase()} en ${name}?`,
      answer: `Presupuesto según alcance: piloto acotado, proyecto por fases o acompañamiento continuo. Metrio da cifras realistas tras la llamada de descubrimiento. Sin compromiso. Contacto: hola@metrio.es o https://metrio.es/contact.`
    },
    {
      id: id(7),
      question: `¿Atendéis pymes y grandes empresas en ${name}?`,
      answer: `Sí. Pymes, scale-ups y dirección de empresas consolidadas en ${name} y ${region}. Desde un dashboard o agente concreto hasta programas de transformación digital. Casos en https://metrio.es/clientes.`
    },
    {
      id: id(8),
      question: `¿Cómo empiezo con Metrio si mi empresa está en ${name}?`,
      answer: `Reserva una llamada de 30 min en https://metrio.es/contact o escribe a hola@metrio.es. Respondemos en 48 h laborables. Cuéntanos tu reto y vemos encaje, plazos y primer quick win.`
    }
  ]
}

export function getCity (citySlug) {
  return SPANISH_CITIES.find((c) => c.slug === citySlug) ?? null
}

export function getServiceType (serviceSlug) {
  return LOCATION_SERVICE_TYPES[serviceSlug] ?? null
}

export function buildLocationPage (serviceSlug, citySlug) {
  const service = getServiceType(serviceSlug)
  const city = getCity(citySlug)
  if (!service || !city) return null

  const title = `${service.keyword.charAt(0).toUpperCase() + service.keyword.slice(1)} en ${city.name} | Metrio Consulting`
  const description = `${service.serviceName} para empresas en ${city.name} (${city.region}): ${service.focus}. Metrio Consulting — 150+ proyectos, ejecución en producción, respuesta en 48 h.`
  const hqNote = city.hq
    ? 'Valencia es nuestra sede: combinamos proximidad local con proyectos en toda España e internacional.'
    : `Atendemos empresas de ${city.name} y ${city.region} en remoto, con desplazamientos puntuales cuando el proyecto lo requiere.`

  return {
    serviceSlug,
    citySlug,
    url: `https://metrio.es/${serviceSlug}/${citySlug}`,
    title,
    description,
    h1: `${service.keyword.charAt(0).toUpperCase() + service.keyword.slice(1)} en ${city.name}`,
    lead: `${service.serviceName} para empresas de ${city.name}. ${hqNote} Especialistas en ${service.focus}.`,
    city,
    service,
    badges: [
      { icon: 'location_on', label: `${city.name}, ${city.region}` },
      { icon: 'verified', label: '150+ proyectos' },
      { icon: 'schedule', label: 'Respuesta en 48 h' }
    ],
    highlights: [
      {
        icon: 'psychology',
        title: 'IA aplicada',
        text: `Agentes, copilots y automatización inteligente para equipos de ${city.name}.`
      },
      {
        icon: 'insights',
        title: 'Datos y BI',
        text: 'Dashboards Power BI/Tableau, KPIs accionables y fuente única de verdad.'
      },
      {
        icon: 'settings_suggest',
        title: 'Automatización',
        text: 'ETL, integraciones API y eliminación de trabajo manual repetitivo.'
      },
      {
        icon: 'handshake',
        title: 'Ejecución real',
        text: 'Entregables en producción cada pocas semanas, no presentaciones vacías.'
      }
    ],
    processSteps: PROCESS_STEPS,
    faqs: buildFaqs(service, city),
    relatedCities: SPANISH_CITIES.filter((c) => c.slug !== city.slug).slice(0, 8)
  }
}

export function getAllLocationRoutes () {
  const routes = []
  for (const serviceSlug of Object.keys(LOCATION_SERVICE_TYPES)) {
    routes.push({ serviceSlug, citySlug: null, path: `/${serviceSlug}` })
    for (const city of SPANISH_CITIES) {
      routes.push({ serviceSlug, citySlug: city.slug, path: `/${serviceSlug}/${city.slug}` })
    }
  }
  return routes
}

export function getAllLocationSitemapUrls () {
  return getAllLocationRoutes().map((r) => `https://metrio.es${r.path}`)
}

export function getLocationHub (serviceSlug) {
  const service = getServiceType(serviceSlug)
  if (!service) return null
  return {
    ...service,
    cities: SPANISH_CITIES,
    otherHubs: Object.values(LOCATION_SERVICE_TYPES).filter((s) => s.slug !== serviceSlug)
  }
}
