import './Contact.css'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contactContainer">
        <div className="contactText">
          <p className="contactHeader">Contacto</p>
          <h2 id="contact-title" className="contactSubheader">
            ¿Qué proyecto tienes en mente?
          </h2>
          <p className="contactLead">
            Cuéntanos tu idea y te respondemos con una propuesta a medida.
          </p>
          <Link to="/contact" className="contactBtn">
            Cuéntanos
            <span className="material-icons" style={{ fontSize: '1.25rem' }} aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Contact
