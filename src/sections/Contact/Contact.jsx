import './Contact.css'

const Contact = () => {
  return (
    <section className='contact'>
      <div className='contactContainer'>
        <div className='contactText'>
          <p className='contactHeader'>Contacto</p>
          <p className='contactSubheader'>¿Qué proyecto tienes en mente?</p>
          <a
            className='contactBtn'
            href='mailto:hola@metrio.es?subject=Consulta%20sobre%20proyecto'
            target='_blank'
            rel='noopener noreferrer'
          >
            Cuéntanos
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
