import { useState } from 'react'
import './Services.css'

import excelService from '../../assets/img/excel-service.avif'
import powerbiService from '../../assets/img/powerbi-service.jpeg'
import tableauService from '../../assets/img/tableau-service.jpeg'
import report1Service from '../../assets/img/report1-service.jpeg'

const Services = () => {
  const images = [
    excelService,
    powerbiService,
    tableauService,
    report1Service
  ]

  const [currentIndex, setCurrentIndex] = useState(0)


  const handleNavigation = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      )
    } else if (direction === 'next') {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }
  }

  return (
    <section className="servicesContainer" id="services">
        <div className="servicesContent">
            <p className="servicesHeader">Nuestros servicios</p>
            <div className="gallery">
                <button
                    className="galleryNav-button prev"
                    onClick={() => handleNavigation('prev')}
                >
                    <span className="material-icons">arrow_back</span>
                </button>
                <img
                    src={images[currentIndex]}
                    alt={`Service ${currentIndex + 1}`}
                    className="gallery-image"
                />
                <button
                    className="galleryNav-button next"
                    onClick={() => handleNavigation('next')}
                >
                    <span className="material-icons">arrow_forward</span>
                </button>
            </div>
        </div>
    </section>
  )
}

export default Services
