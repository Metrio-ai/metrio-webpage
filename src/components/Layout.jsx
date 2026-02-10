import Header from './Header'
import Footer from './Footer'

/**
 * Layout común para todas las páginas: Header + contenido + Footer.
 * Garantiza una estructura profesional y consistente en toda la web.
 */
function Layout ({ children, className }) {
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
