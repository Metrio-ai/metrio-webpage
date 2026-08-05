import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Al cambiar de ruta, lleva el scroll al inicio (o al ancla / tab pedido).
 * Evita aterrizar a mitad de página al venir de una vista larga.
 */
function ScrollToTop () {
  const { pathname, search, hash } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }

    const params = new URLSearchParams(search)
    const tab = params.get('tab')

    // Contacto → formulario: ancla a #escribirnos
    if (pathname === '/contact' && tab === 'escribir') {
      const scrollToForm = () => {
        const el = document.getElementById('escribirnos')
        if (!el) {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
          return
        }
        const header = document.querySelector('.siteHeader')
        const offset = (header?.getBoundingClientRect().height || 96) + 12
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'smooth' })
      }
      // Esperar a que el layout de ContactPage pinte el bloque
      const t1 = window.setTimeout(scrollToForm, 50)
      const t2 = window.setTimeout(scrollToForm, 320)
      return () => {
        window.clearTimeout(t1)
        window.clearTimeout(t2)
      }
    }

    // Hash explícito (#reservar-llamada, #escribirnos, etc.)
    if (hash) {
      const id = hash.replace(/^#/, '')
      const scrollToHash = () => {
        const el = document.getElementById(id)
        if (!el) return
        const header = document.querySelector('.siteHeader')
        const offset = (header?.getBoundingClientRect().height || 96) + 12
        const top = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: Math.max(0, top), left: 0, behavior: 'smooth' })
      }
      const t1 = window.setTimeout(scrollToHash, 50)
      const t2 = window.setTimeout(scrollToHash, 320)
      return () => {
        window.clearTimeout(t1)
        window.clearTimeout(t2)
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    return undefined
  }, [pathname, search, hash])

  return null
}

export default ScrollToTop
