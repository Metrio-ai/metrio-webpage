import { useEffect, useState } from 'react'
import { useLocation, Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { CONTACT_BOOK, CAREERS_PATH, METRIO_EMAIL } from '../constants/contact'
import './Header.css'

const NAV_LINKS = [
  { to: '/sobre-nosotros', label: 'Nosotros', homeHash: '#about' },
  { to: '/services', label: 'Servicios', homeHash: '#services' },
  { to: '/clientes', label: 'Clientes', homeHash: '#clientes' },
  { to: '/blog', label: 'Blog' }
]

function Header () {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const isHomePage = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsBurgerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isBurgerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isBurgerOpen])

  const closeMenu = () => setIsBurgerOpen(false)

  return (
    <header className={`siteHeader ${scrolled ? 'siteHeader--scrolled' : ''}`} role="banner">
      <div className="headerTopbar">
        <div className="headerTopbarInner">
          <a href={`mailto:${METRIO_EMAIL}`} className="headerTopbarLink">
            <span className="material-icons" aria-hidden="true">mail</span>
            {METRIO_EMAIL}
          </a>
          <span className="headerTopbarSep" aria-hidden="true">·</span>
          <span className="headerTopbarText">
            <span className="material-icons" aria-hidden="true">location_on</span>
            Valencia, España · Remoto e internacional
          </span>
          <span className="headerTopbarSep headerTopbarSep--desktop" aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/company/metrio-consulting/"
            className="headerTopbarLink headerTopbarLink--desktop"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="headerMain">
        <div className="headerMainInner">
          <Link to="/" className="headerLogoLink" aria-label="Metrio Consulting - Inicio" onClick={closeMenu}>
            <img
              className="headerLogo"
              src={`${import.meta.env.BASE_URL}metrioLogo.svg`}
              alt="Metrio Consulting"
              width="132"
              height="44"
              fetchPriority="high"
            />
          </Link>

          <nav
            className={`headerNav ${isBurgerOpen ? 'headerNav--open' : ''}`}
            aria-label="Navegación principal"
          >
            <ul className="headerNavList">
              {NAV_LINKS.map(({ to, label, homeHash }) => (
                <li key={to}>
                  {isHomePage && homeHash ? (
                    <a href={homeHash} className="headerNavLink" onClick={closeMenu}>{label}</a>
                  ) : (
                    <NavLink to={to} className={({ isActive }) => `headerNavLink${isActive ? ' headerNavLink--active' : ''}`} onClick={closeMenu}>
                      {label}
                    </NavLink>
                  )}
                </li>
              ))}
              <li>
                <NavLink
                  to={CAREERS_PATH}
                  className={({ isActive }) => `headerNavLink headerNavLink--careers${isActive ? ' headerNavLink--active' : ''}`}
                  onClick={closeMenu}
                >
                  Trabaja con nosotros
                </NavLink>
              </li>
            </ul>

            <div className="headerNavActions">
              <button
                type="button"
                className="headerThemeToggle"
                onClick={toggleTheme}
                aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
              >
                <span className="material-icons" aria-hidden="true">
                  {theme === 'light' ? 'dark_mode' : 'light_mode'}
                </span>
              </button>
              <Link to={CONTACT_BOOK} className="headerCtaBtn" onClick={closeMenu}>
                Reservar llamada
              </Link>
            </div>
          </nav>

          <div className="headerMobileActions">
            <button
              type="button"
              className="headerThemeToggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
            >
              <span className="material-icons" aria-hidden="true">
                {theme === 'light' ? 'dark_mode' : 'light_mode'}
              </span>
            </button>
            <button
              type="button"
              className="headerBurger"
              onClick={() => setIsBurgerOpen(!isBurgerOpen)}
              aria-expanded={isBurgerOpen}
              aria-label={isBurgerOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <span className="material-icons" aria-hidden="true">
                {isBurgerOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {isBurgerOpen && (
        <button
          type="button"
          className="headerOverlay"
          aria-label="Cerrar menú"
          onClick={closeMenu}
        />
      )}
    </header>
  )
}

export default Header
