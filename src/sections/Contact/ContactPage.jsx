import Footer from '../../components/Footer'
import Header from '../../components/Header'
import './Contact.css'

const ContactPage = () => {
  return (
    <>
      <Header />
      <section className='contact'>
        <div className='contactContainer'>
          <div className='contactText'>
            <p className='contactHeader'>Contacto</p>
            <p className='contactSubheader'>¿Qué proyecto tienes en mente?</p>
          </div>
        </div>
      </section>
      <section className='contactFormContainer'></section>
      <Footer />
    </>
  )
}

export default ContactPage
