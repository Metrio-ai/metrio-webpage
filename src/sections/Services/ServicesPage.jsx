import { useEffect, useRef } from 'react'
import Layout from '../../components/Layout'
import SectionImage from '../../components/SectionImage'
import { SECTION_IMAGES } from '../../data/sectionImages'
import BookCallActions from '../../components/BookCallActions'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import { servicesFaqs } from '../../data/faqs/services'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './ServicesPage.css'

const SERVICES_SEO = {
  title: 'Servicios de consultoría IA, automatización y BI | Metrio Consulting España',
  description: 'Servicios de Metrio Consulting: implementación de IA empresarial, automatización de procesos, asesoría tecnológica, Business Intelligence (Power BI, Tableau), desarrollo de producto y transformación digital. Consultora en Valencia, España.',
  keywords: 'consultoría IA España, automatización procesos empresariales, business intelligence Power BI, asesoría tecnológica, transformación digital, agentes IA, consultora Valencia'
}

const VALUE_PILLARS = [
  {
    icon: 'support_agent',
    title: 'Asesoramos',
    text: 'Diagnóstico, roadmap y priorización con criterio de negocio. Sin informes que nadie ejecuta.'
  },
  {
    icon: 'architecture',
    title: 'Diseñamos',
    text: 'Arquitectura de datos, flujos, KPIs y soluciones técnicas alineadas con tu operación.'
  },
  {
    icon: 'rocket_launch',
    title: 'Ejecutamos',
    text: 'Entregables en producción: agentes IA, dashboards, automatizaciones y producto digital.'
  }
]

const servicesData = [
  {
    id: 'implementacion-ia',
    icon: 'psychology',
    title: 'Implementación de IA aplicada',
    subtitle: 'De la prueba de concepto a producción',
    description: 'Integramos inteligencia artificial en procesos reales: agentes conversacionales, copilots internos, clasificación automática, extracción de documentos y asistentes conectados a tus sistemas.',
    whoFor: 'Empresas que quieren IA útil, no demos vacías.',
    outcomes: ['Agentes y copilots en uso diario', 'Integración con CRM, ERP o documentación', 'Gobernanza, seguridad y métricas de impacto'],
    keywords: ['IA empresarial', 'agentes IA', 'LLM', 'copilots', 'automatización inteligente']
  },
  {
    id: 'automatizacion',
    icon: 'settings_suggest',
    title: 'Automatización de procesos y workflows',
    subtitle: 'Menos manual, más valor',
    description: 'Eliminamos tareas repetitivas: pipelines de datos, reportes programados, integraciones entre herramientas, alertas y flujos de aprobación.',
    whoFor: 'Equipos operativos, finanzas, RRHH o administración saturados de manual.',
    outcomes: ['Horas semanales recuperadas', 'Menos errores de copiar-pegar', 'Integraciones API y ETL fiables'],
    keywords: ['automatización', 'workflows', 'Python', 'ETL', 'integraciones']
  },
  {
    id: 'asesoria',
    icon: 'support_agent',
    title: 'Asesoría tecnológica y transformación digital',
    subtitle: 'Estrategia con visión de ejecución',
    description: 'Priorizamos inversiones tecnológicas con criterio de negocio: auditoría de sistemas, roadmap, selección de proveedores y arquitectura.',
    whoFor: 'Dirección y equipos técnicos que necesitan claridad antes de invertir.',
    outcomes: ['Roadmap accionable con quick wins', 'Decisiones de stack informadas', 'Acompañamiento hasta la ejecución'],
    keywords: ['asesoría tecnológica', 'consultoría', 'transformación digital', 'roadmap']
  },
  {
    id: 'business-intelligence',
    icon: 'insights',
    title: 'Business Intelligence y dashboards',
    subtitle: 'Una sola fuente de verdad',
    description: 'Modelos de datos y dashboards en Power BI, Tableau o herramientas propias que la gente usa de verdad. KPIs claros y alertas automáticas.',
    whoFor: 'Empresas con datos dispersos en Excel que no cuadran.',
    outcomes: ['Fuente única de verdad', 'Dashboards adoptados por negocio', 'Reportes automatizados'],
    keywords: ['Power BI', 'Tableau', 'dashboards', 'KPIs', 'BI']
  },
  {
    id: 'producto-digital',
    icon: 'code',
    title: 'Desarrollo de producto digital',
    subtitle: 'De la idea al despliegue',
    description: 'Aplicaciones web, APIs e integraciones a medida con React, Node.js, Python y PostgreSQL. Entregas iterativas y código mantenible.',
    whoFor: 'Cuando necesitas algo que no existe en el mercado o encaje exacto con tu operación.',
    outcomes: ['MVP en semanas, no meses', 'Stack moderna y escalable', 'Producto que evoluciona contigo'],
    keywords: ['desarrollo web', 'React', 'APIs', 'producto digital', 'software a medida']
  },
  {
    id: 'leads-cualificados',
    icon: 'campaign',
    title: 'Leads cualificados y base de datos accionable',
    subtitle: 'Prospección B2B con criterio',
    description: 'Bases de contactos investigados y validados, no listas compradas. Segmentación por sector, perfil y encaje con tu oferta.',
    whoFor: 'Equipos comerciales y marketing B2B que quieren dejar de disparar a ciegas.',
    outcomes: ['BBDD accionable y actualizada', 'Segmentación por ICP', 'Aperturas superiores al 40%'],
    keywords: ['leads B2B', 'prospección', 'base de datos', 'mailing']
  }
]

function ServicesPage () {
  const jsonLdRef = useRef(null)

  useEffect(() => {
    document.title = SERVICES_SEO.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', SERVICES_SEO.description)
    const metaKw = document.querySelector('meta[name="keywords"]')
    if (metaKw) metaKw.setAttribute('content', SERVICES_SEO.keywords)

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://metrio.es/' },
            { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://metrio.es/services' }
          ]
        },
        {
          '@type': 'ItemList',
          name: 'Servicios de Metrio Consulting',
          description: SERVICES_SEO.description,
          itemListElement: servicesData.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            item: {
              '@type': 'Service',
              name: s.title,
              description: s.description,
              provider: { '@type': 'Organization', name: 'Metrio Consulting' },
              areaServed: 'ES'
            }
          }))
        },
        {
          '@type': 'FAQPage',
          mainEntity: buildFaqSchema(servicesFaqs).mainEntity
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(graph)
    script.id = 'services-jsonld'
    document.head.appendChild(script)
    jsonLdRef.current = script

    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      if (jsonLdRef.current?.parentNode) jsonLdRef.current.remove()
    }
  }, [])

  return (
    <Layout className="servicesPage">
      <main>
        <header className="servicesPageHero">
          <div className="servicesPageHeroSplit">
            <div className="servicesPageHeroVisual">
              <SectionImage
                src={SECTION_IMAGES.servicesPageHero}
                alt="Consultoría tecnológica: IA, automatización y transformación digital"
                width={960}
                height={660}
                priority
              />
            </div>
            <div className="servicesPageHeroContent">
              <p className="sectionLabel">Servicios</p>
              <h1 className="servicesPageHeroTitle">
                Consultoría que implementa IA, automatización y transformación digital
              </h1>
              <p className="servicesPageHeroLead">
                Asesoramos, diseñamos y ejecutamos. Un equipo para estrategia, datos e ingeniería
                con entregables en producción y resultados medibles en España.
              </p>
              <BookCallActions
                align="start"
                variant="hero"
                scrollTarget="#servicios-list"
                scrollLabel="Ver servicios"
              />
            </div>
          </div>
        </header>

        <section className="servicesPagePillars" aria-label="Cómo trabajamos">
          {VALUE_PILLARS.map((p) => (
            <article key={p.title} className="servicesPillar">
              <span className="material-icons servicesPillarIcon" aria-hidden="true">{p.icon}</span>
              <h2 className="servicesPillarTitle">{p.title}</h2>
              <p className="servicesPillarText">{p.text}</p>
            </article>
          ))}
        </section>

        <div className="servicesPageList" id="servicios-list">
          {servicesData.map((service, index) => (
            <article
              key={service.id}
              id={service.id}
              className="serviceCard"
              aria-labelledby={`service-title-${service.id}`}
            >
              <div className="serviceCardNumber" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="serviceCardIcon" aria-hidden="true">
                <span className="material-icons">{service.icon}</span>
              </div>
              <h2 id={`service-title-${service.id}`} className="serviceCardTitle">
                {service.title}
              </h2>
              <p className="serviceCardSubtitle">{service.subtitle}</p>
              <p className="serviceCardDescription">{service.description}</p>
              <p className="serviceCardWho">
                <strong>Para quién:</strong> {service.whoFor}
              </p>
              <ul className="serviceCardOutcomes" aria-label="Resultados">
                {service.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
              <ul className="serviceCardKeywords" aria-label="Palabras clave">
                {service.keywords.map((kw) => (
                  <li key={kw}><span>{kw}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <ExpandableFaqSection
          title="Preguntas frecuentes sobre nuestros servicios"
          titleId="services-faq-title"
          items={servicesFaqs}
          initialCount={8}
          className="expandableFaq--subtle servicesPageFaqSection"
        />

        <section className="servicesPageCta" aria-labelledby="cta-title">
          <h2 id="cta-title" className="servicesPageCtaTitle">
            ¿Hablamos de tu proyecto?
          </h2>
          <p className="servicesPageCtaLead">
            Cuéntanos tu reto en una llamada de 30 min o escríbenos. Respuesta en 48 horas.
          </p>
          <BookCallActions />
        </section>
      </main>
    </Layout>
  )
}

export default ServicesPage
