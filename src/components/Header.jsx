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
          <li className="menu-item">
            {isHomePage ? (
              <ScrollLink to="top" smooth duration={500} onClick={toggleBurgerMenu}>
                Inicio
              </ScrollLink>
            ) : (
              <Link to="/" onClick={toggleBurgerMenu}>Inicio</Link>
            )}
          </li>
          <li className="menu-item">
            {isHomePage ? (
              <ScrollLink to="about" smooth duration={500} onClick={toggleBurgerMenu}>
                Sobre nosotros
              </ScrollLink>
            ) : (
              <Link to="/" onClick={toggleBurgerMenu}>Sobre nosotros</Link>
            )}
          </li>
          <li className="menu-item">
            {isHomePage ? (
              <ScrollLink to="como-funciona" smooth duration={500} onClick={toggleBurgerMenu}>
                Cómo trabajamos
              </ScrollLink>
            ) : (
              <Link to="/" onClick={toggleBurgerMenu}>Cómo trabajamos</Link>
            )}
          </li>
          <li className="menu-item">
            <Link to="/services" onClick={toggleBurgerMenu}>Servicios</Link>
          </li>
          <li className="menu-item">
            <Link to="/blog" onClick={toggleBurgerMenu}>Blog</Link>
          </li>
          <li className="menu-item">
            <Link to="/faq" onClick={toggleBurgerMenu}>FAQ</Link>
          </li>
          <li className="menu-item">
            <Link to="/contact" onClick={toggleBurgerMenu}>Contacto</Link>
          </li>
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
