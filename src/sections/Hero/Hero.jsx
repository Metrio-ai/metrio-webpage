import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Hero.css'

const BASE = import.meta.env.BASE_URL
const HERO_IMAGE_DESKTOP = `${BASE}hero/consultoria.webp`
const HERO_IMAGE_MOBILE = `${BASE}hero/consultoria-mobile.webp`

const EXPERTISE = [
  {
    title: 'Inteligencia artificial',
    desc: 'Agentes, copilots e integración en tus sistemas'
  },
  {
    title: 'Automatización',
    desc: 'Workflows, ETL y reportes sin trabajo manual'
  },
  {
    title: 'Business Intelligence',
    desc: 'Power BI, dashboards y fuente única de verdad'
  }
]

const INTRO_HOLD_MS = 5600

function Hero () {
  const [showIntro, setShowIntro] = useState(false)
  const [introFading, setIntroFading] = useState(false)

  useEffect(() => {
    document.getElementById('hero-static')?.remove()
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (prefersReduced || isMobile) return undefined
    setShowIntro(true)
    const fadeTimer = setTimeout(() => setIntroFading(true), INTRO_HOLD_MS - 600)
    const hideTimer = setTimeout(() => setShowIntro(false), INTRO_HOLD_MS)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <section className="heroContainer" id="hero" aria-labelledby="hero-heading">
      <picture className="heroBgPicture">
        <source media="(max-width: 768px)" srcSet={HERO_IMAGE_MOBILE} type="image/webp" />
        <img
          className="heroBgImg"
          src={HERO_IMAGE_DESKTOP}
          alt=""
          width={960}
          height={640}
          fetchPriority="high"
          decoding="async"
          aria-hidden="true"
        />
      </picture>
      <div className="heroOverlay" aria-hidden="true" />

      <div className="heroInner">
        {showIntro && (
          <div
            className={`heroPhaseKeywords heroPhaseKeywords--overlay ${introFading ? 'heroPhaseKeywords--fadeOut' : ''}`}
            aria-hidden="true"
          >
            <span className="heroKeyword conectar">Conectar</span>
            <span className="heroKeyword digitalizar">Digitalizar</span>
            <span className="heroKeyword impulsar">Impulsar</span>
          </div>
        )}

        <div className={`heroMainContent ${showIntro ? 'heroMainContent--dimmed' : ''}`}>
            <div className="heroContent">
              <p className="heroEyebrow">Metrio Consulting · Valencia, España</p>
              <h1 id="hero-heading" className="heroDisplay">
                Transforma tus datos en <strong>decisiones con impacto</strong>
              </h1>
              <p className="heroSubtext">
                Consultora tecnológica en España: proyectos de consultoría en dashboards,
                IA, automatización y transformación digital. Respuesta en 48&nbsp;h.
              </p>
              <ul className="heroFeatures" aria-label="Ventajas">
                <li><span className="heroCheck" aria-hidden="true">✓</span> Proyectos a medida</li>
                <li><span className="heroCheck" aria-hidden="true">✓</span> Resultados medibles</li>
                <li><span className="heroCheck" aria-hidden="true">✓</span> Ejecución en producción</li>
              </ul>
              <div className="heroCtas">
                <Link to="/contact" className="heroCtaPrimary">
                  Reservar llamada
                  <span aria-hidden="true">→</span>
                </Link>
                <Link to="/services" className="heroCtaSecondary">
                  Ver servicios
                </Link>
              </div>

              {/* AEO: visible para crawlers, oculto visualmente para no saturar el hero */}
              <dl className="heroAeo sr-only">
                <div className="heroAeoItem">
                  <dt>¿Metrio es una consultora tecnológica?</dt>
                  <dd>
                    Sí. Consultora tecnológica en Valencia con proyectos de consultoría en IA,
                    automatización, BI y transformación digital en toda España.
                  </dd>
                </div>
                <div className="heroAeoItem">
                  <dt>¿Qué es Metrio Consulting?</dt>
                  <dd>
                    Consultora tecnológica en Valencia, España. Implementamos IA, automatización,
                    Business Intelligence y transformación digital con entregables en producción.
                  </dd>
                </div>
                <div className="heroAeoItem">
                  <dt>¿A quién va dirigido?</dt>
                  <dd>
                    Empresas y equipos en España que necesitan asesoría tecnológica con ejecución:
                    pymes, scale-ups y departamentos de datos, operaciones o dirección.
                  </dd>
                </div>
              </dl>
            </div>

            <aside className="heroExpertise" aria-label="Áreas de especialización">
              <p className="heroExpertiseTitle">Especialización</p>
              {EXPERTISE.map((item) => (
                <div key={item.title} className="heroExpertiseItem">
                  <span className="heroExpertiseName">{item.title}</span>
                  <span className="heroExpertiseDesc">{item.desc}</span>
                </div>
              ))}
              <Link to="/services" className="heroExpertiseLink">
                Todos los servicios
                <span className="material-icons" aria-hidden="true">arrow_forward</span>
              </Link>
            </aside>
        </div>
      </div>
    </section>
  )
}

export default Hero
