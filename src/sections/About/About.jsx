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

function About () {
  const techIcons = [
    { src: pythonLogo, alt: 'Python', label: 'Python', description: 'Python aplicado a ciencia de datos' },
    { src: nodejsLogo, alt: 'Node.js', label: 'Node.js', description: 'Flujos de carga de datos y APIs en Node.js' },
    { src: postgresLogo, alt: 'PostgreSQL', label: 'PostgreSQL', description: 'Bases de datos relacionales' },
    { src: mongodbLogo, alt: 'MongoDB', label: 'MongoDB', description: 'Colecciones de datos flexibles' },
    { src: reactlogo, alt: 'React', label: 'React', description: 'Aplicaciones web con React' },
    { src: dockerLogo, alt: 'Docker', label: 'Docker', description: 'Despliegue de microservicios' }
  ]
  const toolIcons = [
    { src: excelLogo, alt: 'Excel', label: 'Excel', description: 'Reportes e interactividad con datos' },
    { src: powerbiLogo, alt: 'Power BI', label: 'Power BI', description: 'Dashboards para negocio' },
    { src: tableauLogo, alt: 'Tableau', label: 'Tableau', description: 'Business Insights avanzados' },
    { src: pandasLogo, alt: 'Pandas', label: 'Pandas', description: 'Análisis de datos a medida' },
    { src: matplotlibLogo, alt: 'Matplotlib', label: 'Matplotlib', description: 'Gráficos personalizados' },
    { src: tensorflowLogo, alt: 'TensorFlow', label: 'TensorFlow', description: 'Machine Learning e IA' }
  ]

  return (
    <section className="aboutContainer" id="about" aria-labelledby="about-title">
      <div className="aboutContent">
        <p className="aboutHeader">Sobre nosotros</p>
        <h2 id="about-title" className="aboutTitle">
          Tecnología con criterio
        </h2>
        <p className="aboutDescription">
          En Metrio creamos soluciones a medida que transforman tus datos en
          decisiones inteligentes. Combinamos experiencia, tecnología avanzada
          y comunicación cercana para llevar tu negocio al siguiente nivel.
        </p>
        <div className="aboutTechIcons" role="list">
          {techIcons.map((icon, index) => (
            <div className="techIconContainer" key={index} role="listitem">
              <img className="techIcon" src={icon.src} alt={icon.alt} width="44" height="44" />
              <span className="techIconLabel">{icon.label}</span>
              <div className="tooltip" role="tooltip">{icon.description}</div>
            </div>
          ))}
        </div>
        <div className="aboutDivider" aria-hidden="true" />
        <p className="aboutDescription">
          Seleccionamos las herramientas que nos permiten ofrecer soluciones
          innovadoras, fiables y escalables: desde lenguajes robustos hasta
          plataformas de almacenamiento y procesamiento, con resultados
          sobresalientes en cada proyecto.
        </p>
        <div className="aboutTechIcons" role="list">
          {toolIcons.map((icon, index) => (
            <div className="techIconContainer" key={index} role="listitem">
              <img className="techIcon" src={icon.src} alt={icon.alt} width="44" height="44" />
              <span className="techIconLabel">{icon.label}</span>
              <div className="tooltip" role="tooltip">{icon.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
