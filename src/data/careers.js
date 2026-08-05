/**
 * Posiciones abiertas — Metrio Consulting
 * Foco actual: datos, análisis y Business Intelligence.
 */

export const openPositions = [
  {
    id: 'analista-datos',
    title: 'Analista de Datos',
    department: 'Datos',
    location: 'Valencia · Remoto (España)',
    type: 'Tiempo completo',
    summary:
      'Convertir datos en decisiones: análisis exploratorio, KPIs, reporting y acompañamiento a negocio para que los números se usen de verdad.',
    responsibilities: [
      'Analizar datasets de clientes (ventas, operaciones, marketing, finanzas) y extraer insights accionables',
      'Definir y calcular KPIs, segmentaciones y métricas de seguimiento',
      'Preparar reportes, presentaciones y documentación clara para dirección y equipos',
      'Colaborar con BI e ingeniería en la calidad y la trazabilidad de los datos'
    ],
    requirements: [
      'SQL fluido y experiencia con Excel / Google Sheets a nivel avanzado',
      'Python (pandas) o R para análisis; Power BI o Tableau valorados',
      'Criterio de negocio y comunicación con perfiles no técnicos',
      'Español fluido; inglés valorado'
    ]
  },
  {
    id: 'analista-business-intelligence',
    title: 'Analista de Business Intelligence',
    department: 'Datos',
    location: 'Remoto · España',
    type: 'Tiempo completo',
    summary:
      'Diseñar y mantener dashboards Power BI (y stack afín) que se conviertan en la fuente de verdad del cliente: modelo, DAX, ETL ligero y adopción.',
    responsibilities: [
      'Modelado de datos, medidas DAX/SQL y diseño de dashboards orientados a KPIs',
      'Automatización de reportes, refrescos y calidad de datos',
      'Formación básica a usuarios finales para que el BI se use en el día a día',
      'Trabajo codo a codo con dirección, operaciones y el equipo de consultoría Metrio'
    ],
    requirements: [
      'Power BI (imprescindible) o Tableau / Looker Studio a nivel profesional',
      'SQL y Power Query / ETL; Python valorado',
      'Mentalidad de producto: dashboards que la gente abre cada semana',
      'Autonomía y ganas de ownership en proyectos de cliente'
    ]
  },
  {
    id: 'practicas-analista-datos-bi',
    title: 'Prácticas — Analista de Datos y BI',
    department: 'Talento júnior',
    location: 'Valencia · Remoto parcial',
    type: 'Prácticas · 6 meses',
    summary:
      'Prácticas reales en análisis de datos y Business Intelligence: dashboards, SQL, Excel y apoyo en proyectos de clientes con mentoría senior.',
    responsibilities: [
      'Apoyar en limpieza de datos, consultas SQL y construcción de reportes',
      'Ayudar en dashboards Power BI y documentación de KPIs',
      'Participar en reuniones de proyecto y aprendizaje continuo con el equipo',
      'Investigar herramientas y prototipar análisis bajo supervisión'
    ],
    requirements: [
      'Estudios en ingeniería, informática, matemáticas, estadística, ADE o afín',
      'Base de SQL y Excel; interés fuerte en Power BI / análisis de datos',
      'Ganas de aprender en proyectos reales (no solo ejercicios de clase)',
      'Proactividad y comunicación clara'
    ]
  }
]

export function getJobPostingSchema (position) {
  return {
    '@type': 'JobPosting',
    title: position.title,
    description: `${position.summary} ${position.responsibilities.join(' ')}`,
    datePosted: '2026-08-05',
    validThrough: '2026-12-31',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Metrio Consulting',
      sameAs: 'https://metrio.es',
      url: 'https://metrio.es'
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
    },
    directApply: true,
    url: 'https://metrio.es/trabaja-con-nosotros'
  }
}
