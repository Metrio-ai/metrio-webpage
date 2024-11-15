import './Hero.css'


function Hero() {
  
    return (
      <section className="heroContainer">
        <div className="heroOverlay"></div>
        <h1 className="heroTitle">Conectar</h1>
        <h1 className="heroTitle">Analizar</h1>
        <h1 className="heroTitle">Impulsar</h1>
        <a className="heroTitle buttonShowMore" href="#about">Descubre cómo</a>
      </section>
    )
  }
  
  export default Hero