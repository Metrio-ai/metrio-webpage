import Footer from '../../components/Footer'
import Header from '../../components/Header'
import './Contact.css'
import { useState } from 'react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = e => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = e => {
    e.preventDefault()
    const { companyName, contactName, subject, message } = formData

    const emailBody = encodeURIComponent(
      `Hola, soy ${contactName} de ${companyName}.\n\n${message}`
    )
    const mailtoLink = `mailto:hola@metrio.es?subject=${encodeURIComponent(
      subject
    )}&body=${emailBody}`

    window.location.href = mailtoLink
  }

  return (
    <div className='contactPage'>
      <Header />
      <section className='contactFormContainer'>
        <form className='contactForm' onSubmit={handleSubmit}>
          <p className='contactFormHeader'>Contacto</p>
          <p className='contactFormSubheader'>Háblanos sobre tu proyecto</p>
          <div className='formGroup'>
            <input
              type='text'
              id='companyName'
              name='companyName'
              value={formData.companyName}
              onChange={handleChange}
              placeholder='Nombre de la empresa'
              required
            />
          </div>
          <div className='formGroup'>
            <input
              type='text'
              id='contactName'
              name='contactName'
              value={formData.contacName}
              onChange={handleChange}
              placeholder='Nombre de contacto'
              required
            />
          </div>
          <div className='formGroup'>
            <input
              type='text'
              id='subject'
              name='subject'
              value={formData.subject}
              onChange={handleChange}
              placeholder='Asunto'
              required
            />
          </div>
          <div className='formGroup'>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              placeholder='Describe brevemente qué proyecto necesitas llevar a cabo.'
              rows='5'
            ></textarea>
          </div>
          <button type='button' className='formButton' onClick={handleSubmit}>
            Enviar
          </button>
        </form>
      </section>
      <Footer />
    </div>
  )
}

export default ContactPage
