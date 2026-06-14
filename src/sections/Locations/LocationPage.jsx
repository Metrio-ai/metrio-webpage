import { useEffect } from 'react'
import { Link, useParams, useLocation, Navigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import BookCallActions from '../../components/BookCallActions'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import { buildLocationPage } from '../../data/locationPages'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './Locations.css'

function LocationPage () {
  const { citySlug } = useParams()
  const serviceSlug = useLocation().pathname.split('/').filter(Boolean)[0]
  const page = buildLocationPage(serviceSlug, citySlug)

  useEffect(() => {
    if (!page) return undefined

    document.title = page.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', page.description)

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://metrio.es/' },
            {
              '@type': 'ListItem',
              position: 2,
              name: page.service.hubLabel,
              item: `https://metrio.es/${page.serviceSlug}`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: page.city.name,
              item: page.url
            }
          ]
        },
        {
          '@type': 'ProfessionalService',
          '@id': `${page.url}#service`,
          name: `Metrio Consulting — ${page.service.serviceName} en ${page.city.name}`,
          url: page.url,
          description: page.description,
          areaServed: {
            '@type': 'City',
            name: page.city.name,
            containedInPlace: { '@type': 'AdministrativeArea', name: page.city.region }
          },
          provider: {
            '@type': 'Organization',
            name: 'Metrio Consulting',
            url: 'https://metrio.es',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Valencia',
              addressCountry: 'ES'
            }
          },
          serviceType: page.service.serviceName
        },
        buildFaqSchema(page.faqs)
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(graph)
    script.id = 'location-page-schema'
    document.head.appendChild(script)

    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      document.getElementById('location-page-schema')?.remove()
    }
  }, [page])

  if (!page) return <Navigate to={`/${serviceSlug}`} replace />

  return (
    <Layout className="locationPage">
      <main className="locationMain">
        <nav className="locationBreadcrumb" aria-label="Miga de pan">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to={`/${page.serviceSlug}`}>{page.service.hubLabel}</Link>
          <span aria-hidden="true">/</span>
          <span>{page.city.name}</span>
        </nav>

        <header className="locationHero">
          <div className="locationHeroInner">
            <p className="locationLabel">
              <span className="material-icons" aria-hidden="true">{page.service.icon}</span>
              {page.service.serviceName}
            </p>
            <h1 className="locationTitle">{page.h1}</h1>
            <p className="locationLead">{page.lead}</p>
            <ul className="locationBadges">
              {page.badges.map((b) => (
                <li key={b.label}>
                  <span className="material-icons" aria-hidden="true">{b.icon}</span>
                  {b.label}
                </li>
              ))}
            </ul>
            <BookCallActions align="start" variant="hero" />
          </div>
        </header>

        <section className="locationHighlights" aria-labelledby="location-highlights-title">
          <h2 id="location-highlights-title" className="locationSectionTitle">
            Qué hacemos en {page.city.name}
          </h2>
          <div className="locationHighlightsGrid">
            {page.highlights.map((item) => (
              <article key={item.title} className="locationHighlightCard">
                <span className="material-icons locationHighlightIcon" aria-hidden="true">{item.icon}</span>
                <h3 className="locationHighlightTitle">{item.title}</h3>
                <p className="locationHighlightText">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="locationProcess" aria-labelledby="location-process-title">
          <div className="locationProcessInner">
            <h2 id="location-process-title" className="locationSectionTitle">
              Cómo trabajamos con empresas de {page.city.name}
            </h2>
            <ol className="locationProcessList">
              {page.processSteps.map((step, i) => (
                <li key={step.title} className="locationProcessStep">
                  <span className="locationProcessNum">{String(i + 1).padStart(2, '0')}</span>
                  <span className="material-icons locationProcessIcon" aria-hidden="true">{step.icon}</span>
                  <div>
                    <h3 className="locationProcessTitle">{step.title}</h3>
                    <p className="locationProcessText">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <ExpandableFaqSection
          title={`Preguntas frecuentes — ${page.service.keyword} en ${page.city.name}`}
          titleId="location-faq-title"
          items={page.faqs}
          initialCount={6}
          numbered
          variant="premium"
          className="locationFaq"
          showSearch
        />

        <section className="locationRelated" aria-labelledby="location-related-title">
          <h2 id="location-related-title" className="locationSectionTitle">
            {page.service.keyword.charAt(0).toUpperCase() + page.service.keyword.slice(1)} en otras ciudades
          </h2>
          <div className="locationRelatedGrid">
            {page.relatedCities.map((city) => (
              <Link
                key={city.slug}
                to={`/${page.serviceSlug}/${city.slug}`}
                className="locationRelatedLink"
              >
                {city.name}
              </Link>
            ))}
            <Link to={`/${page.serviceSlug}`} className="locationRelatedLink locationRelatedLink--all">
              Ver todas las ciudades
            </Link>
          </div>
        </section>

        <div className="locationCta">
          <p className="locationCtaText">
            ¿Buscas {page.service.keyword} en {page.city.name}? Hablemos de tu proyecto.
          </p>
          <BookCallActions />
          <p className="locationBack">
            <Link to={`/${page.serviceSlug}`}>← {page.service.hubLabel}</Link>
          </p>
        </div>
      </main>
    </Layout>
  )
}

export default LocationPage
