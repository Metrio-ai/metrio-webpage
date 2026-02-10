import Layout from '../../components/Layout'
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
    <Layout className="contactPage">
      <main>
        <section className="contactFormContainer" aria-labelledby="contact-form-title">
          <div className="contactPageIntro">
            <h1 id="contact-form-title" className="contactFormHeader">
              Contacto
            </h1>
            <p className="contactPageLead">
              ¿Tienes un proyecto de datos, Business Intelligence o desarrollo de producto en mente? Nos encanta conocer nuevas ideas y ver cómo podemos ayudarte a llevarlas a cabo con tecnología y criterio.
            </p>
            <p className="contactPageText">
              Cuéntanos en qué estás trabajando, qué objetivo persigues y qué plazos o restricciones tienes. No hace falta que tengas todo definido: una primera conversación nos sirve para alinear expectativas y, si encajamos, te proponemos un alcance y una forma de trabajar sin compromiso. Respondemos a todos los mensajes y solemos dar una primera respuesta en menos de 48 horas laborables.
            </p>
            <p className="contactPageText">
              Puedes escribirnos directamente a <a href="mailto:hola@metrio.es" className="contactPageEmail">hola@metrio.es</a> o usar el formulario. Los datos que nos envíes se utilizarán únicamente para responder a tu consulta y no los compartimos con terceros.
            </p>
          </div>
          <div className="contactFormWrap">
          <form className="contactForm" onSubmit={handleSubmit} noValidate>
            <h2 className="contactFormSubheaderTitle">Envíanos tu mensaje</h2>
            <p className="contactFormSubheader">
              Rellena los campos y te contestamos lo antes posible.
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
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default ContactPage
