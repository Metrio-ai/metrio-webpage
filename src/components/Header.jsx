import { useEffect, useId, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { CONTACT_BOOK, METRIO_EMAIL } from '../constants/contact'
import { MAIN_NAV } from '../data/navigation'
import { HeaderNavLink } from './HeaderNavDropdown'
import './HeaderNavDropdown.css'
import './Header.css'

const DESKTOP_NAV_MQ = '(min-width: 1100px)'

function Header () {
  const navId = useId()
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
      const desktop = mq.matches
      setIsDesktopNav(desktop)
      if (desktop) setIsBurgerOpen(false)
    }
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    setIsBurgerOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!isBurgerOpen) return undefined
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
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
  const toggleMenu = () => setIsBurgerOpen((open) => !open)
  const themeLabel = theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'

  const navLinks = (
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
  )

  const themeButton = (className = 'headerThemeToggle') => (
    <button
      type="button"
      className={className}
      onClick={toggleTheme}
      aria-label={themeLabel}
    >
      <span className="material-icons" aria-hidden="true">
        {theme === 'light' ? 'dark_mode' : 'light_mode'}
      </span>
    </button>
  )

  return (
    <header
      className={[
        'siteHeader',
        scrolled ? 'siteHeader--scrolled' : '',
        isBurgerOpen ? 'siteHeader--menuOpen' : '',
        isDesktopNav ? 'siteHeader--desktop' : 'siteHeader--mobile'
      ].filter(Boolean).join(' ')}
    >
      <a href="#main-content" className="skipLink">
        Saltar al contenido principal
      </a>

      <div className="headerTopbar">
        <div className="headerTopbarInner">
          <a href={`mailto:${METRIO_EMAIL}`} className="headerTopbarLink">
            <span className="material-icons" aria-hidden="true">mail</span>
            <span className="headerTopbarEmail">{METRIO_EMAIL}</span>
          </a>
          <span className="headerTopbarSep" aria-hidden="true">·</span>
          <span className="headerTopbarText">
            <span className="material-icons" aria-hidden="true">location_on</span>
            Valencia · Remoto
          </span>
          <span className="headerTopbarSep headerTopbarSep--wide" aria-hidden="true">·</span>
          <a
            href="https://www.linkedin.com/company/metrio-consulting/"
            className="headerTopbarLink headerTopbarLink--wide"
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

          {isDesktopNav && (
            <nav className="headerNav headerNav--desktop" aria-label="Navegación principal">
              {navLinks}
              <div className="headerNavActions">
                {themeButton()}
                <Link to={CONTACT_BOOK} className="headerCtaBtn" onClick={closeMenu}>
                  Reservar llamada
                </Link>
              </div>
            </nav>
          )}

          {!isDesktopNav && (
            <div className="headerMobileActions">
              {themeButton()}
              <button
                type="button"
                className="headerBurger"
                onClick={toggleMenu}
                aria-expanded={isBurgerOpen}
                aria-controls={navId}
                aria-label={isBurgerOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              >
                <span className="material-icons" aria-hidden="true">
                  {isBurgerOpen ? 'close' : 'menu'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {!isDesktopNav && typeof document !== 'undefined' && createPortal(
        <>
          <div
            className={`headerDrawer${isBurgerOpen ? ' headerDrawer--open' : ''}`}
            id={navId}
            role="dialog"
            aria-modal={isBurgerOpen ? 'true' : undefined}
            aria-label="Menú de navegación"
            aria-hidden={!isBurgerOpen}
            {...(!isBurgerOpen ? { inert: '' } : {})}
          >
            <div className="headerDrawerTop">
              <Link to="/" className="headerLogoLink" onClick={closeMenu}>
                <img
                  className="headerLogo"
                  src={`${import.meta.env.BASE_URL}metrioLogo.svg`}
                  alt="Metrio Consulting — Inicio"
                  width="120"
                  height="40"
                  decoding="async"
                />
              </Link>
              <button
                type="button"
                className="headerBurger"
                onClick={closeMenu}
                aria-label="Cerrar menú de navegación"
              >
                <span className="material-icons" aria-hidden="true">close</span>
              </button>
            </div>

            <nav className="headerNav headerNav--mobile" aria-label="Navegación principal">
              {navLinks}
              <div className="headerNavActions">
                <Link to={CONTACT_BOOK} className="headerCtaBtn" onClick={closeMenu}>
                  Reservar llamada
                </Link>
              </div>
            </nav>
          </div>

          {isBurgerOpen && (
            <button
              type="button"
              className="headerOverlay"
              aria-label="Cerrar menú de navegación"
              onClick={closeMenu}
            />
          )}
        </>,
        document.body
      )}
    </header>
  )
}

export default Header
