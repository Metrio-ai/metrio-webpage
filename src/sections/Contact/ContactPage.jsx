import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import CalEmbed from '../../components/CalEmbed'
import ExpandableFaqSection, { buildFaqSchemaJsonLd } from '../../components/ExpandableFaqSection'
import { contactFaqs } from '../../data/faqs/contact'
import { METRIO_EMAIL } from '../../constants/contact'
import { submitContactForm } from '../../utils/submitContact'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './Contact.css'

const TOPIC_OPTIONS = [
  'Implementación de IA',
  'Automatización de procesos',
  'Business Intelligence',
  'Transformación digital',
  'Otro'
]

const ContactPage = () => {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    document.title = 'Contacto | Metrio Consulting – Agenda una llamada o escríbenos'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Contacta con Metrio Consulting: reserva una llamada de 30 min gratis o escríbenos. Respuesta en 48 h. IA, automatización y BI desde Valencia, España.'
      )
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(buildFaqSchemaJsonLd(contactFaqs, 'https://metrio.es/contact#faq'))
    script.id = 'contact-faq-schema'
    document.head.appendChild(script)
    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      document.getElementById('contact-faq-schema')?.remove()
    }
  }, [])

  useEffect(() => {
    if (searchParams.get('tab') !== 'escribir') return
    const el = document.getElementById('escribirnos')
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [searchParams])

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    topic: TOPIC_OPTIONS[0],
    customTopic: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('idle')
  const [formError, setFormError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleTopic = (topic) => {
    setFormData((prev) => ({ ...prev, topic }))
  }

  const resolvedSubject =
    formData.topic === 'Otro' && formData.customTopic.trim()
      ? formData.customTopic.trim()
      : formData.topic

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { companyName, contactName, email, message } = formData
    setFormStatus('sending')
    setFormError('')

    try {
      await submitContactForm({
        name: contactName,
        email,
        company: companyName,
        subject: resolvedSubject,
        message,
        formType: 'contacto'
      })
      setFormStatus('success')
      setFormData({
        companyName: '',
        contactName: '',
        email: '',
        topic: TOPIC_OPTIONS[0],
        customTopic: '',
        message: ''
      })
    } catch {
      setFormStatus('error')
      setFormError(
        `No se pudo enviar ahora mismo. Escríbenos directamente a ${METRIO_EMAIL} o reserva una llamada en el calendario.`
      )
    }
  }

  return (
    <Layout className="contactPage">
      <main id="main-content">
        <header className="contactPageHero">
          <p className="sectionLabel">Contacto</p>
          <h1 className="contactPageHeroTitle">Reserva llamada o escríbenos</h1>
          <p className="contactPageHeroLead">
            Elige lo que te venga mejor: videollamada de 30&nbsp;min sin compromiso o mensaje directo.
            Respondemos en menos de 48&nbsp;h laborables.
          </p>
          <div className="contactQuickActions">
            <a href="#reservar-llamada" className="contactQuickBtn contactQuickBtn--primary">
              <span className="material-icons" aria-hidden="true">event_available</span>
              Reservar llamada · 30 min
            </a>
            <a href="#escribirnos" className="contactQuickBtn contactQuickBtn--secondary">
              <span className="material-icons" aria-hidden="true">mail</span>
              Enviar mensaje
            </a>
            <a href={`mailto:${METRIO_EMAIL}`} className="contactQuickBtn contactQuickBtn--ghost">
              <span className="material-icons" aria-hidden="true">alternate_email</span>
              {METRIO_EMAIL}
            </a>
          </div>
        </header>

        <section className="contactSplit" aria-label="Reservar llamada y formulario de contacto">
          <div id="reservar-llamada" className="contactBlock contactBlock--call">
            <div className="contactBlockHeader">
              <h2 className="contactBlockTitle">
                <span className="material-icons" aria-hidden="true">videocam</span>
                Reservar llamada
              </h2>
              <p className="contactBlockLead">
                Gratis · 30 min · Google Meet o Zoom · Sin compromiso
              </p>
            </div>
            <div className="contactBookingBlock contactBookingBlock--compact">
              <div className="contactCalColumn">
                <CalEmbed
                  className="contactPageCal"
                  hideEventTypeDetails
                  layout="column"
                  minHeight={480}
                  label="Agendar llamada de descubrimiento con Metrio Consulting"
                />
              </div>
              <aside className="contactBookingIntro contactBookingIntro--compact">
                <ul className="contactBookingList">
                  <li><span className="material-icons" aria-hidden="true">schedule</span> Horarios en tiempo real</li>
                  <li><span className="material-icons" aria-hidden="true">psychology</span> IA, automatización y BI</li>
                  <li><span className="material-icons" aria-hidden="true">verified</span> Primera conversación sin compromiso</li>
                </ul>
              </aside>
            </div>
          </div>

          <div id="escribirnos" className="contactBlock contactBlock--write">
            <div className="contactBlockHeader">
              <h2 className="contactBlockTitle">
                <span className="material-icons" aria-hidden="true">mail</span>
                Escribirnos
              </h2>
              <p className="contactBlockLead">
                Solo lo esencial. También puedes escribir a{' '}
                <a href={`mailto:${METRIO_EMAIL}`} className="contactPageEmail">{METRIO_EMAIL}</a>.
              </p>
            </div>

            <form className="contactForm contactForm--page" onSubmit={handleSubmit} noValidate>
              <div className="contactFormRow">
                <div className="formGroup">
                  <label htmlFor="contactName">Tu nombre</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Nombre y apellidos"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@empresa.com"
                    required
                    autoComplete="email"
                    inputMode="email"
                  />
                </div>
              </div>

              <div className="formGroup">
                <label htmlFor="companyName">Empresa <span className="formOptional">(opcional)</span></label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Nombre de la empresa"
                  autoComplete="organization"
                />
              </div>

              <fieldset className="formGroup formGroup--topics">
                <legend>¿En qué te podemos ayudar?</legend>
                <div className="contactTopicChips">
                  {TOPIC_OPTIONS.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      className={`contactTopicChip${formData.topic === topic ? ' contactTopicChip--active' : ''}`}
                      aria-pressed={formData.topic === topic}
                      onClick={() => handleTopic(topic)}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </fieldset>

              {formData.topic === 'Otro' && (
                <div className="formGroup">
                  <label htmlFor="customTopic">Cuéntanos el tema</label>
                  <input
                    type="text"
                    id="customTopic"
                    name="customTopic"
                    value={formData.customTopic}
                    onChange={handleChange}
                    placeholder="Ej. integración con ERP"
                  />
                </div>
              )}

              <div className="formGroup">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Cuéntanos brevemente tu reto o proyecto."
                  rows={4}
                  required
                />
              </div>

              {formStatus === 'success' && (
                <div className="formStatus formStatus--success" role="status">
                  <strong>Mensaje enviado.</strong> Te respondemos en menos de 48&nbsp;h laborables.
                  {' '}
                  <a href="#reservar-llamada">¿Prefieres hablar ya? Reserva una llamada</a>.
                </div>
              )}
              {formStatus === 'error' && formError && (
                <div className="formStatus formStatus--error" role="alert">
                  {formError}{' '}
                  <a href={`mailto:${METRIO_EMAIL}`}>Enviar email</a>
                </div>
              )}

              <button type="submit" className="formButton" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
              </button>
            </form>
          </div>
        </section>

        <ExpandableFaqSection
          title="Preguntas frecuentes sobre contacto y primeros pasos"
          titleId="contact-faq-title"
          items={contactFaqs}
          initialCount={8}
          className="expandableFaq--subtle"
        />
      </main>
    </Layout>
  )
}

export default ContactPage
