import './About.css'
import pythonLogo from '/src/assets/img/python.svg'
import nodejsLogo from '/src/assets/img/nodejs.svg'
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
    const techIcons = [
        { src: pythonLogo, alt: "Python", description: "Python aplicado a ciencia de datos"},
        { src: nodejsLogo, alt: "NodeJS", description: "Flujos de carga de datos y APIs desarrollados en NodeJS"},
        { src: postgresLogo, alt: "PostgreSQL", description: "Servicios PostgreSQL para bases de datos relacionales"},
        { src: mongodbLogo, alt: "MongoDB", description: "Servicios MongoDB para colecciones de datos flexibles"},
        { src: reactlogo, alt: "React", description: "Diseño de páginas web con React"},
        { src: dockerLogo, alt: "Docker", description: "Despliegue de microservicios mediante Docker"}
    ]
    const toolIcons = [
        { src: excelLogo, alt: "Excel", description: "Reportes para interactuar con los análisis"},
        { src: powerbiLogo, alt: "PowerBI", description: "Dashboards para el área de negocio"},
        { src: tableauLogo, alt: "Tableau", description: "Tableau para Business Insights avanzados"},
        { src: pandasLogo, alt: "Pandas", description: "Herramientas a medida para analizar los datos"},
        { src: matplotlibLogo, alt: "Matplotlib", description: "Gráficos personalizados"},
        { src: tensorflowLogo, alt: "TensorFlow", description: "Modelos de Machine Learning e IA"}
    ]
    return (
        <section className="aboutContainer" id="about">  
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
                    {techIcons.map((icon, index) => (
                        <div className="techIconContainer" key={index}>
                            <img className="techIcon" src={icon.src} alt={icon.alt} />
                            <div className="tooltip">{icon.description}</div>
                        </div>
                    ))}
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
                    {toolIcons.map((icon, index) => (
                        <div className="techIconContainer" key={index}>
                            <img className="techIcon" src={icon.src} alt={icon.alt} />
                            <div className="tooltip">{icon.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
  }
  
  export default About