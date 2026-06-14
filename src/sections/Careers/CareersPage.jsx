import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Layout from '../../components/Layout'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import { METRIO_EMAIL } from '../../constants/contact'
import { submitContactForm, openMailtoFallback } from '../../utils/submitContact'
import { openPositions, getJobPostingSchema } from '../../data/careers'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './CareersPage.css'

const CAREERS_FAQ = [
  {
    id: 'car-remoto',
    question: '¿Las posiciones son remotas?',
    answer: 'La mayoría son remotas en España. Algunas roles en Valencia permiten híbrido o presencial puntual.'
  },
  {
    id: 'car-proceso',
    question: '¿Cómo es el proceso de selección?',
    answer: 'Revisamos tu candidatura en 5–7 días laborables. Si encaja, conversación inicial de 30 min, prueba técnica o caso práctico según el rol, y entrevista final con el equipo.'
  },
  {
    id: 'car-freelance',
    question: '¿Contratáis freelance?',
    answer: 'Sí para consultoría de transformación digital y proyectos acotados. Indícalo en tu mensaje.'
  },
  {
    id: 'car-practicas',
    question: '¿Las prácticas están remuneradas?',
    answer: 'Sí. Condiciones según convenio y dedicación. Detalle en la conversación con candidatos seleccionados.'
  },
  {
    id: 'car-idiomas',
    question: '¿Qué idiomas necesito?',
    answer: 'Español fluido. Inglés valorado en roles con clientes internacionales.'
  },
  {
    id: 'car-cv',
    question: '¿Puedo enviar CV por LinkedIn?',
    answer: 'Preferimos el formulario o email a hola@metrio.es con asunto "Candidatura — [puesto]" para centralizar candidaturas.'
  },
  {
    id: 'car-spontaneous',
    question: '¿Aceptáis candidaturas espontáneas?',
    answer: 'Sí. Elige "Candidatura espontánea" en el formulario y cuéntanos qué aportas al equipo.'
  },
  {
    id: 'car-cultura',
    question: '¿Cómo es trabajar en Metrio?',
    answer: 'Equipo joven, mentalidad emprendedora, proyectos variados y comunicación directa. Ejecutamos en producción, no solo recomendamos.'
  }
]

function CareersPage () {
  const [searchParams] = useSearchParams()
  const preselected = searchParams.get('puesto') || ''
  const [selectedPosition, setSelectedPosition] = useState(preselected)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')

  useEffect(() => {
    if (preselected) setSelectedPosition(preselected)
  }, [preselected])

  useEffect(() => {
    document.title = 'Trabaja con nosotros | Metrio Consulting – Consultora tecnológica Valencia'
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        'Únete a Metrio Consulting: posiciones abiertas en IA, automatización, datos, BI y desarrollo. Remoto e híbrido desde Valencia. Envía tu candidatura a hola@metrio.es.'
      )
    }
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://metrio.es/' },
            { '@type': 'ListItem', position: 2, name: 'Trabaja con nosotros', item: 'https://metrio.es/trabaja-con-nosotros' }
          ]
        },
        ...openPositions.map(getJobPostingSchema),
        buildFaqSchema(CAREERS_FAQ, 'https://metrio.es/trabaja-con-nosotros#faq')
      ]
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(graph)
    script.id = 'careers-jsonld'
    document.head.appendChild(script)
    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      document.getElementById('careers-jsonld')?.remove()
    }
  }, [])

  const positionLabel = selectedPosition
    ? openPositions.find((p) => p.id === selectedPosition)?.title || 'Candidatura espontánea'
    : 'Candidatura espontánea'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setSubmitError('')

    const message = [
      `Candidatura: ${positionLabel}`,
      form.phone ? `Teléfono: ${form.phone}` : null,
      form.linkedin ? `LinkedIn: ${form.linkedin}` : null,
      '',
      form.message
    ].filter(Boolean).join('\n')

    try {
      await submitContactForm({
        name: form.name,
        email: form.email,
        subject: `Candidatura — ${positionLabel}`,
        message,
        formType: 'carreras',
        extra: {
          puesto: positionLabel,
          telefono: form.phone || '',
          linkedin: form.linkedin || ''
        }
      })
      setSubmitted(true)
      setForm({ name: '', email: '', phone: '', linkedin: '', message: '' })
    } catch {
      setSubmitError('No pudimos enviar automáticamente. Abriendo tu cliente de correo…')
      openMailtoFallback({
        subject: `Candidatura — ${positionLabel}`,
        body: [
          `Candidatura: ${positionLabel}`,
          '',
          `Nombre: ${form.name}`,
          `Email: ${form.email}`,
          form.phone ? `Teléfono: ${form.phone}` : null,
          form.linkedin ? `LinkedIn: ${form.linkedin}` : null,
          '',
          'Mensaje:',
          form.message,
          '',
          '— Enviado desde metrio.es/trabaja-con-nosotros'
        ].filter(Boolean).join('\n')
      })
      setSubmitted(true)
    } finally {
      setSending(false)
    }
  }

  return (
    <Layout className="careersPage">
      <main>
        <header className="careersHero">
          <p className="sectionLabel">Trabaja con nosotros</p>
          <h1 className="careersHeroTitle">Construye consultoría que ejecuta</h1>
          <p className="careersHeroLead">
            Buscamos personas con espíritu emprendedor que quieran implementar IA, datos y producto digital
            en proyectos reales. Remoto, híbrido o Valencia — si aportas criterio y ganas de entregar, hablemos.
          </p>
          <div className="careersHeroMeta">
            <span><span className="material-icons" aria-hidden="true">location_on</span> Valencia, España</span>
            <span><span className="material-icons" aria-hidden="true">groups</span> Equipo joven y ágil</span>
            <span><span className="material-icons" aria-hidden="true">mail</span>{METRIO_EMAIL}</span>
          </div>
        </header>

        <section className="careersPositions" aria-labelledby="careers-positions-title">
          <h2 id="careers-positions-title" className="careersSectionTitle">Posiciones abiertas</h2>
          <div className="careersPositionList">
            {openPositions.map((job) => (
              <article key={job.id} id={job.id} className="careersPositionCard">
                <div className="careersPositionHeader">
                  <div>
                    <p className="careersPositionDept">{job.department}</p>
                    <h3 className="careersPositionTitle">{job.title}</h3>
                  </div>
                  <Link
                    to={`/trabaja-con-nosotros?puesto=${job.id}#aplicar`}
                    className="careersPositionApply"
                  >
                    Aplicar
                    <span className="material-icons" aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>
                <div className="careersPositionMeta">
                  <span><span className="material-icons" aria-hidden="true">place</span>{job.location}</span>
                  <span><span className="material-icons" aria-hidden="true">schedule</span>{job.type}</span>
                </div>
                <p className="careersPositionSummary">{job.summary}</p>
                <details className="careersPositionDetails">
                  <summary>Ver detalle del puesto</summary>
                  <div className="careersPositionBody">
                    <h4>Qué harás</h4>
                    <ul>{job.responsibilities.map((r) => <li key={r}>{r}</li>)}</ul>
                    <h4>Qué buscamos</h4>
                    <ul>{job.requirements.map((r) => <li key={r}>{r}</li>)}</ul>
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>

        <section className="careersApply" id="aplicar" aria-labelledby="careers-apply-title">
          <div className="careersApplyInner">
            <h2 id="careers-apply-title" className="careersSectionTitle">Envía tu candidatura</h2>
            <p className="careersApplyLead">
              Completa el formulario y recibirás confirmación al instante. También puedes escribir a{' '}
              <a href={`mailto:${METRIO_EMAIL}`}>{METRIO_EMAIL}</a>.
            </p>
            {submitted ? (
              <p className="careersApplySuccess" role="status">
                Candidatura enviada. Revisamos perfiles en 5–7 días laborables. Si necesitas algo urgente, escríbenos a {METRIO_EMAIL}.
              </p>
            ) : (
              <form className="careersForm" onSubmit={handleSubmit}>
                <div className="careersFormRow">
                  <div className="formGroup">
                    <label htmlFor="careers-position">Puesto</label>
                    <select
                      id="careers-position"
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                    >
                      <option value="">Candidatura espontánea</option>
                      {openPositions.map((p) => (
                        <option key={p.id} value={p.id}>{p.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="formGroup">
                    <label htmlFor="careers-name">Nombre completo</label>
                    <input
                      id="careers-name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      autoComplete="name"
                    />
                  </div>
                </div>
                <div className="careersFormRow">
                  <div className="formGroup">
                    <label htmlFor="careers-email">Email</label>
                    <input
                      id="careers-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      autoComplete="email"
                    />
                  </div>
                  <div className="formGroup">
                    <label htmlFor="careers-phone">Teléfono (opcional)</label>
                    <input
                      id="careers-phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      autoComplete="tel"
                    />
                  </div>
                </div>
                <div className="formGroup">
                  <label htmlFor="careers-linkedin">LinkedIn o portfolio (opcional)</label>
                  <input
                    id="careers-linkedin"
                    type="url"
                    placeholder="https://linkedin.com/in/..."
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                  />
                </div>
                <div className="formGroup">
                  <label htmlFor="careers-message">Cuéntanos por qué encajas</label>
                  <textarea
                    id="careers-message"
                    rows={5}
                    required
                    placeholder="Experiencia, motivación y qué te gustaría construir en Metrio..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                  />
                </div>
                {submitError && (
                  <p className="formStatus formStatus--error" role="alert">{submitError}</p>
                )}
                <button type="submit" className="careersSubmitBtn" disabled={sending}>
                  {sending ? 'Enviando…' : 'Enviar candidatura'}
                  <span className="material-icons" aria-hidden="true">send</span>
                </button>
              </form>
            )}
          </div>
        </section>

        <ExpandableFaqSection
          title="Preguntas sobre trabajar en Metrio"
          titleId="careers-faq-title"
          items={CAREERS_FAQ}
          initialCount={8}
          className="expandableFaq--subtle"
        />
      </main>
    </Layout>
  )
}

export default CareersPage
