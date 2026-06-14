import { useEffect, useRef, useState } from 'react'
import './Stats.css'

const STATS = [
  { value: 150, suffix: '+', label: 'Proyectos entregados' },
  { value: 100, suffix: '+', label: 'Clientes satisfechos' },
  { value: 40, suffix: '+', label: 'Apps y dashboards en producción' },
  { value: 90, suffix: '%', label: 'Clientes que repiten' }
]

function useCountUp (target, active, duration = 1400) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = null
    let frame

    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [target, active, duration])

  return count
}

function StatCell ({ stat, active }) {
  const count = useCountUp(stat.value, active)
  return (
    <div className="statCell">
      <p className="statValue" aria-label={`${stat.value}${stat.suffix} ${stat.label}`}>
        <span className="statNumber">{count}</span>
        <span className="statSuffix">{stat.suffix}</span>
      </p>
      <p className="statLabel">{stat.label}</p>
    </div>
  )
}

function Stats () {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rect = el.getBoundingClientRect()
    if (reduced || rect.top < window.innerHeight * 0.9) {
      setActive(true)
      if (reduced) return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="statsSection" id="stats" ref={sectionRef} aria-label="Trayectoria de Metrio">
      <div className="statsInner">
        <div className="statsTop">
          <p className="statsEyebrow">Desde 2024</p>
          <h2 className="statsTitle">Trayectoria en cifras</h2>
        </div>

        <div className="statsBand" role="list">
          {STATS.map((stat) => (
            <StatCell key={stat.label} stat={stat} active={active} />
          ))}
        </div>

        <p className="statsFootnote">
          Ritmo de entrega constante. Cada número es un proyecto cerrado, no una estimación.
        </p>
      </div>
    </section>
  )
}

export default Stats
