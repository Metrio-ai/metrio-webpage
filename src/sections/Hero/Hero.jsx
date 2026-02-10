import { useState, useEffect } from 'react'
import './Hero.css'
import { Link } from 'react-router-dom'

function Hero () {
  const [showMain, setShowMain] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShowMain(true)
      return
    }
    const timer = setTimeout(() => setShowMain(true), 3500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="heroContainer" id="hero" aria-labelledby="hero-heading">
      <div className="heroOverlay" aria-hidden="true" />

      {!showMain ? (
        <div className="heroPhaseKeywords" aria-hidden="true">
          <span className="heroKeyword conectar">Conectar</span>
          <span className="heroKeyword analizar">Analizar</span>
          <span className="heroKeyword impulsar">Impulsar</span>
        </div>
      ) : (
        <div className="heroPhaseMain">
          <h1 id="hero-heading" className="heroH1">
            Transforma tus datos en <strong className="heroH1Highlight">decisiones con impacto</strong>
          </h1>
          <p className="heroSubtext">
            Dashboards en Power BI, reportes automatizados y bases de datos accionables. Más de 150 proyectos entregados y más del 90% de clientes que repiten.
          </p>
          <ul className="heroFeatures" aria-label="Ventajas">
            <li><span className="heroCheck" aria-hidden="true">✓</span> Proyectos a medida</li>
            <li><span className="heroCheck" aria-hidden="true">✓</span> Resultados medibles</li>
            <li><span className="heroCheck" aria-hidden="true">✓</span> Respuesta en 48h</li>
          </ul>
          <div className="heroCtas">
            <Link to="/contact" className="heroCtaPrimary">
              Cuéntanos tu proyecto
              <span className="material-icons" aria-hidden="true">arrow_forward</span>
            </Link>
            <a href="#services" className="heroCtaSecondary">
              Ver servicios
            </a>
          </div>
        </div>
      )}
    </section>
  )
}

export default Hero
