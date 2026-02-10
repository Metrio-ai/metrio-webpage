import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import './HowItWorks.css'

const PERSONAS = [
  {
    id: 'empresa',
    label: 'Soy empresa',
    short: 'Para equipos y organizaciones que quieren escalar con datos y producto.',
    icon: 'business_center'
  },
  {
    id: 'startup',
    label: 'Soy startup',
    short: 'Para proyectos en crecimiento que necesitan BI, producto o leads con criterio.',
    icon: 'rocket_launch'
  },
  {
    id: 'proyecto',
    label: 'Tengo un proyecto',
    short: 'Para profesionales o particulares con una idea concreta que quieren llevar a cabo.',
    icon: 'lightbulb'
  }
]

const STEPS = [
  {
    id: 'contacto',
    number: '01',
    title: 'Contacto',
    description: 'Cuéntanos tu reto en una primera conversación sin compromiso.',
    icon: 'handshake'
  },
  {
    id: 'diagnostico',
    number: '02',
    title: 'Diagnóstico',
    description: 'Definimos objetivos, alcance y qué éxito significa para ti.',
    icon: 'search'
  },
  {
    id: 'propuesta',
    number: '03',
    title: 'Propuesta',
    description: 'Te presentamos un enfoque, plan y presupuesto a medida.',
    icon: 'description'
  },
  {
    id: 'ejecucion',
    number: '04',
    title: 'Ejecución',
    description: 'Trabajo iterativo, entregas parciales y comunicación constante.',
    icon: 'trending_up'
  },
  {
    id: 'resultados',
    number: '05',
    title: 'Resultados',
    description: 'Impacto medible y soporte para que sigas creciendo.',
    icon: 'verified'
  }
]

function getHowToSchema () {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Cómo trabajamos en Metrio Consulting',
    description: 'Proceso de consultoría tecnológica: contacto, diagnóstico, propuesta, ejecución y resultados.',
    step: STEPS.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.title,
      text: s.description
    }))
  }
}

function HowItWorks () {
  const [activePersona, setActivePersona] = useState('empresa')
  const [diagramVisible, setDiagramVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(getHowToSchema())
    script.id = 'howitworks-schema'
    document.head.appendChild(script)
    return () => {
      const el = document.getElementById('howitworks-schema')
      if (el) el.remove()
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setDiagramVisible(true)
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const activePersonaData = PERSONAS.find((p) => p.id === activePersona)

  return (
    <section
      ref={sectionRef}
      className="howItWorks"
      id="como-funciona"
      aria-labelledby="how-title"
    >
      <div className="howItWorksInner">
        <header className="howItWorksHeader">
          <p className="howItWorksLabel">Cómo trabajamos</p>
          <h2 id="how-title" className="howItWorksTitle">
            Un proceso claro, sin sorpresas
          </h2>
          <p className="howItWorksLead">
            En Metrio seguimos siempre los mismos pasos: transparencia, entregas iterativas y resultados que puedas medir. El camino depende de si eres empresa, startup o tienes un proyecto concreto.
          </p>
        </header>

        <div className="howItWorksPersonas" role="tablist" aria-label="Tipo de cliente">
          {PERSONAS.map((p) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={activePersona === p.id}
              aria-controls="how-diagram"
              id={`persona-${p.id}`}
              className={`howPersonaBtn ${activePersona === p.id ? 'howPersonaBtn--active' : ''}`}
              onClick={() => setActivePersona(p.id)}
            >
              <span className="material-icons howPersonaBtnIcon" aria-hidden="true">
                {p.icon}
              </span>
              {p.label}
            </button>
          ))}
        </div>

        <p
          id="how-diagram"
          className="howItWorksPersonaShort"
          role="tabpanel"
          aria-labelledby={`persona-${activePersona}`}
        >
          {activePersonaData?.short}
        </p>

        <div
          className={`howDiagram ${diagramVisible ? 'howDiagram--visible' : ''}`}
          aria-hidden="false"
        >
          <div className="howDiagramLine" aria-hidden="true" />
          <ol className="howDiagramSteps" itemScope itemType="https://schema.org/HowTo">
            <meta itemProp="name" content="Proceso de trabajo Metrio Consulting" />
            {STEPS.map((step, index) => (
              <li
                key={step.id}
                className="howStep"
                style={{ '--step-order': index }}
                itemProp="step"
                itemScope
                itemType="https://schema.org/HowToStep"
              >
                <span className="howStepNumber" aria-hidden="true">
                  {step.number}
                </span>
                <span className="howStepIconWrap" aria-hidden="true">
                  <span className="material-icons howStepIcon">{step.icon}</span>
                </span>
                <div className="howStepContent">
                  <h3 className="howStepTitle" itemProp="name">
                    {step.title}
                  </h3>
                  <p className="howStepDescription" itemProp="text">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="howItWorksCta">
          <Link to="/contact" className="howItWorksCtaBtn">
            Empezar ahora
            <span className="material-icons" aria-hidden="true">arrow_forward</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks
