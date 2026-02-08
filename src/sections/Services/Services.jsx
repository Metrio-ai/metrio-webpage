import { Link } from 'react-router-dom'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import './Services.css'

// Imágenes en alta resolución (1200px) para la galería de servicios
const SERVICES_IMAGES = [
  {
    original: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=90',
    originalHeight: 630,
    originalWidth: 1200,
    description: 'Desarrollo de soluciones BI'
  },
  {
    original: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=90',
    originalHeight: 630,
    originalWidth: 1200,
    description: 'Herramientas propias para visualización de datos'
  },
  {
    original: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=90',
    originalHeight: 630,
    originalWidth: 1200,
    description: 'Asesoramiento estratégico sobre los datos'
  },
  {
    original: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=90',
    originalHeight: 630,
    originalWidth: 1200,
    description: 'Transformación digital de la empresa'
  },
  {
    original: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&q=90',
    originalHeight: 630,
    originalWidth: 1200,
    description: 'Leads cualificados: base de datos accionable y mailing con más del 40% de apertura'
  }
]

const Services = () => {
  const images = SERVICES_IMAGES

  return (
    <section className="servicesContainer" id="services" aria-labelledby="services-title">
      <div className="servicesContent">
        <p className="servicesHeader">Nuestros servicios</p>
        <h2 id="services-title" className="servicesTitle">
          Soluciones que impulsan tu negocio
        </h2>
        <div className="gallery">
          <ImageGallery
            items={images}
            infinite
            showFullscreenButton={false}
            showThumbnails={false}
            showBullets
            autoPlay
            slideInterval={4000}
            slideDuration={500}
          />
        </div>
        <Link to="/services" className="servicesCtaLink">
          Ver todos los servicios en detalle
          <span className="material-icons" aria-hidden="true">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}

export default Services
