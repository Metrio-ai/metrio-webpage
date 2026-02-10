import { Link } from 'react-router-dom'
import LazyImageGallery from '../../components/LazyImageGallery'
import './Services.css'

const Services = () => (
  <section className="servicesContainer" id="services" aria-labelledby="services-title">
    <div className="servicesContent">
      <p className="servicesHeader">Nuestros servicios</p>
      <h2 id="services-title" className="servicesTitle">
        Soluciones que impulsan tu negocio
      </h2>
      <p className="servicesLead">BI, dashboards, transformación digital, leads cualificados y desarrollo de producto. Todo lo que necesitas para crecer con datos.</p>
      <LazyImageGallery />
      <Link to="/services" className="servicesCtaLink">
        Ver todos los servicios
        <span className="material-icons" aria-hidden="true">arrow_forward</span>
      </Link>
    </div>
  </section>
)

export default Services
