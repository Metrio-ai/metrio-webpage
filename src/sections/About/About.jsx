import './About.css'


function About() {
    return (
        <section className="aboutContainer">  
            {/* Texto y tecnologías */}
            <div className="aboutContent">
                <p className="aboutHeader">Sobre Nosotros</p>
                <p className="aboutDescription">
                    En Metrio creamos soluciones a medida que transforman tus datos
                    en decisiones inteligentes. Diseñamos estrategias únicas,
                    combinando experiencia, tecnología avanzada y una comunicación
                    cercana para impulsar tu negocio al siguiente nivel.
                </p>
                {/* Lista de tecnologías */}
                <div className="aboutTechIcons">
                    <img className="techIcon" src="/src/assets/img/python.svg" alt="Python" />
                    <img className="techIcon" src="/src/assets/img/nodejs.svg" alt="NodeJS" />
                    <img className="techIcon" src="/src/assets/img/postgresql.svg" alt="PostgreSQL" />
                    <img className="techIcon" src="/src/assets/img/mongodb.svg" alt="MongoDB" />
                    <img className="techIcon" src="/src/assets/img/react.svg" alt="React" />
                    <img className="techIcon" src="/src/assets/img/docker.svg" alt="Docker" />
                </div>
                <p className="aboutDescription">
                    Seleccionamos cuidadosamente las herramientas 
                    y tecnologías que nos permiten 
                    ofrecer soluciones innovadoras, confiables y escalables. 
                    Desde lenguajes de programación 
                    robustos hasta plataformas avanzadas de almacenamiento y 
                    procesamiento, nuestra meta es 
                    garantizar resultados sobresalientes en cada proyecto.
                </p>
                <div className="aboutTechIcons">
                    <img className="techIcon" src="/src/assets/img/excel.svg" alt="Excel" />
                    <img className="techIcon" src="/src/assets/img/powerbi.svg" alt="PowerBI" />
                    <img className="techIcon" src="/src/assets/img/tableau.svg" alt="Tableau" />
                    <img className="techIcon" src="/src/assets/img/pandas.svg" alt="Pandas" />
                    <img className="techIcon" src="/src/assets/img/matplotlib.svg" alt="Matplotlob" />
                    <img className="techIcon" src="/src/assets/img/tensorflow.svg" alt="TensorFlow" />
                </div>
            </div>
        </section>
    )
  }
  
  export default About