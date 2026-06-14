import { Link } from 'react-router-dom'
import { CONTACT_BOOK, CONTACT_WRITE } from '../constants/contact'
import './BookCallActions.css'

function BookCallActions ({
  className = '',
  align = 'center',
  showSecondary = true,
  variant = 'default',
  scrollTarget,
  scrollLabel = 'Explorar más'
}) {
  return (
    <div className={`bookCallActions bookCallActions--${align} bookCallActions--${variant} ${className}`.trim()}>
      <Link to={CONTACT_BOOK} className="bookCallActionsPrimary">
        <span className="material-icons" aria-hidden="true">event_available</span>
        Reservar llamada
      </Link>
      {showSecondary && (
        <Link to={CONTACT_WRITE} className="bookCallActionsSecondary">
          Escribirnos
        </Link>
      )}
      {scrollTarget && (
        <a href={scrollTarget} className="bookCallActionsScroll">
          {scrollLabel}
          <span className="material-icons" aria-hidden="true">arrow_downward</span>
        </a>
      )}
    </div>
  )
}

export default BookCallActions
