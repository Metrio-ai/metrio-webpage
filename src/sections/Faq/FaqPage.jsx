import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import BookCallActions from '../../components/BookCallActions'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import { FAQ_TOPICS, faqHubPreview, getTotalFaqCount } from '../../data/faqPages'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './FaqPage.css'

function FaqPage () {
  const totalCount = getTotalFaqCount()

  useEffect(() => {
    document.title = 'Preguntas frecuentes | Metrio Consulting – Consultoría tecnológica España'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Índice de ${totalCount}+ preguntas frecuentes de Metrio Consulting: consultora tecnológica, IA, automatización, Power BI, contacto y casos de éxito. Una página por tema para encontrar respuestas rápido.`
      )
    }
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          '@id': 'https://metrio.es/faq#webpage',
          url: 'https://metrio.es/faq',
          name: 'Preguntas frecuentes | Metrio Consulting',
          description: 'Índice de FAQ por temas: consultora tecnológica, IA, automatización, BI, servicios, contacto y clientes.',
          isPartOf: { '@id': 'https://metrio.es/#website' },
          hasPart: FAQ_TOPICS.map((t) => ({
            '@type': 'WebPage',
            name: t.label,
            url: `https://metrio.es/faq/${t.slug}`,
            description: t.description
          }))
        },
        buildFaqSchema(faqHubPreview)
      ]
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(graph)
    script.id = 'faq-hub-schema'
    document.head.appendChild(script)
    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      document.getElementById('faq-hub-schema')?.remove()
    }
  }, [totalCount])

  return (
    <Layout className="faqPage">
      <main className="faqMain">
        <header className="faqHero">
          <div className="faqHeroInner">
            <p className="faqHeroLabel">Preguntas frecuentes</p>
            <h1 id="faq-hero-title" className="faqHeroTitle">
              FAQ por temas — consultora tecnológica en España
            </h1>
            <p className="faqHeroLead">
              Más de {totalCount} respuestas repartidas en {FAQ_TOPICS.length} páginas temáticas.
              Elige un tema para posicionarte mejor y encontrar la respuesta que buscas.
            </p>
            <div className="faqHeroStats">
              <span><strong>{FAQ_TOPICS.length}</strong> páginas FAQ</span>
              <span><strong>{totalCount}+</strong> respuestas</span>
              <span><strong>SEO/AEO</strong> por tema</span>
            </div>
          </div>
        </header>

        <section className="faqTopicGrid" aria-labelledby="faq-topics-title">
          <h2 id="faq-topics-title" className="faqTopicGridTitle">
            Elige un tema
          </h2>
          <div className="faqTopicGridInner">
            {FAQ_TOPICS.map((topic) => (
              <Link key={topic.slug} to={`/faq/${topic.slug}`} className="faqTopicCard">
                <span className="material-icons faqTopicCardIcon" aria-hidden="true">
                  {topic.icon}
                </span>
                <h3 className="faqTopicCardTitle">{topic.label}</h3>
                <p className="faqTopicCardDesc">{topic.lead}</p>
                <span className="faqTopicCardMeta">
                  {topic.items.length} preguntas
                  <span className="material-icons" aria-hidden="true">arrow_forward</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="faqHubAlso" aria-labelledby="faq-also-title">
          <h2 id="faq-also-title" className="faqHubAlsoTitle">
            FAQ también en cada sección
          </h2>
          <ul className="faqHubAlsoList">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/services">Servicios</Link></li>
            <li><Link to="/sobre-nosotros">Sobre nosotros</Link></li>
            <li><Link to="/clientes">Clientes</Link></li>
            <li><Link to="/contact">Contacto</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </section>

        <ExpandableFaqSection
          title="Preguntas más buscadas"
          titleId="faq-hub-preview-title"
          items={faqHubPreview}
          initialCount={8}
          variant="premium"
          className="faqPageSection faqPageSection--hub"
        />

        <div className="faqCta">
          <p className="faqCtaText">¿No encuentras lo que buscas?</p>
          <BookCallActions />
        </div>
      </main>
    </Layout>
  )
}

export default FaqPage
