import './Stats.css'

const STATS = [
  {
    value: 150,
    suffix: '+',
    label: 'Proyectos entregados',
    short: 'Con impacto medible y resultados que perduran.',
    icon: 'folder_special'
  },
  {
    value: 100,
    suffix: '+',
    label: 'Clientes satisfechos',
    short: 'Empresas que confían en nosotros para crecer con datos y producto.',
    icon: 'groups'
  },
  {
    value: 40,
    suffix: '+',
    label: 'Aplicaciones y dashboards',
    short: 'Productos en producción, reportes automatizados y BI que se usa.',
    icon: 'apps'
  },
  {
    value: 90,
    suffix: '%',
    label: 'De nuestros clientes repiten',
    short: 'Confianza y resultados que generan fidelidad.',
    icon: 'replay'
  }
]

function Stats () {
  return (
    <section className="statsSection" id="stats" aria-label="Cifras de Metrio">
      <div className="statsInner">
        <header className="statsHeader">
          <p className="statsLabel">Cifras</p>
          <h2 className="statsTitle">Resultados que hablan por sí solos</h2>
          <p className="statsLead">Transparencia ante todo. Estas son las cifras que nos avalan: proyectos con impacto, clientes que repiten y soluciones que funcionan en el día a día.</p>
        </header>
        <div className="statsGrid">
          {STATS.map((stat) => (
            <article key={stat.label} className="statItem">
              <span className="statIconWrap" aria-hidden="true">
                <span className="material-icons statIcon">{stat.icon}</span>
              </span>
              <p className="statValue">
                <span className="statNumber">{stat.value}</span>
                <span className="statSuffix">{stat.suffix}</span>
              </p>
              <h3 className="statLabel">{stat.label}</h3>
              <p className="statShort">{stat.short}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
