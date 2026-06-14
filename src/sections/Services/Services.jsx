import { Link } from 'react-router-dom'
import SectionImage from '../../components/SectionImage'
import { SECTION_IMAGES } from '../../data/sectionImages'
import BookCallActions from '../../components/BookCallActions'
import { useIsMobile } from '../../hooks/useMediaQuery'
import './Services.css'

const HIGHLIGHTS = [
  {
    icon: 'settings_suggest',
    title: 'Automatización',
    text: 'Workflows, ETL y reportes que eliminan trabajo manual y errores operativos.'
  },
  {
    icon: 'support_agent',
    title: 'Asesoría estratégica',
    text: 'Roadmap, arquitectura y priorización con visión de negocio y técnica.'
  },
  {
    icon: 'insights',
    title: 'Business Intelligence',
    text: 'Dashboards, KPIs y una fuente de verdad para decidir con datos.'
  },
  {
    icon: 'trending_up',
    title: 'Transformación digital',
    text: 'Procesos, producto y operaciones alineados con objetivos medibles.'
  }
]

const Services = () => {
  const isMobile = useIsMobile()

  return (
  <section className="servicesContainer" id="services" aria-labelledby="services-title">
    <div className="servicesSplit">
      {!isMobile && (
      <div className="servicesVisual">
        <SectionImage
          src={SECTION_IMAGES.services}
          alt="Dashboard de Business Intelligence con KPIs y métricas de negocio"
          width={960}
          height={660}
          caption="Datos, dashboards y automatización al servicio de tus decisiones"
        />
      </div>
      )}
      <div className="servicesContent">
        <p className="servicesHeader">Servicios</p>
        <h2 id="services-title" className="servicesTitle">
          Soluciones que impulsan tu negocio
        </h2>
        <p className="servicesLead">
          Consultoría tecnológica de punta a punta: desde el diagnóstico hasta la entrega en producción.
        </p>
      </div>
    </div>

    <div className="servicesBody">
      <ul className="servicesGrid">
        {HIGHLIGHTS.map((item) => (
          <li key={item.title}>
            <article className="servicesCard">
              <span className="servicesCardIcon material-icons" aria-hidden="true">{item.icon}</span>
              <h3 className="servicesCardTitle">{item.title}</h3>
              <p className="servicesCardText">{item.text}</p>
            </article>
          </li>
        ))}
      </ul>
      <Link to="/services" className="servicesCtaLink">
        Ver todos los servicios
        <span className="material-icons" aria-hidden="true">arrow_forward</span>
      </Link>
      <BookCallActions className="servicesBookCall" />
    </div>
  </section>
  )
}

export default Services
