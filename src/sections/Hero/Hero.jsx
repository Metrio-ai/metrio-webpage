import './Hero.css'
import { Link as ScrollLink } from 'react-scroll'

function Hero () {
  return (
    <section className="heroContainer" id="hero" aria-labelledby="hero-heading">
      <div className="heroOverlay" aria-hidden="true" />

      <h1 id="hero-heading" className="heroH1">
        Consultoría tecnológica y desarrollo de producto
      </h1>

      <span className="heroTitle conectar" aria-hidden="true">Conectar</span>
      <span className="heroTitle analizar" aria-hidden="true">Analizar</span>
      <span className="heroTitle impulsar" aria-hidden="true">Impulsar</span>

      <ScrollLink
        to="about"
        smooth
        duration={500}
        className="heroTitle buttonShowMore descubrir"
      >
        Descubre cómo
      </ScrollLink>
    </section>
  )
}

export default Hero
