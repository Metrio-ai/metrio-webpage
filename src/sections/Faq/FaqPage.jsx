import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import { faqItems, getFaqSchema } from '../../data/faq'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './FaqPage.css'

function FaqPage () {
  useEffect(() => {
    document.title = 'Preguntas frecuentes | Metrio Consulting – Consultoría tecnológica y BI'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        'Respuestas a las preguntas más habituales sobre Metrio Consulting: servicios de consultoría tecnológica, Business Intelligence, Power BI, transformación digital y desarrollo de producto en España.'
      )
    }
    // FAQPage schema para Google y asistentes de IA (rich results)
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
          <p className="faqHeroLabel">Preguntas frecuentes</p>
          <h1 className="faqHeroTitle">
            Todo lo que necesitas saber sobre Metrio
          </h1>
          <p className="faqHeroLead">
            Respuestas claras sobre nuestros servicios de consultoría tecnológica, Business Intelligence, transformación digital y desarrollo de producto.
          </p>
        </header>

        <section
          className="faqSection"
          aria-label="Preguntas frecuentes"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          <div className="faqList">
            {faqItems.map((item, index) => (
              <article
                key={item.id}
                className="faqItem"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h2 className="faqQuestion" id={item.id} itemProp="name">
                  <span className="faqQuestionNumber" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {item.question}
                </h2>
                <div
                  className="faqAnswer"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{item.answer}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="faqCta">
          <p className="faqCtaText">¿No encuentras lo que buscas?</p>
          <Link to="/contact" className="faqCtaBtn">
            Contactar con Metrio
            <span className="material-icons" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </main>
    </Layout>
  )
}

export default FaqPage
