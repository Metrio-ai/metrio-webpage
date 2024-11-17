import './About.css'
import pythonLogo from '/src/assets/img/python.svg'
import nodejsLogo from '/src/assets/img/python.svg'
import postgresLogo from '/src/assets/img/postgresql.svg'
import mongodbLogo from '/src/assets/img/mongodb.svg'
import reactlogo from '/src/assets/img/react.svg'
import dockerLogo from '/src/assets/img/docker.svg'
import excelLogo from '/src/assets/img/excel.svg'
import powerbiLogo from '/src/assets/img/powerbi.svg'
import tableauLogo from '/src/assets/img/tableau.svg'
import pandasLogo from '/src/assets/img/pandas.svg'
import matplotlibLogo from '/src/assets/img/matplotlib.svg'
import tensorflowLogo from '/src/assets/img/tensorflow.svg'

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
                    <img className="techIcon" src={pythonLogo} alt="Python" />
                    <img className="techIcon" src={nodejsLogo} alt="NodeJS" />
                    <img className="techIcon" src={postgresLogo} alt="PostgreSQL" />
                    <img className="techIcon" src={mongodbLogo} alt="MongoDB" />
                    <img className="techIcon" src={reactlogo} alt="React" />
                    <img className="techIcon" src={dockerLogo} alt="Docker" />
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
                    <img className="techIcon" src={excelLogo} alt="Excel" />
                    <img className="techIcon" src={powerbiLogo} alt="PowerBI" />
                    <img className="techIcon" src={tableauLogo} alt="Tableau" />
                    <img className="techIcon" src={pandasLogo} alt="Pandas" />
                    <img className="techIcon" src={matplotlibLogo} alt="Matplotlob" />
                    <img className="techIcon" src={tensorflowLogo} alt="TensorFlow" />
                </div>
            </div>
        </section>
    )
  }
  
  export default About