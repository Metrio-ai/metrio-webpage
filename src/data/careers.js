/**
 * Posiciones abiertas — Metrio Consulting
 */

export const openPositions = [
  {
    id: 'consultor-ia-automatizacion',
    title: 'Consultor/a de IA y Automatización',
    department: 'Consultoría',
    location: 'Valencia · Remoto (España)',
    type: 'Tiempo completo',
    summary: 'Diseñar e implementar agentes de IA, copilots y automatizaciones en producción para clientes de sectores variados.',
    responsibilities: [
      'Diagnosticar procesos automatizables y casos de uso de IA con criterio de negocio',
      'Desarrollar agentes, integraciones API y workflows con Python o Node.js',
      'Acompañar al cliente hasta el despliegue y la adopción real'
    ],
    requirements: [
      'Experiencia en Python o JavaScript y APIs REST',
      'Conocimiento práctico de LLMs, prompts o agentes',
      'Capacidad de comunicación con equipos no técnicos'
    ]
  },
  {
    id: 'ingeniero-datos-bi',
    title: 'Ingeniero/a de Datos & Business Intelligence',
    department: 'Datos',
    location: 'Remoto · España',
    type: 'Tiempo completo',
    summary: 'Construir modelos de datos, dashboards Power BI/Tableau y pipelines ETL que se conviertan en la fuente de verdad del negocio.',
    responsibilities: [
      'Modelado de datos, DAX/SQL y diseño de dashboards orientados a KPIs',
      'Automatización de reportes y calidad de datos',
      'Trabajo codo a codo con dirección y operaciones'
    ],
    requirements: [
      'Power BI, Tableau o stack equivalente',
      'SQL y experiencia con ETL (Python, Power Query, etc.)',
      'Mentalidad de producto: dashboards que la gente usa'
    ]
  },
  {
    id: 'desarrollador-fullstack',
    title: 'Desarrollador/a Full Stack',
    department: 'Producto',
    location: 'Valencia · Híbrido',
    type: 'Tiempo completo',
    summary: 'Desarrollar aplicaciones web, APIs e integraciones a medida con React, Node.js o Python para proyectos de producto digital.',
    responsibilities: [
      'Implementar MVPs y evolucionar producto con entregas iterativas',
      'Diseñar APIs e integraciones con sistemas del cliente',
      'Code review, tests y documentación clara'
    ],
    requirements: [
      'React y backend con Node.js o Python',
      'PostgreSQL o MongoDB, Git, Docker básico',
      'Autonomía y ganas de ownership en proyectos'
    ]
  },
  {
    id: 'consultor-transformacion-digital',
    title: 'Consultor/a de Transformación Digital',
    department: 'Estrategia',
    location: 'Remoto · España e internacional',
    type: 'Tiempo completo / Freelance',
    summary: 'Asesorar a empresas en roadmap tecnológico, priorización de inversiones y ejecución de transformación digital con impacto medible.',
    responsibilities: [
      'Auditorías, roadmaps y propuestas con quick wins identificados',
      'Facilitar workshops con dirección y equipos técnicos',
      'Puente entre negocio y ejecución técnica del equipo Metrio'
    ],
    requirements: [
      'Experiencia en consultoría tecnológica o digital',
      'Capacidad analítica y comunicación ejecutiva',
      'Inglés y español fluidos valorados'
    ]
  },
  {
    id: 'practicas-data-ia',
    title: 'Prácticas — Data & IA',
    department: 'Talento júnior',
    location: 'Valencia · Remoto parcial',
    type: 'Prácticas · 6 meses',
    summary: 'Rotación por proyectos reales de BI, automatización e IA aplicada con mentoría de consultores senior.',
    responsibilities: [
      'Apoyar en dashboards, scripts de automatización y documentación',
      'Investigar herramientas y prototipar soluciones',
      'Participar en reuniones de cliente y aprendizaje continuo'
    ],
    requirements: [
      'Estudios en ingeniería, informática, ADE, matemáticas o afín',
      'Ganas de aprender Python, datos o desarrollo web',
      'Proactividad y espíritu emprendedor'
    ]
  }
]

export function getJobPostingSchema (position) {
  return {
    '@type': 'JobPosting',
    title: position.title,
    description: `${position.summary} ${position.responsibilities.join(' ')}`,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Metrio Consulting',
      sameAs: 'https://metrio.es'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Valencia',
        addressCountry: 'ES'
      }
    },
    employmentType: position.type.includes('Prácticas') ? 'INTERN' : 'FULL_TIME',
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'España'
    }
  }
}
