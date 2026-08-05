/**
 * Contenido del servicio Formación para empresas
 * Partner de formación y cumplimiento en IA (AI Act, FUNDAE, productividad).
 */

export const TRAINING_SEO = {
  title: 'Formación para empresas en IA y AI Act | Metrio Consulting',
  description:
    'Formación empresarial en Inteligencia Artificial, AI Act y cumplimiento. Programas bonificables vía FUNDAE, certificados, presencial o remoto. Metrio Consulting, Valencia.',
  keywords:
    'formación IA empresas, AI Act formación, AI literacy, formación FUNDAE, ChatGPT empresas, Copilot formación, uso responsable IA, Metrio Consulting'
}

/** Fuente oficial Comisión Europea — Ley de IA / AI Act */
export const AI_ACT_URL =
  'https://digital-strategy.ec.europa.eu/es/policies/regulatory-framework-ai'

export const TRAINING_NORMS = [
  {
    id: 'ai-act',
    title: 'AI Act — Reglamento (UE) 2024/1689',
    text: 'Primer marco jurídico europeo sobre IA: riesgos, transparencia, supervisión humana y alfabetización en IA (AI literacy) del personal.',
    href: AI_ACT_URL,
    hrefLabel: 'Ley de IA en la Comisión Europea'
  },
  {
    id: 'rgpd',
    title: 'RGPD y LOPDGDD',
    text: 'Qué datos pueden usarse en herramientas de IA, minimización y confidencialidad en el puesto de trabajo.'
  },
  {
    id: 'fundae',
    title: 'FUNDAE',
    text: 'Orientación sobre formación bonificable: crédito formativo y requisitos según la normativa vigente.'
  }
]

export const TRAINING_BENEFITS = [
  'Equipos preparados para utilizar IA de forma profesional',
  'Formación adaptada a cada departamento',
  'Casos prácticos aplicados al negocio',
  'Certificados individuales de aprovechamiento',
  'Material formativo incluido',
  'Presencial, online en directo o híbrida'
]

/** Métricas de formación y workshops en proyectos reales (acumulado del equipo). */
export const TRAINING_STATS = [
  { value: '2.400+', label: 'Horas de formación impartidas' },
  { value: '850+', label: 'Profesionales formados' },
  { value: '45+', label: 'Empresas acompañadas' },
  { value: '4,9/5', label: 'Valoración media de las sesiones' }
]

export const TRAINING_PROGRAMS = [
  {
    id: 'ia-empresas',
    icon: 'smart_toy',
    title: 'Inteligencia Artificial para Empresas',
    text: 'Utiliza ChatGPT, Copilot, Gemini y otras herramientas de IA para mejorar la productividad con criterio y seguridad.'
  },
  {
    id: 'ai-act',
    icon: 'gavel',
    title: 'AI Act y Uso Responsable de la IA',
    text: 'Formación orientada al uso seguro de la IA y a las obligaciones del Reglamento Europeo de IA (UE) 2024/1689, incluida la AI literacy.'
  },
  {
    id: 'automatizacion',
    icon: 'settings_suggest',
    title: 'Automatización de Procesos',
    text: 'Automatización de tareas con n8n, Power Automate, IA y APIs aplicada a procesos reales de tu organización.'
  },
  {
    id: 'marketing',
    icon: 'campaign',
    title: 'IA aplicada al Marketing',
    text: 'Generación de contenido, SEO, campañas y asistentes inteligentes con supervisión humana y buen criterio.'
  },
  {
    id: 'ventas',
    icon: 'trending_up',
    title: 'IA aplicada a Ventas',
    text: 'Prospección, seguimiento comercial y automatización del proceso de venta sin perder el control del equipo.'
  },
  {
    id: 'bi',
    icon: 'insights',
    title: 'Business Intelligence',
    text: 'Power BI, dashboards y toma de decisiones basada en datos. Formación práctica para adopción real.'
  },
  {
    id: 'personalizada',
    icon: 'tune',
    title: 'Formación personalizada',
    text: 'Diseñamos programas completamente adaptados a tu sector, roles y herramientas internas.'
  }
]

export const TRAINING_MODALITIES = [
  { icon: 'groups', title: 'Presencial', text: 'En vuestras instalaciones o sede acordada. Ideal para workshops y alineación de equipos.' },
  { icon: 'videocam', title: 'Online en directo', text: 'Sesiones remotas interactivas con el mismo nivel de práctica y seguimiento.' },
  { icon: 'hub', title: 'Híbrida', text: 'Combinamos sesiones presenciales y remotas según calendario y sedes.' }
]

export const TRAINING_PACKS = [
  {
    id: 'compliance',
    icon: 'verified_user',
    title: 'AI Compliance Pack',
    text: 'AI Act + política interna de IA + formación de personal + certificados. Enfoque en AI literacy y uso responsable.',
    items: ['AI Act para directivos y empleados', 'Política interna de IA', 'Guía de buenas prácticas', 'Certificados de aprovechamiento']
  },
  {
    id: 'productivity',
    icon: 'bolt',
    title: 'AI Productivity Pack',
    text: 'ChatGPT, Copilot y automatización para empleados. Productividad con criterios de seguridad y datos.',
    items: ['ChatGPT / Copilot / Gemini', 'Casos por departamento', 'Automatizaciones iniciales', 'Material y certificados']
  },
  {
    id: 'executive',
    icon: 'business_center',
    title: 'AI Executive Pack',
    text: 'Formación para dirección y mandos intermedios: criterio estratégico, riesgos, gobernanza y priorización de casos de uso.',
    items: ['IA para CEO y dirección', 'Gobierno de IA', 'Riesgos y supervisión humana', 'Roadmap de adopción']
  },
  {
    id: 'transformation',
    icon: 'rocket_launch',
    title: 'AI Transformation Pack',
    text: 'Consultoría + formación + implantación. La puerta de entrada a proyectos de automatización, BI e IA en producción.',
    items: ['Auditoría de uso actual de IA', 'Formación + implantación', 'Automatizaciones iniciales', 'Acompañamiento continuo']
  }
]

/** Programa estrella: no es un curso suelto, es un proyecto de transformación. */
export const IMPLANTATION_PROGRAM = {
  title: 'Programa de Implantación de IA Empresarial',
  lead:
    'Deja de comprar cursos sueltos. Un proyecto de transformación que combina auditoría, formación, política interna, automatizaciones y asesoramiento sobre el AI Act — con posibilidad de bonificación vía FUNDAE cuando proceda.',
  items: [
    'Auditoría del uso actual de IA',
    'Formación de empleados (AI literacy)',
    'Política interna de IA',
    'Guía de buenas prácticas',
    'Formación de directivos',
    'Automatizaciones iniciales',
    'Certificados de aprovechamiento',
    'Asesoramiento sobre AI Act',
    'Orientación sobre bonificación FUNDAE'
  ]
}

export const COMPLIANCE_AREAS = [
  {
    title: 'AI Act (Reglamento UE 2024/1689)',
    text: 'Obligaciones de AI literacy, uso responsable, transparencia, gestión de riesgos y supervisión humana. Base de nuestros programas de cumplimiento.'
  },
  {
    title: 'RGPD y LOPDGDD',
    text: 'Qué datos se pueden introducir en herramientas de IA, minimización, confidencialidad y riesgos al usar ChatGPT u otros LLM con información de clientes o empleados.'
  },
  {
    title: 'NIS2, DORA e ISO 27001',
    text: 'Formación organizativa en ciberseguridad e IA segura para empresas sujetas a NIS2, sector financiero (DORA) o sistemas de gestión certificados.'
  },
  {
    title: 'ENS y sector público',
    text: 'Concienciación y buenas prácticas para organizaciones que trabajan con Administraciones Públicas bajo el Esquema Nacional de Seguridad.'
  },
  {
    title: 'Propiedad intelectual y contenido generado',
    text: 'Uso de imágenes, texto y código generados por IA: límites, autoría y criterios prácticos para marketing y producto.'
  },
  {
    title: 'Ciberseguridad e ingeniería social',
    text: 'Phishing, deepfakes y fraude impulsados por IA. Formación práctica para reducir el riesgo humano.'
  }
]

export const ACADEMY_CATALOG = [
  {
    category: 'Cumplimiento',
    items: ['AI Act para empresas', 'IA responsable', 'Gobierno de IA', 'Política interna de IA', 'IA y protección de datos']
  },
  {
    category: 'Productividad',
    items: ['ChatGPT para empresas', 'Microsoft Copilot', 'Gemini', 'Uso seguro de LLM']
  },
  {
    category: 'Automatización',
    items: ['n8n', 'Power Automate', 'Make', 'IA + APIs']
  },
  {
    category: 'Datos',
    items: ['Power BI', 'SQL aplicado', 'IA aplicada al BI']
  },
  {
    category: 'Dirección',
    items: ['IA para CEO', 'IA para mandos intermedios', 'IA para equipos comerciales']
  },
  {
    category: 'Marketing y RRHH',
    items: ['SEO y contenido con IA', 'GEO / AEO', 'IA para RRHH', 'Reclutamiento asistido']
  },
  {
    category: 'Desarrollo',
    items: ['GitHub Copilot', 'Cursor', 'Agentes de IA']
  }
]

export const FUNDAE_NOTICE =
  'Metrio Consulting se está asociando como entidad organizadora y formadora en FUNDAE. Muchas de nuestras acciones formativas pueden ser bonificables a través de FUNDAE, lo que permite que las empresas recuperen total o parcialmente el coste de la formación, siempre que cumplan los requisitos establecidos por la normativa vigente y dispongan de crédito formativo. Asesoramos a cada empresa sobre las opciones disponibles y el procedimiento aplicable; la bonificación efectiva depende del crédito disponible y del cumplimiento normativo.'
