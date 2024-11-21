import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import metrioLogo from '../../public/metrioLogo.svg'

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

  return (
    <header className='headerContainer'>
      {/* Logo */}
      <a>
        <Link to='/' smooth={true} duration={500}>
          <img className='headerLogo' src={metrioLogo} alt='metrioLogo' />
        </Link>
      </a>

      {/* Navbar */}
      <nav className={`headerNav ${isBurgerOpen ? 'active' : ''}`}>
        {isHomePage && (
          <>
            <span className='menu-item'>
              <a>
                <ScrollLink
                  to='top'
                  smooth={true}
                  duration={500}
                  onClick={toggleBurgerMenu}
                >
                  Inicio
                </ScrollLink>
              </a>
            </span>
            <span className='menu-item'>
              <a>
                <ScrollLink
                  to='about'
                  smooth={true}
                  duration={500}
                  onClick={toggleBurgerMenu}
                >
                  Sobre Nosotros
                </ScrollLink>
              </a>
            </span>
            <span className='menu-item'>
              <a>
                <ScrollLink
                  to='services'
                  smooth={true}
                  duration={500}
                  onClick={toggleBurgerMenu}
                >
                  Servicios
                </ScrollLink>
              </a>
            </span>
            <span className='menu-item'>
              <a>
                <ScrollLink
                  to='contact'
                  smooth={true}
                  duration={500}
                  onClick={toggleBurgerMenu}
                >
                  Contacto
                </ScrollLink>
              </a>
            </span>
            <span className='menu-item'>
              <a>
                <Link to='/blog'>Blog</Link>
              </a>
            </span>
          </>
        )}
        {isBlogPage && (
          <>
            <span className='menu-item'>
              <a>
                <Link to='/'>Inicio</Link>
              </a>
            </span>
          </>
        )}
        {isBlogPost && (
          <>
            <span className='menu-item'>
              <a>
                <Link to='/blog'>Volver al Blog</Link>
              </a>
            </span>
            <span className='menu-item'>
              <a>
                <Link to='/'>Inicio</Link>
              </a>
            </span>
          </>
        )}
        {isContactPage && (
          <>
          <span className='menu-item'>
            <a>
              <Link to='/'>Inicio</Link>
            </a>
          </span>
          <span className='menu-item'>
            <a>
              <Link to='/blog'>Blog</Link>
            </a>
          </span>
        </>
        )}
      </nav>

      {/* Burger menu for mobile */}
      <div
        className={`nav light headerNav--burger ${
          isBurgerOpen ? 'active' : ''
        }`}
        id='burger'
        onClick={toggleBurgerMenu}
      >
        <span className='material-icons headerNav--burger-icon'>
          {isBurgerOpen ? 'close' : 'menu'}
        </span>
      </div>
    </header>
  )
}

export default Header
