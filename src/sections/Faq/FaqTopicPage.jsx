import { useEffect } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import Layout from '../../components/Layout'
import BookCallActions from '../../components/BookCallActions'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import { getFaqTopic, FAQ_TOPICS } from '../../data/faqPages'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './FaqPage.css'

function FaqTopicPage () {
  const { slug } = useParams()
  const topic = getFaqTopic(slug)

  useEffect(() => {
    if (!topic) return undefined

    document.title = topic.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', topic.description)

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://metrio.es/' },
            { '@type': 'ListItem', position: 2, name: 'FAQ', item: 'https://metrio.es/faq' },
            { '@type': 'ListItem', position: 3, name: topic.label, item: `https://metrio.es/faq/${topic.slug}` }
          ]
        },
        buildFaqSchema(topic.items, `https://metrio.es/faq/${topic.slug}#faq`)
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(graph)
    script.id = 'faq-topic-schema'
    document.head.appendChild(script)

    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      document.getElementById('faq-topic-schema')?.remove()
    }
  }, [topic])

  if (!topic) return <Navigate to="/faq" replace />

  const related = FAQ_TOPICS.filter((t) => topic.relatedSlugs.includes(t.slug))

  return (
    <Layout className="faqPage">
      <main className="faqMain">
        <nav className="faqBreadcrumb" aria-label="Miga de pan">
          <Link to="/">Inicio</Link>
          <span aria-hidden="true">/</span>
          <Link to="/faq">FAQ</Link>
          <span aria-hidden="true">/</span>
          <span>{topic.label}</span>
        </nav>

        <header className="faqHero faqHero--topic">
          <div className="faqHeroInner">
            <p className="faqHeroLabel">
              <span className="material-icons" aria-hidden="true">{topic.icon}</span>
              {topic.label}
            </p>
            <h1 id="faq-topic-title" className="faqHeroTitle">
              {topic.h1}
            </h1>
            <p className="faqHeroLead">{topic.lead}</p>
            <p className="faqHeroCount">{topic.items.length} respuestas en esta página</p>
          </div>
        </header>

        <ExpandableFaqSection
          items={topic.items}
          initialCount={10}
          numbered
          variant="premium"
          labelledBy="faq-topic-title"
          className="faqPageSection"
          showSearch
        />

        {related.length > 0 && (
          <section className="faqRelated" aria-labelledby="faq-related-title">
            <h2 id="faq-related-title" className="faqRelatedTitle">Otros temas FAQ</h2>
            <div className="faqRelatedGrid">
              {related.map((t) => (
                <Link key={t.slug} to={`/faq/${t.slug}`} className="faqRelatedCard">
                  <span className="material-icons" aria-hidden="true">{t.icon}</span>
                  <span className="faqRelatedCardLabel">{t.label}</span>
                  <span className="faqRelatedCardCount">{t.items.length} preguntas</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="faqCta">
          <p className="faqCtaText">¿Quieres hablar de tu proyecto?</p>
          <BookCallActions />
          <p className="faqHubBack">
            <Link to="/faq">← Volver al índice de FAQ</Link>
          </p>
        </div>
      </main>
    </Layout>
  )
}

export default FaqTopicPage
