import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import SectionImage from '../../components/SectionImage'
import { SECTION_IMAGES } from '../../data/sectionImages'
import BookCallActions from '../../components/BookCallActions'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import { aboutFaqs } from '../../data/faqs/about'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './AboutPage.css'

const ABOUT_SEO = {
  title: 'Sobre nosotros | Metrio Consulting – Consultora tecnológica en Valencia, España',
  description:
    'Conoce Metrio Consulting: consultora tecnológica con espíritu emprendedor desde Valencia. Más de 5 años y 150+ proyectos de IA, automatización, BI y transformación digital en España e internacional.',
  keywords:
    'consultora tecnológica Valencia, consultoría IA España, transformación digital Valencia, emprendedores tecnología, automatización empresas, business intelligence España'
}

const MILESTONES = [
  {
    year: 'Origen',
    title: 'De la idea al primer proyecto',
    text: 'Nacimos con una convicción clara: la tecnología solo vale si llega a producción y genera impacto real. Empezamos como emprendedores resolviendo problemas concretos de datos, automatización e ingeniería para empresas que necesitaban resultados, no presentaciones.'
  },
  {
    year: 'Crecimiento',
    title: 'De Valencia al resto de España',
    text: 'Desde Valencia fuimos ampliando clientes por toda España: pymes, scale-ups y equipos de dirección que buscaban un partner que entendiera negocio y código. Trabajo remoto, reuniones cuando hace falta y entregas iterativas.'
  },
  {
    year: 'Hoy',
    title: 'España e internacional, siempre ejecutando',
    text: 'Hoy llevamos proyectos en España y en mercados internacionales: agentes de IA, dashboards, automatizaciones y producto digital. Seguimos siendo un equipo joven, ágil y con mentalidad de fundadores: ownership, velocidad y cero humo.'
  }
]

const VALUES = [
  {
    icon: 'rocket_launch',
    title: 'Espíritu emprendedor',
    text: 'Pensamos como quien construye negocio: priorizamos, iteramos y medimos. No somos una consultora de informes eternos.'
  },
  {
    icon: 'engineering',
    title: 'Ejecutamos en producción',
    text: 'IA, automatización, BI y software desplegado y en uso. Diagnóstico, diseño, desarrollo y acompañamiento hasta que funciona.'
  },
  {
    icon: 'public',
    title: 'Valencia, alcance global',
    text: 'Sede en Valencia con proyectos en toda España y clientes internacionales. Español e inglés, remoto o presencial según el proyecto.'
  },
  {
    icon: 'handshake',
    title: 'Codo a codo contigo',
    text: 'Trabajamos con dirección, operaciones, datos y tecnología. Comunicación directa, respuesta en 48 h y transparencia en cada entrega.'
  }
]

const STATS = [
  { value: '5+', label: 'Años llevando proyectos de datos, IA y automatización' },
  { value: '150+', label: 'Proyectos entregados con impacto medible' },
  { value: 'ES + INT', label: 'Clientes en España y mercados internacionales' },
  { value: '48 h', label: 'Tiempo de respuesta habitual a nuevas consultas' }
]

function AboutPage () {
  const jsonLdRef = useRef(null)

  useEffect(() => {
    document.title = ABOUT_SEO.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', ABOUT_SEO.description)
    const metaKw = document.querySelector('meta[name="keywords"]')
    if (metaKw) metaKw.setAttribute('content', ABOUT_SEO.keywords)

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://metrio.es/' },
            { '@type': 'ListItem', position: 2, name: 'Sobre nosotros', item: 'https://metrio.es/sobre-nosotros' }
          ]
        },
        {
          '@type': 'AboutPage',
          '@id': 'https://metrio.es/sobre-nosotros#webpage',
          url: 'https://metrio.es/sobre-nosotros',
          name: ABOUT_SEO.title,
          description: ABOUT_SEO.description,
          inLanguage: 'es-ES',
          isPartOf: { '@id': 'https://metrio.es/#website' },
          about: { '@id': 'https://metrio.es/#organization' },
          speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['.aboutPageHeroTitle', '.aboutPageHeroLead', '.aboutPageStoryLead']
          }
        },
        {
          '@type': 'Organization',
          '@id': 'https://metrio.es/#organization',
          name: 'Metrio Consulting',
          url: 'https://metrio.es',
          description: ABOUT_SEO.description,
          foundingLocation: { '@type': 'Place', name: 'Valencia, España' },
          areaServed: ['ES', 'International'],
          knowsAbout: [
            'Inteligencia artificial',
            'Automatización de procesos',
            'Business Intelligence',
            'Transformación digital',
            'Consultoría tecnológica'
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: buildFaqSchema(aboutFaqs).mainEntity
        }
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(graph)
    script.id = 'about-jsonld'
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
    <Layout className="aboutPage">
      <main>
        <header className="aboutPageHero">
          <div className="aboutPageHeroSplit">
            <div className="aboutPageHeroVisual">
              <SectionImage
                src={SECTION_IMAGES.aboutPageHero}
                alt="Proceso de consultoría: diagnóstico, ejecución y resultados medibles"
                width={960}
                height={660}
                priority
              />
            </div>
            <div className="aboutPageHeroContent">
              <p className="sectionLabel">Sobre nosotros</p>
              <h1 className="aboutPageHeroTitle">
                Consultores e ingenieros con espíritu emprendedor desde Valencia
              </h1>
              <p className="aboutPageHeroLead">
                Más de cinco años llevando proyectos de IA, automatización, datos y transformación
                digital en España e internacional. Ejecutamos de principio a fin — no solo recomendamos.
              </p>
              <BookCallActions
                align="start"
                variant="hero"
                scrollTarget="#about-story-title"
                scrollLabel="Nuestra historia"
              />
            </div>
          </div>
        </header>

        <section className="aboutPageStats" aria-label="Metrio en cifras">
          <div className="aboutPageStatsGrid">
            {STATS.map((stat) => (
              <article key={stat.label} className="aboutPageStat">
                <p className="aboutPageStatValue">{stat.value}</p>
                <p className="aboutPageStatLabel">{stat.label}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="aboutPageStory" aria-labelledby="about-story-title">
          <div className="aboutPageStoryInner">
            <p className="sectionLabel">Nuestra historia</p>
            <h2 id="about-story-title" className="aboutPageStoryTitle">
              De emprendedores que construyen, no de consultores que presentan
            </h2>
            <p className="aboutPageStoryLead">
              Metrio nació en Valencia con una idea simple: las empresas no necesitan más slides,
              necesitan soluciones que funcionen. Somos un equipo joven con mentalidad de fundadores —
              curiosos, exigentes y obsesionados con entregar valor real en cada proyecto.
            </p>
            <div className="aboutPageTimeline">
              {MILESTONES.map((item) => (
                <article key={item.year} className="aboutPageMilestone">
                  <p className="aboutPageMilestoneYear">{item.year}</p>
                  <h3 className="aboutPageMilestoneTitle">{item.title}</h3>
                  <p className="aboutPageMilestoneText">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="aboutPageValues" aria-labelledby="about-values-title">
          <div className="aboutPageValuesInner">
            <h2 id="about-values-title" className="aboutPageValuesTitle">
              Cómo somos y cómo trabajamos
            </h2>
            <div className="aboutPageValuesGrid">
              {VALUES.map((value) => (
                <article key={value.title} className="aboutPageValueCard">
                  <span className="material-icons aboutPageValueIcon" aria-hidden="true">
                    {value.icon}
                  </span>
                  <h3 className="aboutPageValueTitle">{value.title}</h3>
                  <p className="aboutPageValueText">{value.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ExpandableFaqSection
          title="Preguntas frecuentes sobre Metrio Consulting"
          titleId="about-faq-title"
          items={aboutFaqs}
          initialCount={8}
          className="expandableFaq--subtle"
        />

        <section className="aboutPageCta" aria-labelledby="about-cta-title">
          <h2 id="about-cta-title" className="aboutPageCtaTitle">
            ¿Quieres conocernos en una llamada?
          </h2>
          <p className="aboutPageCtaLead">
            Cuéntanos tu reto. Primera conversación sin compromiso, respuesta en 48 horas.
          </p>
          <BookCallActions />
          <p className="aboutPageCtaLinks">
            <Link to="/services">Ver servicios</Link>
            <span aria-hidden="true">·</span>
            <Link to="/clientes">Nuestros clientes</Link>
          </p>
        </section>
      </main>
    </Layout>
  )
}

export default AboutPage
