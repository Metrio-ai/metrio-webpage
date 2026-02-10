import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const BASE_URL = 'https://metrio.es'

/**
 * Layout común para todas las páginas: Header + contenido + Footer.
 * Actualiza canonical en cada ruta para SEO.
 */
function Layout ({ children, className }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const canonical = pathname === '/' ? BASE_URL + '/' : BASE_URL + pathname
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    }
    link.setAttribute('href', canonical)
  }, [pathname])

  const wrapperClass = className ? `appContainer ${className}` : 'appContainer'
  return (
    <div className={wrapperClass} id="top">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default Layout
