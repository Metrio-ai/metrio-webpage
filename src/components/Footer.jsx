import { Link } from 'react-router-dom'

function Footer () {
  const currentYear = new Date().getFullYear()
  const copyrightYears = currentYear === 2024 ? '2024' : `2024–${currentYear}`

  return (
    <footer className="footerContainer" role="contentinfo">
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
          <Link to="/contact" aria-label="Ir a contacto">
            <span className="material-icons" aria-hidden="true">mail</span>
          </Link>
        </span>
      </div>
      <div className="footerCopyright">
        <p className="footerBrand">Metrio Software &amp; Data Consulting</p>
        <p className="footerLegal">
          Desde 2024 · &copy; {copyrightYears} Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
