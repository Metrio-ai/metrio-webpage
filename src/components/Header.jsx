import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'

function Header () {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const location = useLocation()

  const toggleBurgerMenu = () => {
    setIsBurgerOpen(!isBurgerOpen)
  }

  const isHomePage = location.pathname === '/'
  const isBlogPage = location.pathname === '/blog'
  const isBlogPost = location.pathname.startsWith('/blog/')
  const isContactPage = location.pathname === '/contact'
  const isServicesPage = location.pathname === '/services'

  return (
    <header className="headerContainer" role="banner">
      <Link to="/" className="headerLogoLink" aria-label="Metrio Consulting - Ir a inicio">
        <img
          className="headerLogo"
          src={`${import.meta.env.BASE_URL}metrioLogo.svg`}
          alt="Metrio Consulting"
          width="120"
          height="40"
        />
      </Link>

      <nav
        className={`headerNav ${isBurgerOpen ? 'active' : ''}`}
        aria-label="Navegación principal"
      >
        <ul style={{ listStyle: 'none', display: 'flex', alignItems: 'center', gap: 'inherit', margin: 0, padding: 0 }}>
          {isHomePage && (
            <>
              <li className="menu-item">
                <ScrollLink to="top" smooth duration={500} onClick={toggleBurgerMenu}>
                  Inicio
                </ScrollLink>
              </li>
              <li className="menu-item">
                <ScrollLink to="about" smooth duration={500} onClick={toggleBurgerMenu}>
                  Sobre nosotros
                </ScrollLink>
              </li>
              <li className="menu-item">
                <Link to="/services" onClick={toggleBurgerMenu}>Servicios</Link>
              </li>
              <li className="menu-item">
                <Link to="/blog" onClick={toggleBurgerMenu}>Blog</Link>
              </li>
              <li className="menu-item">
                <Link to="/contact">Contacto</Link>
              </li>
            </>
          )}
          {isServicesPage && (
            <>
              <li className="menu-item">
                <Link to="/" onClick={toggleBurgerMenu}>Inicio</Link>
              </li>
              <li className="menu-item">
                <Link to="/blog" onClick={toggleBurgerMenu}>Blog</Link>
              </li>
              <li className="menu-item">
                <Link to="/contact">Contacto</Link>
              </li>
            </>
          )}
          {isBlogPage && (
            <>
              <li className="menu-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="menu-item">
                <Link to="/contact">Contacto</Link>
              </li>
            </>
          )}
          {isBlogPost && (
            <>
              <li className="menu-item">
                <Link to="/blog">Volver al blog</Link>
              </li>
              <li className="menu-item">
                <Link to="/">Inicio</Link>
              </li>
              <li className="menu-item">
                <Link to="/contact">Contacto</Link>
              </li>
            </>
          )}
          {isContactPage && (
            <>
              <li className="menu-item">
                <Link to="/" onClick={toggleBurgerMenu}>Inicio</Link>
              </li>
              <li className="menu-item">
                <Link to="/services" onClick={toggleBurgerMenu}>Servicios</Link>
              </li>
              <li className="menu-item">
                <Link to="/blog" onClick={toggleBurgerMenu}>Blog</Link>
              </li>
            </>
          )}
        </ul>
      </nav>

      <button
        type="button"
        className="headerNav--burger"
        onClick={toggleBurgerMenu}
        aria-expanded={isBurgerOpen}
        aria-label={isBurgerOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span className="material-icons" aria-hidden="true">
          {isBurgerOpen ? 'close' : 'menu'}
        </span>
      </button>
    </header>
  )
}

export default Header
