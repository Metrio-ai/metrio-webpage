import { Link } from 'react-router-dom'

const footerLinks = [
  { to: '/', label: 'Inicio' },
  { to: '/services', label: 'Servicios' },
  { to: '/blog', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contacto' }
]

function Footer () {
  const currentYear = new Date().getFullYear()
  const copyrightYears = currentYear === 2024 ? '2024' : `2024–${currentYear}`

  return (
    <footer className="footerContainer" role="contentinfo">
      <Link to="/" className="footerLogoLink" aria-label="Metrio Consulting - Ir a inicio">
        <img
          className="footerLogo"
          src={`${import.meta.env.BASE_URL}metrioLogo.svg`}
          alt="Metrio Consulting"
          width="100"
          height="34"
        />
      </Link>
      <nav className="footerNav" aria-label="Enlaces del sitio">
        <ul className="footerNavList">
          {footerLinks.map(({ to, label }) => (
            <li key={to}>
              <Link to={to} className="footerNavLink">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="footerContent">
        <span className="footer-item">
          <a
            href="https://github.com/Metrio-ai"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Metrio en GitHub"
          >
            <i className="fab fa-github" aria-hidden="true" />
          </a>
        </span>
        <span className="footer-item">
          <a
            href="https://www.linkedin.com/company/metrio-consulting/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Metrio Consulting en LinkedIn"
          >
            <i className="fab fa-linkedin-in" aria-hidden="true" />
          </a>
        </span>
        <span className="footer-item">
          <Link to="/faq" aria-label="Preguntas frecuentes">
            <span className="material-icons" aria-hidden="true">help_outline</span>
          </Link>
        </span>
        <span className="footer-item">
          <Link to="/contact" aria-label="Ir a contacto">
            <span className="material-icons" aria-hidden="true">mail</span>
          </Link>
        </span>
      </div>
      <div className="footerCopyright">
        <p className="footerBrand">Metrio Consulting</p>
        <p className="footerLegal">
          Consultoría tecnológica, BI y desarrollo de producto · Desde 2024 · &copy; {copyrightYears}
        </p>
      </div>
    </footer>
  )
}

export default Footer
