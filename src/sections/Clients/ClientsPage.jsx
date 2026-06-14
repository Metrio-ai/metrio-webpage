import { useEffect, useState, useRef } from 'react'
import Layout from '../../components/Layout'
import BookCallActions from '../../components/BookCallActions'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import ClientDetailModal from '../../components/ClientDetailModal'
import ClientTile from '../../components/ClientTile'
import { clientsFaqs } from '../../data/faqs/clients'
import { loadClients } from '../../utils/clients'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './ClientsPage.css'

const CLIENTS_SEO = {
  title: 'Nuestros clientes | Metrio Consulting – IA, automatización y transformación digital',
  description: 'Clientes de Metrio Consulting: Censalia, PureTea, Bess Skin Health, Diligenz, Luanvi, Listing Boost. Proyectos de IA, automatización, BI y transformación digital en España.'
}

function ClientsPage () {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const jsonLdRef = useRef(null)

  useEffect(() => {
    loadClients().then((data) => {
      setClients(data)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    document.title = CLIENTS_SEO.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', CLIENTS_SEO.description)

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'CollectionPage',
          name: 'Clientes de Metrio Consulting',
          description: CLIENTS_SEO.description,
          url: 'https://metrio.es/clientes',
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: clients.map((c, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Organization',
                name: c.name,
                description: c.description,
                url: c.url || undefined
              }
            }))
          }
        },
        buildFaqSchema(clientsFaqs)
      ]
    }
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(jsonLd)
    script.id = 'clients-jsonld'
    document.head.appendChild(script)
    jsonLdRef.current = script

    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      if (jsonLdRef.current?.parentNode) jsonLdRef.current.remove()
    }
  }, [clients])

  return (
    <Layout className="clientsPage">
      <main>
        <header className="clientsPageHero">
          <p className="sectionLabel">Nuestros clientes</p>
          <h1 className="clientsPageTitle">Empresas que confían en Metrio</h1>
          <p className="clientsPageLead">
            Proyectos de IA, automatización, BI y transformación digital con impacto medible.
            Haz clic en cada cliente para ver el resumen del proyecto.
          </p>
        </header>

        {loading ? (
          <p className="clientsPageLoading" aria-live="polite">Cargando clientes…</p>
        ) : clients.length === 0 ? (
          <p className="clientsPageEmpty">Aún no hay clientes publicados.</p>
        ) : (
          <div className="clientsPageGrid">
            {clients.map((client) => (
              <ClientTile key={client.slug} client={client} onSelect={setSelected} />
            ))}
          </div>
        )}

        <ExpandableFaqSection
          title="Preguntas frecuentes sobre nuestros clientes y proyectos"
          titleId="clients-faq-title"
          items={clientsFaqs}
          initialCount={8}
          className="expandableFaq--subtle"
        />

        <section className="clientsPageCta" aria-labelledby="clients-cta-title">
          <h2 id="clients-cta-title" className="clientsPageCtaTitle">¿Quieres ser el próximo?</h2>
          <p className="clientsPageCtaLead">Agenda una llamada de descubrimiento o cuéntanos tu reto por email.</p>
          <BookCallActions />
        </section>
      </main>

      <ClientDetailModal client={selected} onClose={() => setSelected(null)} />
    </Layout>
  )
}

export default ClientsPage
