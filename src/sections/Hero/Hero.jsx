import './Hero.css'
import { Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

function Hero () {
  return (
    <section className="heroContainer" id="hero" aria-labelledby="hero-heading">
      <div className="heroOverlay" aria-hidden="true" />

      <p className="heroLabel">Consultoría tecnológica en España – BI, datos y desarrollo de producto</p>

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
        <ScrollLink to="services" smooth duration={500} className="heroCtaSecondary">
          Ver servicios
        </ScrollLink>
      </div>
    </section>
  )
}

export default Hero
