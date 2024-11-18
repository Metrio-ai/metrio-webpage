import './Services.css'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

import excelService from '../../assets/img/excel-service.avif'
import powerbiService from '../../assets/img/powerbi-service.avif'
import report1Service from '../../assets/img/report1-service.png'

const Services = () => {
  const images = [
    {
      original: excelService,
      originalHeight: 400, originalWidth: 600,
      description: "Reportes Excel avanzados"
    },
    {
      original: powerbiService,
      originalHeight: 400, originalWidth: 600,
      description: "Tablones PowerBI personalizados"
    },
    {
      original: report1Service,
      originalHeight: 400, originalWidth: 600,
      description: "Diseño de herramientas propias para visualización de datos"
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
