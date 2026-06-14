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

const HERO_BADGES = [
  { icon: 'location_on', label: 'Valencia, España' },
  { icon: 'language', label: 'España e internacional' },
  { icon: 'verified', label: '150+ proyectos' }
]

const STATS = [
  { value: '5+', label: 'Años en datos, IA y automatización' },
  { value: '150+', label: 'Proyectos entregados en producción' },
  { value: '48 h', label: 'Respuesta a nuevas consultas' },
  { value: '100%', label: 'Enfoque en ejecución, no en slides' }
]

const TIMELINE = [
  {
    step: '01',
    year: 'Origen',
    title: 'De la idea al primer proyecto real',
    text: 'Nacimos con una convicción: la tecnología solo vale si llega a producción. Empezamos resolviendo problemas concretos de datos, automatización e ingeniería — sin presentaciones interminables.'
  },
  {
    step: '02',
    year: 'Crecimiento',
    title: 'De Valencia a toda España',
    text: 'Fuimos ampliando clientes: pymes, scale-ups y dirección que buscaba un partner que entendiera negocio y código. Remoto por defecto, presencial cuando aporta.'
  },
  {
    step: '03',
    year: 'Hoy',
    title: 'Consultora que ejecuta, en ES e internacional',
    text: 'Agentes de IA, dashboards, automatizaciones y producto digital desplegados y en uso. Equipo joven, ágil, con mentalidad de fundadores: ownership, velocidad y cero humo.'
  }
]

const COMPARE = {
  them: [
    'Informes de 80 diapositivas',
    'Account manager que filtra todo',
    'Roadmaps de seis meses sin entrega',
    'Promesas de IA sin despliegue',
    'Facturación por horas sin KPIs'
  ],
  us: [
    'Entregables en producción cada pocas semanas',
    'Hablas con quien implementa',
    'Quick wins medibles desde el mes 1',
    'IA integrada en tus procesos reales',
    'Impacto acordado antes de empezar'
  ]
}

const VALUES = [
  {
    icon: 'rocket_launch',
    title: 'Espíritu emprendedor',
    text: 'Priorizamos, iteramos y medimos como quien construye negocio. Decimos “aún no compensa” cuando es verdad.'
  },
  {
    icon: 'engineering',
    title: 'Ejecutamos en producción',
    text: 'IA, automatización, BI y software desplegado. Diagnóstico → diseño → código → acompañamiento hasta que funciona.'
  },
  {
    icon: 'public',
    title: 'Valencia, alcance global',
    text: 'Base en Valencia, proyectos en toda España y clientes internacionales. Español e inglés.'
  },
  {
    icon: 'handshake',
    title: 'Codo a codo contigo',
    text: 'Con dirección, operaciones, datos y tech. Comunicación directa, respuesta en 48 h, transparencia en cada hito.'
  }
]

const PROFILES = [
  {
    icon: 'corporate_fare',
    title: 'Empresa consolidada',
    text: 'Modernizar procesos, centralizar datos, implementar IA con gobernanza y ROI claro — sin paralizar la operación.'
  },
  {
    icon: 'trending_up',
    title: 'Startup en crecimiento',
    text: 'MVP, automatización para escalar sin contratar de más, BI para inversores y agentes internos para equipos pequeños.'
  },
  {
    icon: 'flag',
    title: 'Proyecto concreto',
    text: 'Un dashboard, un agente, una integración o un flujo automatizado con alcance cerrado y fecha de entrega.'
  }
]

const PILLARS = [
  { icon: 'search', title: 'Diagnóstico honesto', text: 'Entendemos el reto antes de proponer tecnología.' },
  { icon: 'route', title: 'Roadmap accionable', text: 'Priorizamos quick wins y entregas iterativas.' },
  { icon: 'monitoring', title: 'Impacto medible', text: 'KPIs acordados: tiempo, calidad, adopción o negocio.' }
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
            cssSelector: ['.aboutPageHeroTitle', '.aboutPageHeroLead', '.aboutPageManifestoQuote']
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
          <div className="aboutPageHeroBg" aria-hidden="true" />
          <div className="aboutPageHeroInner">
            <div className="aboutPageHeroGrid">
              <div className="aboutPageHeroContent">
                <p className="sectionLabel">Sobre nosotros</p>
                <h1 className="aboutPageHeroTitle">
                  La consultora tecnológica que <em>ejecuta</em>, no la que presenta
                </h1>
                <p className="aboutPageHeroLead">
                  Consultores e ingenieros con espíritu emprendedor desde Valencia.
                  Más de cinco años y 150+ proyectos de IA, automatización, BI y transformación
                  digital en España e internacional.
                </p>
                <ul className="aboutPageHeroBadges">
                  {HERO_BADGES.map((b) => (
                    <li key={b.label}>
                      <span className="material-icons" aria-hidden="true">{b.icon}</span>
                      {b.label}
                    </li>
                  ))}
                </ul>
                <BookCallActions align="start" variant="hero" />
              </div>
              <div className="aboutPageHeroVisual">
                <SectionImage
                  src={SECTION_IMAGES.aboutPageHero}
                  alt="Consultores e ingenieros de Metrio desarrollando soluciones de IA, datos y automatización"
                  width={960}
                  height={660}
                  priority
                  caption="El mismo equipo desde el diagnóstico hasta producción"
                />
              </div>
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

        <section className="aboutPageManifesto" aria-labelledby="about-manifesto-title">
          <div className="aboutPageManifestoInner">
            <p className="sectionLabel">Nuestra creencia</p>
            <h2 id="about-manifesto-title" className="aboutPageManifestoTitle">
              Las empresas no necesitan más slides
            </h2>
            <blockquote className="aboutPageManifestoQuote">
              Necesitan soluciones que funcionen el lunes por la mañana. Por eso Metrio existe:
              consultoría tecnológica con código, datos e IA desplegados — con métricas, no con humo.
            </blockquote>
            <div className="aboutPagePillars">
              {PILLARS.map((p) => (
                <article key={p.title} className="aboutPagePillar">
                  <span className="material-icons aboutPagePillarIcon" aria-hidden="true">{p.icon}</span>
                  <h3 className="aboutPagePillarTitle">{p.title}</h3>
                  <p className="aboutPagePillarText">{p.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="aboutPageStory" aria-labelledby="about-story-title">
          <div className="aboutPageStoryInner">
            <div className="aboutPageStoryHeader">
              <div>
                <p className="sectionLabel">Nuestra historia</p>
                <h2 id="about-story-title" className="aboutPageStoryTitle">
                  De emprendedores que construyen
                </h2>
                <p className="aboutPageStoryLead">
                  Metrio nació en Valencia con una idea simple: unir asesoría estratégica y
                  ejecución técnica en el mismo equipo. Sin capas, sin burocracia, sin promesas vacías.
                </p>
              </div>
              <SectionImage
                src={SECTION_IMAGES.aboutPageStory}
                alt="Equipo de consultoría planificando un proyecto de transformación digital"
                width={640}
                height={440}
                className="aboutPageStoryImg"
              />
            </div>
            <ol className="aboutPageTimeline">
              {TIMELINE.map((item) => (
                <li key={item.step} className="aboutPageTimelineItem">
                  <div className="aboutPageTimelineMarker">
                    <span className="aboutPageTimelineStep">{item.step}</span>
                  </div>
                  <article className="aboutPageTimelineCard">
                    <p className="aboutPageTimelineYear">{item.year}</p>
                    <h3 className="aboutPageTimelineTitle">{item.title}</h3>
                    <p className="aboutPageTimelineText">{item.text}</p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="aboutPageCompare" aria-labelledby="about-compare-title">
          <div className="aboutPageCompareInner">
            <h2 id="about-compare-title" className="aboutPageCompareTitle">
              Metrio vs. la consultora tradicional
            </h2>
            <p className="aboutPageCompareLead">
              No competimos en tamaño ni en plantillas PowerPoint. Competimos en resultados.
            </p>
            <div className="aboutPageCompareGrid">
              <article className="aboutPageCompareCol aboutPageCompareCol--them">
                <h3 className="aboutPageCompareColTitle">Consultora tradicional</h3>
                <ul>
                  {COMPARE.them.map((item) => (
                    <li key={item}>
                      <span className="material-icons" aria-hidden="true">close</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
              <article className="aboutPageCompareCol aboutPageCompareCol--us">
                <h3 className="aboutPageCompareColTitle">Metrio Consulting</h3>
                <ul>
                  {COMPARE.us.map((item) => (
                    <li key={item}>
                      <span className="material-icons" aria-hidden="true">check_circle</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="aboutPageProfiles" aria-labelledby="about-profiles-title">
          <div className="aboutPageProfilesInner">
            <h2 id="about-profiles-title" className="aboutPageProfilesTitle">
              Con quién trabajamos
            </h2>
            <div className="aboutPageProfilesGrid">
              {PROFILES.map((profile) => (
                <article key={profile.title} className="aboutPageProfileCard">
                  <span className="material-icons aboutPageProfileIcon" aria-hidden="true">
                    {profile.icon}
                  </span>
                  <h3 className="aboutPageProfileTitle">{profile.title}</h3>
                  <p className="aboutPageProfileText">{profile.text}</p>
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

        <section className="aboutPageValencia" aria-labelledby="about-valencia-title">
          <div className="aboutPageValenciaInner">
            <div className="aboutPageValenciaContent">
              <p className="sectionLabel">Valencia</p>
              <h2 id="about-valencia-title" className="aboutPageValenciaTitle">
                Nuestra base, vuestro alcance
              </h2>
              <p className="aboutPageValenciaText">
                Valencia es nuestro hogar: ecosistema emprendedor, talento tech y calidad de vida.
                Desde aquí servimos a toda España y clientes internacionales en remoto, con presencial
                puntual cuando el proyecto lo pide.
              </p>
              <Link to="/clientes" className="aboutPageValenciaLink">
                Ver clientes y casos
                <span className="material-icons" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
            <SectionImage
              src={SECTION_IMAGES.aboutPageValencia}
              alt="Proceso de consultoría y transformación digital desde Valencia"
              width={720}
              height={480}
              className="aboutPageValenciaImg"
            />
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
          <div className="aboutPageCtaInner">
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
              <Link to="/trabaja-con-nosotros">Trabaja con nosotros</Link>
              <span aria-hidden="true">·</span>
              <Link to="/clientes">Nuestros clientes</Link>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default AboutPage
