import Footer from '../../components/Footer'
import Header from '../../components/Header'
import './Contact.css'
import { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { companyName, contactName, subject, message } = formData
    const emailBody = encodeURIComponent(
      `Hola, soy ${contactName} de ${companyName}.\n\n${message}`
    )
    const mailtoLink = `mailto:hola@metrio.es?subject=${encodeURIComponent(subject)}&body=${emailBody}`
    window.location.href = mailtoLink
  }

  return (
    <div className="contactPage">
      <Header />
      <main>
        <section className="contactFormContainer" aria-labelledby="contact-form-title">
          <form className="contactForm" onSubmit={handleSubmit} noValidate>
            <h1 id="contact-form-title" className="contactFormHeader">
              Contacto
            </h1>
            <p className="contactFormSubheader">
              Háblanos sobre tu proyecto
            </p>
            <div className="formGroup">
              <label htmlFor="companyName">Nombre de la empresa</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Tu empresa"
                required
                autoComplete="organization"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="contactName">Nombre de contacto</label>
              <input
                type="text"
                id="contactName"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                placeholder="Tu nombre"
                required
                autoComplete="name"
              />
            </div>
            <div className="formGroup">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Asunto del mensaje"
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe brevemente qué proyecto necesitas llevar a cabo."
                rows={5}
                required
              />
            </div>
            <button type="submit" className="formButton">
              Enviar
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default ContactPage
