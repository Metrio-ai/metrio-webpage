import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import CalEmbed from '../../components/CalEmbed'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import { contactFaqs } from '../../data/faqs/contact'
import { METRIO_EMAIL, CONTACT_WRITE } from '../../constants/contact'
import { submitContactForm, openMailtoFallback } from '../../utils/submitContact'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './Contact.css'

const ContactPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') === 'escribir' ? 'write' : 'call'

  useEffect(() => {
    document.title = 'Contacto | Metrio Consulting – Agenda una llamada o escríbenos'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Contacta con Metrio Consulting: reserva una llamada de descubrimiento online o escríbenos. Consultoría IA, automatización y BI. Valencia, España. Respuesta en 48h.'
      )
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(buildFaqSchema(contactFaqs))
    script.id = 'contact-faq-schema'
    document.head.appendChild(script)
    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      const schema = document.getElementById('contact-faq-schema')
      if (schema) schema.remove()
    }
  }, [])

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('idle')
  const [formError, setFormError] = useState('')

  const setTab = (tab) => {
    if (tab === 'write') {
      setSearchParams({ tab: 'escribir' }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { companyName, contactName, email, subject, message } = formData
    setFormStatus('sending')
    setFormError('')

    try {
      await submitContactForm({
        name: contactName,
        email,
        company: companyName,
        subject,
        message,
        formType: 'contacto'
      })
      setFormStatus('success')
      setFormData({ companyName: '', contactName: '', email: '', subject: '', message: '' })
    } catch {
      setFormStatus('error')
      setFormError('No pudimos enviar el mensaje automáticamente. Abriendo tu cliente de correo…')
      openMailtoFallback({
        subject,
        body: `Hola, soy ${contactName} (${email}) de ${companyName}.\n\n${message}`
      })
    }
  }

  return (
    <Layout className="contactPage">
      <main>
        <header className="contactPageHero">
          <p className="sectionLabel">Contacto</p>
          <h1 className="contactPageHeroTitle">Hablemos de tu proyecto</h1>
          <p className="contactPageHeroLead">
            Elige tu horario abajo o escríbenos. Respondemos en menos de 48&nbsp;h laborables.
          </p>
        </header>

        <section className="contactMain" aria-label="Opciones de contacto">
          <div className="contactTabs" role="tablist" aria-label="Forma de contacto">
            <button
              type="button"
              role="tab"
              id="contact-tab-call"
              aria-selected={activeTab === 'call'}
              aria-controls="contact-panel-call"
              className={`contactTab ${activeTab === 'call' ? 'contactTab--active' : ''}`}
              onClick={() => setTab('call')}
            >
              <span className="material-icons" aria-hidden="true">event_available</span>
              Reservar llamada
            </button>
            <button
              type="button"
              role="tab"
              id="contact-tab-write"
              aria-selected={activeTab === 'write'}
              aria-controls="contact-panel-write"
              className={`contactTab ${activeTab === 'write' ? 'contactTab--active' : ''}`}
              onClick={() => setTab('write')}
            >
              <span className="material-icons" aria-hidden="true">mail</span>
              Escribirnos
            </button>
          </div>

          {activeTab === 'call' && (
            <div
              id="contact-panel-call"
              role="tabpanel"
              aria-labelledby="contact-tab-call"
              className="contactPanel contactPanel--call"
            >
              <div className="contactBookingBlock">
                <div className="contactCalColumn">
                  <p className="contactCalLabel">
                    <span className="material-icons" aria-hidden="true">calendar_month</span>
                    Elige fecha y hora
                  </p>
                  <CalEmbed
                    className="contactPageCal"
                    hideEventTypeDetails
                    layout="column"
                    minHeight={520}
                    label="Agendar llamada de descubrimiento con Metrio Consulting"
                  />
                </div>
                <aside className="contactBookingIntro">
                  <h2 className="contactBookingTitle">Llamada de descubrimiento · 30 min</h2>
                  <p className="contactBookingText">
                    Cuéntanos tu reto en una videollamada. Te explicamos cómo podemos ayudarte
                    con IA, automatización, datos o transformación digital. Sin compromiso.
                  </p>
                  <ul className="contactBookingList">
                    <li><span className="material-icons" aria-hidden="true">schedule</span> Horarios en tiempo real</li>
                    <li><span className="material-icons" aria-hidden="true">videocam</span> Google Meet o Zoom</li>
                    <li><span className="material-icons" aria-hidden="true">language</span> Remoto — toda España</li>
                    <li><span className="material-icons" aria-hidden="true">verified</span> Respuesta en 48 h si escribes</li>
                  </ul>
                  <div className="contactWhatWeDo">
                    <h3 className="contactWhatWeDoTitle">Qué analizamos contigo</h3>
                    <ul className="contactWhatWeDoList">
                      <li>IA aplicada y automatización de procesos</li>
                      <li>Dashboards, KPIs y Business Intelligence</li>
                      <li>Roadmap tecnológico y priorización</li>
                    </ul>
                  </div>
                  <p className="contactPanelAlt contactPanelAlt--left">
                    ¿Prefieres email?{' '}
                    <Link to={CONTACT_WRITE} className="contactPanelAltLink">
                      Escribirnos
                    </Link>
                  </p>
                </aside>
              </div>
            </div>
          )}

          {activeTab === 'write' && (
            <div
              id="contact-panel-write"
              role="tabpanel"
              aria-labelledby="contact-tab-write"
              className="contactPanel contactPanel--write"
            >
              <div className="contactFormSectionHeader">
                <h2 className="contactFormSectionTitle">Prefieres escribirnos</h2>
                <p className="contactFormSectionLead">
                  Usa el formulario o escribe directamente a{' '}
                  <a href={`mailto:${METRIO_EMAIL}`} className="contactPageEmail">{METRIO_EMAIL}</a>.
                  Trataremos tu consulta de forma confidencial.
                </p>
              </div>
              <form className="contactForm contactForm--page" onSubmit={handleSubmit} noValidate>
                <div className="formGroup">
                  <label htmlFor="companyName">Nombre de la empresa</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Tu empresa"
                    required
                    autoComplete="organization"
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="contactName">Nombre de contacto</label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    placeholder="Tu nombre"
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
                <div className="formGroup">
                  <label htmlFor="subject">Asunto</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Asunto del mensaje"
                    required
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="message">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe brevemente qué proyecto necesitas llevar a cabo."
                    rows={5}
                    required
                  />
                </div>
                {formStatus === 'success' && (
                  <p className="formStatus formStatus--success" role="status">
                    Mensaje enviado. Te responderemos en menos de 48&nbsp;h laborables.
                  </p>
                )}
                {formStatus === 'error' && formError && (
                  <p className="formStatus formStatus--error" role="alert">
                    {formError}
                  </p>
                )}
                <button type="submit" className="formButton" disabled={formStatus === 'sending'}>
                  {formStatus === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                </button>
              </form>
              <p className="contactPanelAlt">
                ¿Prefieres hablar antes?{' '}
                <button type="button" className="contactPanelAltLink contactPanelAltBtn" onClick={() => setTab('call')}>
                  Reserva una llamada de 30 min
                </button>
              </p>
            </div>
          )}
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
