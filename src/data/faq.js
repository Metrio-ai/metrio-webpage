/**
 * Preguntas frecuentes – Metrio Consulting.
 * Contenido optimizado para SEO y schema FAQPage (Google, asistentes de IA).
 */

export const faqItems = [
  {
    id: 'que-servicios-ofrece-metrio',
    question: '¿Qué servicios ofrece Metrio Consulting?',
    answer: 'Metrio ofrece consultoría tecnológica especializada: estrategia y gobernanza de datos, Business Intelligence (dashboards en Power BI, Tableau o soluciones a medida), desarrollo de producto digital, transformación digital, automatización de reportes y generación de bases de datos accionables para prospección B2B con mailing de alta apertura. Todo con un enfoque de tecnología, producto y criterio a largo plazo.'
  },
  {
    id: 'que-es-business-intelligence',
    question: '¿Qué es el Business Intelligence y para qué sirve?',
    answer: 'El Business Intelligence (BI) es el conjunto de procesos, herramientas y datos que permiten transformar la información de tu negocio en indicadores claros y visuales (dashboards, reportes) para tomar decisiones con datos actualizados. Sirve para tener una única fuente de verdad, reducir el tiempo dedicado a “sacar números” y que equipos y dirección trabajen con las mismas métricas y definiciones.'
  },
  {
    id: 'transformacion-digital',
    question: '¿Cómo pueden ayudarme con la transformación digital?',
    answer: 'La transformación digital en Metrio no es solo implantar tecnología: trabajamos contigo en objetivos (qué quieres mejorar y cómo lo mides), procesos y hábitos del equipo, y luego en la selección e implementación de soluciones adecuadas a tu tamaño y cultura. Incluye estrategia de datos, BI, desarrollo de productos digitales y acompañamiento para que el cambio sea sostenible.'
  },
  {
    id: 'herramientas-power-bi-tableau',
    question: '¿Trabajan con Power BI, Tableau u otras herramientas?',
    answer: 'Sí. Utilizamos Power BI, Tableau y, cuando el proyecto lo requiere, soluciones propias o integraciones con Python, Excel y bases de datos. Elegimos la herramienta en función de tu infraestructura, presupuesto y necesidades de visualización, automatización y gobierno de datos.'
  },
  {
    id: 'base-datos-accionable-leads',
    question: '¿Qué significa "base de datos accionable" y "leads cualificados"?',
    answer: 'Una base de datos accionable es una lista de contactos o empresas investigada, actualizada y segmentada según tu perfil de cliente ideal, lista para usar en ventas o marketing. Los leads cualificados son esos contactos que encajan con tu oferta y con los que tiene sentido comunicarte. No compramos listas genéricas: construimos y mantenemos bases útiles para que tu equipo trabaje con mayor tasa de apertura y conversión.'
  },
  {
    id: 'duracion-proyecto-bi',
    question: '¿Cuánto tarda un proyecto típico de BI o desarrollo?',
    answer: 'Depende del alcance: un primer dashboard o automatización de reportes puede estar en unas semanas; una estrategia de datos o un producto digital a medida pueden llevar varios meses. En la primera conversación definimos objetivos, alcance y plazos realistas y te damos una estimación clara antes de comprometerte.'
  },
  {
    id: 'donde-operan',
    question: '¿Trabajan solo en España?',
    answer: 'Nuestra operación principal está en España. Atendemos proyectos en español y, según el caso, en inglés para clientes internacionales. La consultoría, el diseño y el desarrollo se pueden realizar de forma remota con reuniones y seguimiento adaptados a tu zona horaria.'
  },
  {
    id: 'proceso-trabajo',
    question: '¿Cómo es el proceso de trabajo con Metrio?',
    answer: 'Suele comenzar con una conversación para entender tu situación, objetivos y restricciones. A partir de ahí proponemos un alcance, hitos y forma de trabajo (sprints, entregas parciales, reuniones de seguimiento). Priorizamos la comunicación clara, entregas incrementales y que puedas validar resultados sin esperar al final del proyecto.'
  },
  {
    id: 'formacion-o-implementacion',
    question: '¿Ofrecen formación o solo implementación?',
    answer: 'Principalmente implementación y consultoría: diseñamos y construimos soluciones. Cuando el proyecto lo requiere, incluimos sesiones de formación o documentación para que tu equipo pueda mantener y usar dashboards, reportes o herramientas. Si necesitas solo formación sobre BI o datos, lo valoramos según la demanda.'
  },
  {
    id: 'sectores-empresas',
    question: '¿Qué sectores o tamaños de empresa atienden?',
    answer: 'Trabajamos con pymes y empresas de tamaño medio que quieren dar un salto en datos, BI o producto digital, y con equipos de grandes organizaciones que necesitan agilidad y criterio. Los sectores son diversos: retail, servicios, industria, salud, finanzas, etc. Lo importante es que haya alineación en objetivos y forma de trabajar.'
  },
  {
    id: 'presupuesto-y-forma-pago',
    question: '¿Cómo se estructura el presupuesto y la forma de pago?',
    answer: 'El presupuesto se adapta al tipo de proyecto: por proyecto cerrado, por fases o por dedicación. Buscamos acuerdos que encajen con tu ciclo de aprobación y con hitos claros. La forma de pago suele ser por hitos o mensual, según la duración y el alcance. Todo se define antes de empezar.'
  },
  {
    id: 'diferencia-otras-consultoras',
    question: '¿Qué les diferencia de otras consultoras tecnológicas?',
    answer: 'Combinamos experiencia técnica (datos, BI, desarrollo) con enfoque de producto y comunicación directa. No vendemos horas sin criterio: priorizamos objetivos claros, soluciones que se usen de verdad y un trato cercano. Nuestro lema es tecnología, producto y criterio, y lo aplicamos en cada proyecto desde 2024.'
  }
]

/**
 * Para schema.org FAQPage (JSON-LD)
 */
export function getFaqSchema () {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  }
}
