/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import '../styles/fadeIn.css'

const FadeInSection = ({ children, id }) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById(id)
      const rect = section.getBoundingClientRect()

      // Si la sección está visible
      if (rect.top >= 0 && rect.top <= window.innerHeight && !hasBeenVisible) {
        setHasBeenVisible(true) // Marcarla como visible
      }
    }

    // Escuchar el evento de scroll
    window.addEventListener('scroll', handleScroll)

    // Ejecutar la función al montar el componente
    handleScroll()

    // Limpiar el evento al desmontar el componente
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [id, hasBeenVisible])

  return (
    <section id={id} className={`fade-in ${hasBeenVisible ? 'visible' : ''}`}>
      {children}
    </section>
  )
}

export default FadeInSection
