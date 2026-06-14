import { useEffect } from 'react'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import { homeFaqs } from '../../data/faqs/home'
import './HomeFaq.css'

function HomeFaq () {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(buildFaqSchema(homeFaqs))
    script.id = 'home-faq-schema'
    document.head.appendChild(script)
    return () => {
      const schema = document.getElementById('home-faq-schema')
      if (schema) schema.remove()
    }
  }, [])

  return (
    <ExpandableFaqSection
      title="Preguntas frecuentes sobre Metrio Consulting"
      titleId="home-faq-title"
      items={homeFaqs}
      initialCount={8}
      className="expandableFaq--subtle homeFaq"
    />
  )
}

export default HomeFaq
