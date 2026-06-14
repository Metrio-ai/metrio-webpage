import { useCallback, useEffect, useState } from 'react'
import './ClientsCarousel.css'

function useVisibleCount () {
  const [count, setCount] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches ? 1 : 3
  )

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    const update = () => setCount(mq.matches ? 1 : 3)
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return count
}

function getWindow (active, total, visible) {
  if (total <= visible) {
    return Array.from({ length: total }, (_, i) => i)
  }
  const half = Math.floor(visible / 2)
  let start = active - half
  start = Math.max(0, Math.min(start, total - visible))
  return Array.from({ length: visible }, (_, i) => start + i)
}

function ClientsCarousel ({ clients, onSelect }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const visibleCount = useVisibleCount()
  const active = clients[activeIndex]
  const visibleIndices = getWindow(activeIndex, clients.length, visibleCount)

  const goTo = useCallback((index) => {
    setActiveIndex((index + clients.length) % clients.length)
  }, [clients.length])

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo])
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo])

  useEffect(() => {
    if (paused || clients.length <= 1) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setInterval(() => goTo(activeIndex + 1), 6000)
    return () => window.clearInterval(timer)
  }, [activeIndex, clients.length, goTo, paused])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goPrev, goNext])

  return (
    <div
      className="clientsCarousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="clientsCarouselTrackWrap">
        <button
          type="button"
          className="clientsCarouselNav clientsCarouselNav--prev"
          onClick={goPrev}
          aria-label="Cliente anterior"
        >
          <span className="material-icons" aria-hidden="true">chevron_left</span>
        </button>

        <div className="clientsCarouselTrack" role="list" aria-live="polite">
          {visibleIndices.map((index) => {
            const client = clients[index]
            const isActive = index === activeIndex
            return (
              <button
                key={client.slug}
                type="button"
                role="listitem"
                className={`clientsCarouselCard ${isActive ? 'clientsCarouselCard--active' : ''}`}
                onClick={() => {
                  setActiveIndex(index)
                  if (visibleCount === 1) onSelect(client)
                }}
                onDoubleClick={() => onSelect(client)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={`${client.name}${isActive ? ', seleccionado' : ''}`}
              >
                <span className="clientsCarouselCardLogoWrap">
                  <img
                    src={client.logo}
                    alt=""
                    className="clientsCarouselCardLogo"
                    loading="lazy"
                    width={180}
                    height={56}
                  />
                </span>
                <span className="clientsCarouselCardName">{client.name}</span>
                {client.sector && (
                  <span className="clientsCarouselCardSector">{client.sector}</span>
                )}
                {isActive && visibleCount > 1 && (
                  <p className="clientsCarouselCardSummary">{client.description}</p>
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          className="clientsCarouselNav clientsCarouselNav--next"
          onClick={goNext}
          aria-label="Cliente siguiente"
        >
          <span className="material-icons" aria-hidden="true">chevron_right</span>
        </button>
      </div>

      <div className="clientsCarouselSpotlight" aria-labelledby="clients-spotlight-title">
        <div className="clientsCarouselSpotlightInner">
          <div className="clientsCarouselSpotlightHeader">
            <div>
              <p className="clientsCarouselSpotlightLabel">Proyecto destacado</p>
              <h3 id="clients-spotlight-title" className="clientsCarouselSpotlightTitle">
                {active.name}
              </h3>
              {active.sector && (
                <p className="clientsCarouselSpotlightSector">{active.sector}</p>
              )}
            </div>
          </div>
          <p className="clientsCarouselSpotlightDesc">{active.description}</p>
          {active.services?.length > 0 && (
            <ul className="clientsCarouselSpotlightTags" aria-label="Servicios">
              {active.services.slice(0, 5).map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          )}
          <button
            type="button"
            className="clientsCarouselSpotlightBtn"
            onClick={() => onSelect(active)}
          >
            Ver resumen completo
            <span className="material-icons" aria-hidden="true">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="clientsCarouselDots" role="tablist" aria-label="Seleccionar cliente">
        {clients.map((client, index) => (
          <button
            key={client.slug}
            type="button"
            role="tab"
            className={`clientsCarouselDot ${index === activeIndex ? 'clientsCarouselDot--active' : ''}`}
            aria-selected={index === activeIndex}
            aria-label={client.name}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default ClientsCarousel
