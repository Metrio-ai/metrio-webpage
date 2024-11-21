import './Contact.css'
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <section className='contact'>
      <div className='contactContainer'>
        <div className='contactText'>
          <p className='contactHeader'>Contacto</p>
          <p className='contactSubheader'>¿Qué proyecto tienes en mente?</p>
          <Link to='/contact' className='contactBtn'>Cuéntanos</Link>
        </div>
      </div>
    </section>
  )
}

export default Contact
