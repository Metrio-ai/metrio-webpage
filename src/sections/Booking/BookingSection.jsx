import { Link } from 'react-router-dom'
import CalEmbed from '../../components/CalEmbed'
import './BookingSection.css'

function BookingSection () {
  return (
    <section className="bookingSection" id="contact" aria-labelledby="booking-title">
      <div className="bookingInner">
        <div className="bookingCalColumn">
          <p className="bookingCalLabel">
            <span className="material-icons" aria-hidden="true">calendar_month</span>
            Elige tu horario
          </p>
          <CalEmbed
            className="bookingCal"
            hideEventTypeDetails
            layout="column"
            minHeight={480}
            label="Reservar llamada de descubrimiento con Metrio Consulting"
          />
        </div>

        <aside className="bookingIntro">
          <p className="sectionLabel">Contacto</p>
          <h2 id="booking-title" className="sectionTitle">
            Agenda una llamada de descubrimiento
          </h2>
          <p className="sectionLead bookingLead">
            30 minutos para entender tu reto, contarte cómo trabajamos y ver si encajamos.
            Sin compromiso.
          </p>
          <ul className="bookingBenefits">
            <li>
              <span className="material-icons" aria-hidden="true">schedule</span>
              Calendario en tiempo real — elige arriba
            </li>
            <li>
              <span className="material-icons" aria-hidden="true">videocam</span>
              Videollamada por Google Meet o Zoom
            </li>
            <li>
              <span className="material-icons" aria-hidden="true">psychology</span>
              IA, automatización, BI y transformación digital
            </li>
            <li>
              <span className="material-icons" aria-hidden="true">mail</span>
              O escríbenos a{' '}
              <a href="mailto:hola@metrio.es">hola@metrio.es</a>
            </li>
          </ul>
          <Link to="/contact" className="bookingAltLink">
            Ver formulario de contacto
            <span className="material-icons" aria-hidden="true">arrow_forward</span>
          </Link>
        </aside>
      </div>
    </section>
  )
}

export default BookingSection
