import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { CONTACT_BOOK, METRIO_EMAIL } from '../constants/contact'
import { MAIN_NAV } from '../data/navigation'
import { HeaderNavLink } from './HeaderNavDropdown'
import './HeaderNavDropdown.css'
import './Header.css'

const NAV_ID = 'primary-navigation'
const DESKTOP_NAV_MQ = '(min-width: 1180px)'

function Header () {
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isDesktopNav, setIsDesktopNav] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(DESKTOP_NAV_MQ).matches
  )
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
    const mq = window.matchMedia(DESKTOP_NAV_MQ)
    const onChange = () => {
      setIsDesktopNav(mq.matches)
      if (mq.matches) setIsBurgerOpen(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    setIsBurgerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = isBurgerOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isBurgerOpen])

  useEffect(() => {
    if (!isBurgerOpen) return undefined
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsBurgerOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isBurgerOpen])

  const closeMenu = () => setIsBurgerOpen(false)
  const themeLabel = theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'
  const hideMobileNav = !isDesktopNav && !isBurgerOpen

  return (
    <header className={`siteHeader ${scrolled ? 'siteHeader--scrolled' : ''}`}>
      <a href="#main-content" className="skipLink">
        Saltar al contenido principal
      </a>

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
            aria-label="Metrio Consulting en LinkedIn (abre en nueva pestaña)"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="headerMain">
        <div className="headerMainInner">
          <Link to="/" className="headerLogoLink" onClick={closeMenu}>
            <img
              className="headerLogo"
              src={`${import.meta.env.BASE_URL}metrioLogo.svg`}
              alt="Metrio Consulting — Inicio"
              width="132"
              height="44"
              fetchPriority="high"
              decoding="async"
            />
          </Link>

          <nav
            id={NAV_ID}
            className={`headerNav ${isBurgerOpen ? 'headerNav--open' : ''}`}
            aria-label="Navegación principal"
            aria-hidden={hideMobileNav || undefined}
            {...(hideMobileNav ? { inert: '' } : {})}
          >
            <ul className="headerNavList">
              {MAIN_NAV.map((item) => (
                <HeaderNavLink
                  key={item.label}
                  item={item}
                  isHomePage={isHomePage}
                  onNavigate={closeMenu}
                />
              ))}
            </ul>

            <div className="headerNavActions">
              <button
                type="button"
                className="headerThemeToggle"
                onClick={toggleTheme}
                aria-label={themeLabel}
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
              aria-label={themeLabel}
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
              aria-controls={NAV_ID}
              aria-label={isBurgerOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
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
          aria-label="Cerrar menú de navegación"
          onClick={closeMenu}
        />
      )}
    </header>
  )
}

export default Header
