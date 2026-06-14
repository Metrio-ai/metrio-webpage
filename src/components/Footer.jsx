import { Link } from 'react-router-dom'
import { METRIO_EMAIL, CONTACT_BOOK, CAREERS_PATH } from '../constants/contact'
import './Footer.css'

const FOOTER_COLUMNS = [
  {
    title: 'Empresa',
    links: [
      { to: '/sobre-nosotros', label: 'Sobre nosotros' },
      { to: '/clientes', label: 'Clientes' },
      { to: CAREERS_PATH, label: 'Trabaja con nosotros' },
      { to: '/contact', label: 'Contacto' }
    ]
  },
  {
    title: 'Servicios',
    links: [
      { to: '/services#implementacion-ia', label: 'Implementación de IA' },
      { to: '/services#automatizacion', label: 'Automatización' },
      { to: '/services#business-intelligence', label: 'Business Intelligence' },
      { to: '/services#producto-digital', label: 'Producto digital' }
    ]
  },
  {
    title: 'Recursos',
    links: [
      { to: '/blog', label: 'Blog' },
      { to: '/blog?filter=casos-exito', label: 'Casos de éxito' },
      { to: '/faq', label: 'Preguntas frecuentes' },
      { to: CONTACT_BOOK, label: 'Reservar llamada' }
    ]
  }
]

function Footer () {
  const currentYear = new Date().getFullYear()
  const copyrightYears = currentYear === 2024 ? '2024' : `2024–${currentYear}`

  return (
    <footer className="siteFooter" role="contentinfo">
      <div className="footerMain">
        <div className="footerMainInner">
          <div className="footerBrandCol">
            <Link to="/" className="footerLogoLink" aria-label="Metrio Consulting - Inicio">
              <img
                className="footerLogo"
                src={`${import.meta.env.BASE_URL}metrioLogo.svg`}
                alt="Metrio Consulting"
                width="120"
                height="40"
              />
            </Link>
            <p className="footerTagline">
              Consultoría tecnológica que ejecuta: IA, automatización, datos y transformación digital desde Valencia.
            </p>
            <a href={`mailto:${METRIO_EMAIL}`} className="footerEmail">
              <span className="material-icons" aria-hidden="true">mail</span>
              {METRIO_EMAIL}
            </a>
            <div className="footerSocial">
              <a
                href="https://www.linkedin.com/company/metrio-consulting/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span className="material-icons" aria-hidden="true">work</span>
              </a>
              <a
                href="https://github.com/Metrio-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <span className="material-icons" aria-hidden="true">code</span>
              </a>
            </div>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} className="footerCol" aria-label={col.title}>
              <h2 className="footerColTitle">{col.title}</h2>
              <ul className="footerColList">
                {col.links.map(({ to, label }) => (
                  <li key={to}>
                    <Link to={to} className="footerColLink">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footerCtaCol">
            <h2 className="footerColTitle">¿Hablamos?</h2>
            <p className="footerCtaText">
              Primera llamada de descubrimiento sin compromiso. Respuesta en 48 h.
            </p>
            <Link to={CONTACT_BOOK} className="footerCtaBtn">
              Reservar llamada
              <span className="material-icons" aria-hidden="true">event_available</span>
            </Link>
            <Link to={CAREERS_PATH} className="footerCareersLink">
              Ver posiciones abiertas
              <span className="material-icons" aria-hidden="true">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="footerBottom">
        <div className="footerBottomInner">
          <p className="footerLegal">
            &copy; {copyrightYears} Metrio Consulting · Valencia, España · Consultoría IA, automatización y BI
          </p>
          <div className="footerBottomLinks">
            <Link to="/faq">FAQ</Link>
            <Link to="/contact">Contacto</Link>
            <a href={`mailto:${METRIO_EMAIL}`}>Email</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
