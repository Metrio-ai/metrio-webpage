import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'
import './Services.css'

import powerbiService from '../../assets/img/powerbi-service.avif'
import report1Service from '../../assets/img/report1-service.png'
import optimizationService from '../../assets/img/businessoptimization-service.jpg'
import digitaltransformService from '../../assets/img/digitaltransform-service.webp'

const Services = () => {
  const images = [
    {
      original: powerbiService,
      originalHeight: 400, originalWidth: 600,
      description: "Desarrollo de soluciones BI"
    },
    {
      original: report1Service,
      originalHeight: 400, originalWidth: 600,
      description: "Diseño de herramientas propias para visualización de datos"
    },
    {
      original: optimizationService,
      originalHeight: 400, originalWidth: 600,
      description: "Asesoramiento estratégico sobre los datos"
    },
    {
      original: digitaltransformService,
      originalHeight: 400, originalWidth: 600,
      description: "Transformación digital de la empresa"
    }
  ]

  return (
    <section className="servicesContainer" id="services">
        <div className="servicesContent">
            <p className="servicesHeader">Nuestros servicios</p>
            <div className="gallery">
                <ImageGallery
                  items={images}
                  infinite={true}
                  showFullscreenButton={false}
                  showThumbnails={false}
                  showBullets={true}
                  autoPlay={true}
                  slideInterval={3000}
                  slideDuration={500}
                />
            </div>
        </div>
    </section>
  )
}

export default Services
