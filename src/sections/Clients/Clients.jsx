import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ClientDetailModal from '../../components/ClientDetailModal'
import ClientsCarousel from '../../components/ClientsCarousel'
import { CONTACT_BOOK } from '../../constants/contact'
import { loadClients } from '../../utils/clients'
import './Clients.css'

function Clients () {
  const [clients, setClients] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    loadClients().then(setClients)
  }, [])

  if (clients.length === 0) return null

  const featured = clients.filter((c) => c.featured !== false)

  return (
    <section className="clientsSection" id="clientes" aria-labelledby="clients-title">
      <div className="clientsInner">
        <header className="clientsHeader">
          <p className="sectionLabel">Nuestros clientes</p>
          <h2 id="clients-title" className="sectionTitle">
            Empresas que confían en nosotros
          </h2>
          <p className="sectionLead clientsLead">
            Trabajamos con equipos que quieren resultados, no presentaciones. IA, automatización y datos aplicados a negocio real.
          </p>
        </header>

        <ClientsCarousel clients={featured} onSelect={setSelected} />

        <div className="clientsCta">
          <Link to="/clientes" className="clientsCtaLink">
            Ver todos los clientes
            <span className="material-icons" aria-hidden="true">arrow_forward</span>
          </Link>
          <Link to={CONTACT_BOOK} className="clientsBookLink">
            Reservar llamada
            <span className="material-icons" aria-hidden="true">event_available</span>
          </Link>
        </div>
      </div>

      <ClientDetailModal client={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

export default Clients
