import { useEffect } from 'react'
import './ClientDetailModal.css'

function ClientDetailModal ({ client, onClose }) {
  useEffect(() => {
    if (!client) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [client, onClose])

  if (!client) return null

  return (
    <div className="clientModalBackdrop" onClick={onClose} role="presentation">
      <div
        className="clientModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="client-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="clientModalClose"
          onClick={onClose}
          aria-label="Cerrar"
        >
          <span className="material-icons" aria-hidden="true">close</span>
        </button>

        <div className="clientModalHeader">
          <div className="clientModalLogoWrap">
            <img
              src={client.logo}
              alt=""
              className="clientModalLogo"
              width={180}
              height={56}
            />
          </div>
          <div>
            <h2 id="client-modal-title" className="clientModalName">{client.name}</h2>
            {client.sector && (
              <p className="clientModalSector">{client.sector}</p>
            )}
          </div>
        </div>

        <p className="clientModalDesc">{client.description}</p>

        {client.services?.length > 0 && (
          <ul className="clientModalTags" aria-label="Servicios con Metrio">
            {client.services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}

        {client.url && (
          <a
            href={client.url}
            className="clientModalLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visitar web de {client.name}
            <span className="material-icons" aria-hidden="true">open_in_new</span>
          </a>
        )}
      </div>
    </div>
  )
}

export default ClientDetailModal
