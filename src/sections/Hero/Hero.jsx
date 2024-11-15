import './Hero.css'


function Hero() {
  
    return (
      <section className="heroContainer">
        <div className="heroOverlay"></div>
        <h1 className="heroTitle conectar">Conectar</h1>
        <h1 className="heroTitle analizar">Analizar</h1>
        <h1 className="heroTitle impulsar">Impulsar</h1>
        <a className="heroTitle buttonShowMore descubrir" href="#about">Descubre cómo</a>
      </section>
    )
  }
  
  export default Hero