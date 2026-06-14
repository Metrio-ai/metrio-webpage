import { useEffect } from 'react'
import Layout from '../../components/Layout'
import BookCallActions from '../../components/BookCallActions'
import ExpandableFaqSection from '../../components/ExpandableFaqSection'
import { faqItems, getFaqSchema, FAQ_CATEGORIES, getFaqCategory } from '../../data/faq'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './FaqPage.css'

function FaqPage () {
  useEffect(() => {
    document.title = 'Preguntas frecuentes | Metrio Consulting – Consultoría tecnológica y BI'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Más de 40 respuestas sobre Metrio Consulting: servicios de consultoría tecnológica, Business Intelligence, Power BI, IA, automatización, transformación digital y desarrollo de producto en España.'
      )
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(getFaqSchema())
    script.id = 'faq-page-schema'
    document.head.appendChild(script)
    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      const schema = document.getElementById('faq-page-schema')
      if (schema) schema.remove()
    }
  }, [])

  return (
    <Layout className="faqPage">
      <main className="faqMain">
        <header className="faqHero">
          <div className="faqHeroInner">
            <p className="faqHeroLabel">Preguntas frecuentes</p>
            <h1 id="faq-hero-title" className="faqHeroTitle">
              Todo lo que necesitas saber sobre Metrio
            </h1>
            <p className="faqHeroLead">
              {faqItems.length} respuestas sobre consultoría, IA, automatización, BI y transformación digital.
              Elige una pregunta a la izquierda y lee la respuesta a la derecha.
            </p>
            <div className="faqHeroStats">
              <span><strong>{faqItems.length}</strong> preguntas</span>
              <span><strong>5</strong> categorías</span>
              <span><strong>48 h</strong> respuesta</span>
            </div>
          </div>
        </header>

        <ExpandableFaqSection
          items={faqItems}
          initialCount={12}
          numbered
          variant="premium"
          labelledBy="faq-hero-title"
          className="faqPageSection"
          categories={FAQ_CATEGORIES}
          getCategory={getFaqCategory}
          showSearch
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
