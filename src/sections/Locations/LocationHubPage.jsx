import { useEffect } from 'react'
import { Link, useLocation, Navigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import BookCallActions from '../../components/BookCallActions'
import { getLocationHub } from '../../data/locationPages'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './Locations.css'

function LocationHubPage () {
  const serviceSlug = useLocation().pathname.split('/').filter(Boolean)[0]
  const hub = getLocationHub(serviceSlug)

  useEffect(() => {
    if (!hub) return undefined

    document.title = hub.hubTitle
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', hub.hubDescription)

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://metrio.es/' },
            { '@type': 'ListItem', position: 2, name: hub.hubLabel, item: `https://metrio.es/${hub.slug}` }
          ]
        },
        {
          '@type': 'WebPage',
          '@id': `https://metrio.es/${hub.slug}#webpage`,
          url: `https://metrio.es/${hub.slug}`,
          name: hub.hubTitle,
          description: hub.hubDescription,
          inLanguage: 'es-ES'
        }
      ]
    })
    script.id = 'location-hub-schema'
    document.head.appendChild(script)

    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      document.getElementById('location-hub-schema')?.remove()
    }
  }, [hub])

  if (!hub) return <Navigate to="/" replace />

  return (
    <Layout className="locationPage">
      <main className="locationMain">
        <nav className="locationBreadcrumb" aria-label="Miga de pan">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <span>{hub.hubLabel}</span>
        </nav>

        <header className="locationHero">
          <div className="locationHeroInner">
            <p className="locationLabel">
              <span className="material-icons" aria-hidden="true">{hub.icon}</span>
              Metrio Consulting · España
            </p>
            <h1 className="locationTitle">{hub.hubH1}</h1>
            <p className="locationLead">{hub.hubDescription}</p>
            <BookCallActions align="start" variant="hero" />
          </div>
        </header>

        <section className="locationCityGrid" aria-labelledby="location-cities-title">
          <h2 id="location-cities-title" className="locationSectionTitle">
            {hub.keyword.charAt(0).toUpperCase() + hub.keyword.slice(1)} por ciudad
          </h2>
          <div className="locationCityGridInner">
            {hub.cities.map((city) => (
              <Link
                key={city.slug}
                to={`/${hub.slug}/${city.slug}`}
                className="locationCityCard"
              >
                <span className="locationCityCardName">{city.name}</span>
                <span className="locationCityCardRegion">{city.region}</span>
                {city.hq && <span className="locationCityCardBadge">Sede Metrio</span>}
                <span className="material-icons locationCityCardArrow" aria-hidden="true">arrow_forward</span>
              </Link>
            ))}
          </div>
        </section>

        {hub.otherHubs.length > 0 && (
          <section className="locationOtherHubs" aria-labelledby="location-other-title">
            <h2 id="location-other-title" className="locationSectionTitle">También te puede interesar</h2>
            <div className="locationOtherHubsGrid">
              {hub.otherHubs.map((other) => (
                <Link key={other.slug} to={`/${other.slug}`} className="locationOtherHubCard">
                  <span className="material-icons" aria-hidden="true">{other.icon}</span>
                  <span>{other.hubLabel}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="locationCta">
          <p className="locationCtaText">¿Tu empresa no está en la lista? Trabajamos en toda España e internacional.</p>
          <BookCallActions />
        </div>
      </main>
    </Layout>
  )
}

export default LocationHubPage
