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
            Cuéntanos tu reto. Primera conversación sin compromiso y respuesta en 48 horas.
          </p>
          <p className="contactFaqLink">
            <Link to="/faq">Preguntas frecuentes</Link>
          </p>
          <div className="contactActions">
            <Link to="/contact" className="contactBtn">
              <span className="material-icons" aria-hidden="true">event_available</span>
              Reservar llamada
            </Link>
            <Link to="/contact?tab=escribir" className="contactBtn contactBtn--secondary">
              <span className="material-icons" aria-hidden="true">mail</span>
              Escribirnos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
