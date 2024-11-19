import './Hero.css'
import { Link as ScrollLink } from 'react-scroll'


function Hero() {
  
  return (
    <section className="heroContainer" id="hero">
      <div className="heroOverlay"></div>
      <h1 className="heroTitle conectar">Conectar</h1>
      <h1 className="heroTitle analizar">Analizar</h1>
      <h1 className="heroTitle impulsar">Impulsar</h1>
      <a className="heroTitle buttonShowMore descubrir">
        <ScrollLink to="about" smooth={true} duration={500}>Descubre cómo</ScrollLink>
      </a>
    </section>
  )
}
  
export default Hero