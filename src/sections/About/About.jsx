import { Link } from 'react-router-dom'
import SectionImage from '../../components/SectionImage'
import { SECTION_IMAGES } from '../../data/sectionImages'
import './About.css'

function About () {
  return (
    <section className="aboutContainer" id="quiene-somos" aria-labelledby="about-title">
      <div className="aboutGrid">
        <div className="aboutVisual">
          <SectionImage
            src={SECTION_IMAGES.about}
            alt="Equipo de consultoría tecnológica colaborando en un proyecto de datos e IA"
            width={960}
            height={660}
            caption="Consultores e ingenieros trabajando codo a codo con tu equipo"
          />
        </div>
        <div className="aboutContent">
          <p className="aboutHeader">Quiénes somos</p>
          <h2 id="about-title" className="aboutTitle">
            Consultora tecnológica que ejecuta, no solo recomienda
          </h2>
          <p className="aboutDescription">
            Somos una consultora tecnológica: consultores e ingenieros que acompañan
            a empresas en proyectos de consultoría de automatización, datos e
            transformación digital. Trabajamos contigo de principio a fin:
            diagnóstico, diseño, desarrollo y despliegue en producción.
          </p>
          <ul className="aboutPoints">
            <li>
              <span className="material-icons" aria-hidden="true">engineering</span>
              <div>
                <strong>Implementamos</strong>
                <span>IA, automatización, BI y producto digital en producción</span>
              </div>
            </li>
            <li>
              <span className="material-icons" aria-hidden="true">groups</span>
              <div>
                <strong>Acompañamos</strong>
                <span>Equipos de dirección, datos, operaciones y tecnología</span>
              </div>
            </li>
            <li>
              <span className="material-icons" aria-hidden="true">speed</span>
              <div>
                <strong>Entregamos</strong>
                <span>150+ proyectos · respuesta en 48 h · sin humo</span>
              </div>
            </li>
          </ul>
          <Link to="/sobre-nosotros" className="aboutCtaLink">
            Sobre nosotros
            <span className="material-icons" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default About
