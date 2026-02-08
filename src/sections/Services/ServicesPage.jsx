import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './ServicesPage.css'

const SERVICES_SEO = {
  title: 'Servicios | Consultoría tecnológica, BI, leads cualificados | Metrio',
  description: 'Metrio Consulting: Business Intelligence, desarrollo de producto, transformación digital, asesoramiento en datos y generación de leads cualificados con base de datos accionable y apertura de mailing superior al 40%.'
}

const servicesData = [
  {
    id: 'business-intelligence',
    icon: 'insights',
    title: 'Business Intelligence y dashboards',
    subtitle: 'Datos que deciden',
    description: 'Diseñamos y desarrollamos soluciones de Business Intelligence a medida: dashboards en Power BI, Tableau o herramientas propias que convierten tus datos en indicadores claros para la toma de decisiones. Desde la definición del modelo de datos hasta la formación de tu equipo.',
    keywords: ['Power BI', 'Tableau', 'dashboards', 'KPIs', 'visualización de datos']
  },
  {
    id: 'herramientas-datos',
    icon: 'analytics',
    title: 'Herramientas propias para visualización de datos',
    subtitle: 'Software a tu medida',
    description: 'Cuando las soluciones estándar no encajan, creamos aplicaciones y reportes interactivos a medida. Integración con tus fuentes de datos, lógica de negocio personalizada y una interfaz pensada para que tu equipo trabaje con agilidad y sin errores.',
    keywords: ['reportes', 'visualización', 'aplicaciones a medida', 'datos']
  },
  {
    id: 'asesoramiento',
    icon: 'strategy',
    title: 'Asesoramiento estratégico sobre los datos',
    subtitle: 'Criterio y visión',
    description: 'Te ayudamos a definir una estrategia de datos alineada con tus objetivos: qué medir, cómo estructurar la información, qué tecnología elegir y cómo escalar sin perder el control. Consultoría con visión de producto y conocimiento técnico profundo.',
    keywords: ['estrategia de datos', 'consultoría', 'arquitectura de datos']
  },
  {
    id: 'transformacion-digital',
    icon: 'trending_up',
    title: 'Transformación digital',
    subtitle: 'De la idea al producto',
    description: 'Acompañamos a empresas en su proceso de transformación digital: desde la optimización de procesos con datos hasta el diseño y desarrollo de productos digitales. Enfoque pragmático, iterativo y orientado a resultados medibles.',
    keywords: ['transformación digital', 'producto digital', 'procesos']
  },
  {
    id: 'leads-cualificados',
    icon: 'campaign',
    title: 'Leads cualificados y base de datos accionable',
    subtitle: 'Más del 40% de apertura en mailing',
    description: 'Analizamos tu sector y construimos una base de datos accionable de contactos cualificados para que consigas clientes. No compramos listas: investigamos empresas y decisores, validamos datos y estructuramos campañas con una tasa de apertura de email asegurada superior al 40%. Tu equipo de ventas o marketing trabaja con leads listos para convertir.',
    keywords: ['leads cualificados', 'base de datos', 'mailing', 'prospección', 'B2B', 'apertura email']
  }
]

function ServicesPage () {
  const jsonLdRef = useRef(null)

  useEffect(() => {
    document.title = SERVICES_SEO.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', SERVICES_SEO.description)

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Servicios de Metrio Consulting',
      description: 'Consultoría tecnológica, Business Intelligence, desarrollo de producto, transformación digital y generación de leads cualificados.',
      itemListElement: servicesData.map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'Service', name: s.title, description: s.description }
      }))
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    script.id = 'services-jsonld'
    document.head.appendChild(script)
    jsonLdRef.current = script

    return () => {
      document.title = 'Metrio Consulting | Consultoría tecnológica y desarrollo de producto'
      if (metaDesc) metaDesc.setAttribute('content', 'Metrio Consulting: consultoría tecnológica en España. Diseño, desarrollo y evolución de soluciones digitales, datos e IA. Tecnología, producto y criterio.')
      if (jsonLdRef.current?.parentNode) jsonLdRef.current.remove()
    }
  }, [])

  return (
    <div className="servicesPage">
      <Header />
      <main>
        <header className="servicesPageHero">
          <div className="servicesPageHeroGlow" aria-hidden="true" />
          <div className="servicesPageHeroContent">
            <p className="servicesPageHeroLabel">Servicios</p>
            <h1 className="servicesPageHeroTitle">
              Soluciones que impulsan tu negocio
            </h1>
            <p className="servicesPageHeroLead">
              Consultoría tecnológica, datos, producto y generación de leads cualificados.
              Desde 2024 ayudamos a empresas a conectar, analizar e impulsar con tecnología y criterio.
            </p>
          </div>
        </header>

        <div className="servicesPageList">
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
              <ul className="serviceCardKeywords" aria-label="Palabras clave">
                {service.keywords.map((kw) => (
                  <li key={kw}><span>{kw}</span></li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="servicesPageCta" aria-labelledby="cta-title">
          <div className="servicesPageCtaGlow" aria-hidden="true" />
          <h2 id="cta-title" className="servicesPageCtaTitle">
            ¿Hablamos de tu proyecto?
          </h2>
          <p className="servicesPageCtaLead">
            Cuéntanos qué necesitas y te proponemos un enfoque a medida.
          </p>
          <Link to="/contact" className="servicesPageCtaBtn">
            Contactar
            <span className="material-icons" aria-hidden="true">arrow_forward</span>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ServicesPage
