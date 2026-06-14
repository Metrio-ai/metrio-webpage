import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../src/data/faqs')

const faq = (id, question, answer) => ({ id, question, answer })

const servicesFaqs = [
  faq('svc-ia-que-es', '¿Qué incluye el servicio de implementación de IA de Metrio?', 'Incluye diagnóstico de casos de uso, diseño de arquitectura, desarrollo de agentes o copilots, integración con tus sistemas (CRM, ERP, documentación) y despliegue en producción con métricas de impacto.'),
  faq('svc-ia-casos', '¿Qué casos de uso de IA implementan con más frecuencia?', 'Agentes de atención interna, clasificación de documentos, extracción de datos de PDFs, copilots para equipos comerciales, resúmenes automáticos y asistentes conectados a bases de conocimiento.'),
  faq('svc-ia-seguridad', '¿Cómo gestionan la seguridad y privacidad en proyectos de IA?', 'Definimos qué datos entran al modelo, dónde se alojan, controles de acceso y cumplimiento según tu sector. Priorizamos soluciones que respeten confidencialidad y trazabilidad.'),
  faq('svc-ia-llm', '¿Trabajan con modelos propios o de terceros?', 'Elegimos según el caso: APIs comerciales, modelos open source o híbridos. Lo importante es el encaje con tu operación, coste y requisitos de privacidad.'),
  faq('svc-ia-tiempo', '¿Cuánto tarda un proyecto de IA desde cero?', 'Un quick win puede estar en 2–4 semanas. Proyectos con integraciones complejas suelen ir de 6 a 12 semanas con entregas iterativas.'),
  faq('svc-ia-mantenimiento', '¿Ofrecen mantenimiento tras desplegar un agente de IA?', 'Sí. Podemos acompañar con monitorización, ajustes de prompts, nuevas fuentes de datos y evolución del agente según feedback real de usuarios.'),
  faq('svc-auto-que', '¿Qué procesos se pueden automatizar con Metrio?', 'Reportes recurrentes, conciliaciones, ETL entre sistemas, alertas por umbrales, flujos de aprobación, envío de emails segmentados y tareas de copiar-pegar entre herramientas.'),
  faq('svc-auto-roi', '¿Cómo se mide el ROI de una automatización?', 'Comparamos horas ahorradas, errores evitados y tiempo de ciclo antes y después. Definimos KPIs en el diagnóstico para demostrar impacto en semanas, no meses.'),
  faq('svc-auto-herramientas', '¿Qué tecnologías usan para automatización?', 'Python, Node.js, APIs REST, webhooks, Power Automate cuando encaja, scripts programados y pipelines de datos con PostgreSQL o MongoDB.'),
  faq('svc-auto-excel', '¿Pueden automatizar procesos que hoy viven en Excel?', 'Sí. Es uno de los casos más frecuentes: consolidación de hojas, reportes semanales, validaciones cruzadas y conexión con fuentes centralizadas.'),
  faq('svc-auto-integraciones', '¿Integran herramientas que ya usamos?', 'Sí. Conectamos CRM, ERP, hojas de cálculo, bases de datos, email y herramientas SaaS mediante APIs o conectores a medida.'),
  faq('svc-auto-soporte', '¿Qué pasa si cambia un sistema externo?', 'Diseñamos automatizaciones mantenibles. Si hay cambios, podemos adaptar el flujo con acuerdos de soporte o bolsa de horas.'),
  faq('svc-bi-powerbi', '¿Implementan dashboards en Power BI?', 'Sí. Modelado de datos, DAX, refrescos automáticos, RLS por rol y dashboards orientados a negocio que la dirección usa de verdad.'),
  faq('svc-bi-tableau', '¿También trabajan con Tableau?', 'Sí. Tableau y Power BI según tu licencia, infraestructura y perfil de usuarios. Elegimos la herramienta en el diagnóstico.'),
  faq('svc-bi-fuente', '¿Qué es una fuente única de verdad y por qué importa?', 'Es un modelo de datos centralizado donde todos los equipos consultan las mismas métricas con las mismas definiciones. Evita discusiones por cifras que no cuadran.'),
  faq('svc-bi-kpis', '¿Ayudan a definir KPIs?', 'Sí. Partimos de objetivos de negocio, traducimos a indicadores medibles y diseñamos dashboards que respondan preguntas concretas de dirección y operaciones.'),
  faq('svc-bi-datos-sucios', '¿Qué hacen si nuestros datos están desordenados?', 'Es habitual. Incluimos limpieza, estandarización y reglas de calidad antes o durante el proyecto de BI para que los dashboards sean fiables.'),
  faq('svc-bi-formacion', '¿Forman al equipo en el uso de dashboards?', 'Cuando el proyecto lo requiere, incluimos sesiones de uso, documentación y buenas prácticas para que el BI se adopte internamente.'),
  faq('svc-asesoria-roadmap', '¿Qué entregables incluye la asesoría tecnológica?', 'Auditoría de sistemas, roadmap priorizado, arquitectura recomendada, quick wins identificados y, si lo acordáis, acompañamiento hasta la ejecución.'),
  faq('svc-asesoria-proveedores', '¿Ayudan a elegir proveedores o herramientas?', 'Sí. Evaluamos opciones con criterio de negocio, coste total, integración y capacidad de tu equipo. Sin comisiones de vendor: criterio independiente.'),
  faq('svc-asesoria-transformacion', '¿Qué significa transformación digital en Metrio?', 'Alinear procesos, datos, personas y tecnología con objetivos medibles. No es comprar software: es cambiar cómo opera el negocio con apoyo técnico.'),
  faq('svc-asesoria-pymes', '¿Trabajan con pymes o solo grandes empresas?', 'Con ambas. Adaptamos alcance y ritmo al tamaño del equipo y al presupuesto, manteniendo entregables útiles desde las primeras semanas.'),
  faq('svc-producto-mvp', '¿Cuánto tarda un MVP de producto digital?', 'Depende del alcance. MVPs acotados pueden estar en 4–8 semanas con entregas quincenales y stack moderna (React, Node, Python, PostgreSQL).'),
  faq('svc-producto-stack', '¿Qué stack usan para desarrollo a medida?', 'React en frontend, Node.js o Python en backend, PostgreSQL o MongoDB, Docker para despliegue. Elegimos según requisitos de escala y equipo.'),
  faq('svc-producto-api', '¿Desarrollan APIs e integraciones?', 'Sí. APIs REST, webhooks, conectores con terceros y microservicios cuando el proyecto lo justifica.'),
  faq('svc-producto-mantenimiento-dev', '¿Ofrecen mantenimiento de software desarrollado?', 'Sí, con acuerdos de evolución, corrección de incidencias y nuevas funcionalidades según prioridad de negocio.'),
  faq('svc-leads-b2b', '¿Qué son los leads cualificados de Metrio?', 'Contactos investigados y segmentados según tu perfil de cliente ideal, listos para prospección B2B con mayor tasa de apertura que listas genéricas.'),
  faq('svc-leads-apertura', '¿Qué tasa de apertura consiguen en campañas?', 'Depende del sector y mensaje, pero trabajamos bases accionables que superan ampliamente el 40% de apertura frente a listas compradas.'),
  faq('svc-leads-segmentacion', '¿Cómo segmentan las bases de datos?', 'Por sector, tamaño, rol, geografía y encaje con tu oferta. No enviamos a ciegas: cada segmento tiene criterio comercial.'),
  faq('svc-leads-rgpd', '¿Cumplen RGPD en prospección B2B?', 'Trabajamos con criterios de interés legítimo B2B, datos públicos o verificados y buenas prácticas de comunicación comercial conforme a normativa.'),
  faq('svc-proceso-inicio', '¿Cómo empieza un proyecto con Metrio?', 'Con una llamada de descubrimiento gratuita. Entendemos objetivos, contexto y restricciones. Luego proponemos alcance, plan y presupuesto.'),
  faq('svc-proceso-remoto', '¿Trabajan en remoto?', 'Sí. La mayoría de proyectos son remotos con reuniones por videollamada. Presencial en Valencia u otras ciudades cuando el proyecto lo requiere.'),
  faq('svc-proceso-comunicacion', '¿Con qué frecuencia hay seguimiento?', 'Acordamos ritmo en la propuesta: weeklys, demos quincenales o checkpoints por hito. Comunicación directa, sin capas innecesarias.'),
  faq('svc-proceso-equipo', '¿Quién trabaja en mi proyecto?', 'Consultores e ingenieros de Metrio con perfil mixto negocio-tecnología. Un interlocutor principal y especialistas según el área (datos, IA, producto).'),
  faq('svc-precio-modelo', '¿Cómo se estructura el precio?', 'Por proyecto cerrado, por fases o por dedicación mensual. Siempre con alcance y hitos definidos antes de empezar.'),
  faq('svc-precio-minimo', '¿Hay un proyecto mínimo?', 'Depende del tipo de trabajo. Quick wins de automatización o BI pueden empezar en rangos accesibles; proyectos completos se dimensionan en la propuesta.'),
  faq('svc-sectores', '¿En qué sectores tienen experiencia?', 'Retail, salud, legaltech, marketing, industria, servicios profesionales, ecommerce y startups tech, entre otros.'),
  faq('svc-internacional', '¿Trabajan con clientes fuera de España?', 'Sí. Proyectos en español e inglés para clientes internacionales, principalmente en remoto.'),
  faq('svc-valencia', '¿Dónde está Metrio Consulting?', 'Sede en Valencia, España. Atendemos clientes en toda España e internacionalmente.'),
  faq('svc-diferencia', '¿Qué diferencia a Metrio de otras consultoras?', 'Ejecutamos en producción, no solo informes. Equipo joven con mentalidad emprendedora, comunicación directa y respuesta en 48 horas.'),
  faq('svc-garantia', '¿Qué pasa si el proyecto no cumple expectativas?', 'Trabajamos por hitos con validación en cada entrega. Si algo no encaja, iteramos antes de avanzar. Transparencia desde el primer día.'),
  faq('svc-contrato', '¿Firmáis NDA y contratos de confidencialidad?', 'Sí. Podemos firmar NDA antes de compartir información sensible. Contratos con alcance, plazos y propiedad intelectual definidos.'),
  faq('svc-plazo-respuesta', '¿Cuánto tardáis en responder a una consulta?', 'Habitualmente menos de 48 horas laborables tras recibir tu mensaje o reservar llamada.')
]

const aboutFaqs = [
  faq('abt-quien', '¿Quién es Metrio Consulting?', 'Consultora tecnológica con sede en Valencia. Equipo joven de consultores e ingenieros con espíritu emprendedor que implementa IA, automatización, BI y transformación digital.'),
  faq('abt-historia', '¿Cuál es la historia de Metrio?', 'Nació en Valencia con la convicción de que la tecnología debe llegar a producción. De emprendedores que resolvían problemas reales de datos e ingeniería a consultora con 150+ proyectos.'),
  faq('abt-anos', '¿Cuántos años de experiencia tiene el equipo?', 'Más de cinco años llevando proyectos de datos, IA, automatización y BI, con más de 150 entregas en España e internacional.'),
  faq('abt-valencia', '¿Por qué Valencia?', 'Valencia es nuestra base: ecosistema emprendedor, talento tech y calidad de vida. Desde aquí servimos a toda España y clientes internacionales.'),
  faq('abt-espiritu', '¿Qué significa espíritu emprendedor en Metrio?', 'Ownership, velocidad, iteración y foco en resultados. Pensamos como quien construye negocio, no como consultores que solo presentan slides.'),
  faq('abt-joven', '¿Sois un equipo joven?', 'Sí. Equipo joven, ágil y con mentalidad de fundadores: curiosos, exigentes y obsesionados con entregar valor real en cada proyecto.'),
  faq('abt-ejecutar', '¿Por qué decís que ejecutáis y no solo recomendáis?', 'Porque nuestros entregables son agentes en producción, dashboards en uso, automatizaciones activas y software desplegado — no informes que nadie implementa.'),
  faq('abt-proyectos', '¿Cuántos proyectos habéis completado?', 'Más de 150 proyectos entregados con impacto medible en automatización, datos, IA y producto digital.'),
  faq('abt-clientes-tipo', '¿Con qué tipo de clientes trabajáis?', 'Pymes, scale-ups y equipos de dirección en empresas consolidadas. Sectores diversos: retail, salud, legal, marketing, industria.'),
  faq('abt-internacional', '¿Tenéis clientes internacionales?', 'Sí. Además de España, desarrollamos proyectos para clientes internacionales en remoto, en español e inglés.'),
  faq('abt-remoto', '¿Trabajáis solo presencial?', 'No. La mayoría de proyectos son remotos. Presencial cuando aporta valor: workshops, kick-offs o sesiones de alineación.'),
  faq('abt-valores', '¿Cuáles son vuestros valores?', 'Ejecución, transparencia, criterio de negocio, comunicación directa y cero humo. Tecnología al servicio de resultados medibles.'),
  faq('abt-equipo-perfil', '¿Qué perfiles tiene el equipo?', 'Consultores e ingenieros con perfil mixto: estrategia, datos, desarrollo, IA y producto. Hablan el idioma de negocio y el técnico.'),
  faq('abt-fundacion', '¿Cuándo se fundó Metrio?', 'Metrio Consulting como marca consolidada desde 2024, con años previos de experiencia acumulada del equipo en proyectos de datos e ingeniería.'),
  faq('abt-mision', '¿Cuál es la misión de Metrio?', 'Ayudar a empresas a convertir datos, IA y automatización en decisiones y operaciones más eficientes, con soluciones que funcionan en producción.'),
  faq('abt-vision', '¿Cuál es la visión?', 'Ser la consultora tecnológica de referencia para empresas que quieren resultados reales, no promesas vacías de transformación digital.'),
  faq('abt-cultura', '¿Cómo es la cultura interna?', 'Colaborativa, orientada a entregas, con autonomía y responsabilidad. Cercana al cliente, sin burocracia innecesaria.'),
  faq('abt-diferencia', '¿Qué os diferencia de consultoras grandes?', 'Agilidad, trato directo, sin capas de gestión. Mismo equipo desde el diagnóstico hasta la entrega. Precio y plazo realistas.'),
  faq('abt-startups', '¿Trabajáis con startups?', 'Sí. Startups en crecimiento que necesitan MVP, automatización o BI sin montar un departamento de datos completo.'),
  faq('abt-enterprise', '¿Trabajáis con grandes empresas?', 'Sí. Equipos internos que necesitan capacidad extra, criterio externo o ejecución rápida en proyectos concretos.'),
  faq('abt-partners', '¿Tenéis partners tecnológicos?', 'Trabajamos con el ecosistema Microsoft, open source y SaaS según el proyecto. Sin ataduras comerciales a un vendor concreto.'),
  faq('abt-open-source', '¿Contribuís a open source?', 'Cuando el proyecto lo permite, usamos y contribuimos a herramientas open source. También estamos en GitHub como Metrio-ai.'),
  faq('abt-linkedin', '¿Dónde puedo seguiros?', 'LinkedIn: Metrio Consulting. GitHub: Metrio-ai. Web: metrio.es y blog con artículos y casos de éxito.'),
  faq('abt-idiomas', '¿En qué idiomas trabajáis?', 'Español e inglés. Documentación y comunicación adaptadas al idioma del cliente y del equipo.'),
  faq('abt-respuesta', '¿Cuánto tardáis en responder?', 'Menos de 48 horas laborables en consultas nuevas. Comunicación ágil durante proyectos activos.'),
  faq('abt-llamada', '¿La primera llamada tiene coste?', 'No. La llamada de descubrimiento es gratuita y sin compromiso para entender tu reto y ver encaje.'),
  faq('abt-honestidad', '¿Decís que no a proyectos?', 'Sí. Si no somos el partner adecuado o el timing no encaja, lo decimos con honestidad. Preferimos encaje real a vender por vender.'),
  faq('abt-humo', '¿Qué significa "sin humo"?', 'Sin promesas exageradas de IA, sin dashboards que nadie mira, sin roadmaps imposibles. Realismo, hitos y métricas desde el día uno.'),
  faq('abt-metodologia', '¿Tenéis metodología propia?', 'Combinamos diagnóstico, roadmap, sprints de entrega y validación continua. Flexible según tamaño de cliente y tipo de proyecto.'),
  faq('abt-calidad', '¿Cómo garantizáis calidad?', 'Code review, pruebas, documentación, entregas incrementales y validación contigo antes de cerrar cada hito.'),
  faq('abt-confidencialidad', '¿Cómo tratáis la confidencialidad?', 'NDA disponible. Acceso mínimo necesario a datos. Buenas prácticas de seguridad en proyectos con información sensible.'),
  faq('abt-sostenibilidad', '¿Pensáis en sostenibilidad del proyecto?', 'Sí. Diseñamos soluciones que vuestro equipo pueda mantener o evolucionar, con documentación y transferencia de conocimiento.'),
  faq('abt-formacion-interna', '¿Formáis equipos internos?', 'Cuando el proyecto lo incluye, transferimos conocimiento para que mantengáis dashboards, flujos o herramientas sin dependencia total.'),
  faq('abt-innovacion', '¿Cómo os mantenéis actualizados en IA?', 'Formación continua, experimentación interna y aplicación pragmática en proyectos reales. IA útil, no moda.'),
  faq('abt-comunidad', '¿Colaboráis con el ecosistema valenciano?', 'Sí. Parte del tejido emprendedor y tech de Valencia, con proyectos locales e internacionales.'),
  faq('abt- remoto-hibrido', '¿Ofrecéis modelo híbrido?', 'Sí. Remoto por defecto, presencial puntual para workshops o kick-offs según acuerdo con el cliente.'),
  faq('abt-crecimiento', '¿Metrio está creciendo?', 'Sí, de forma sostenida, ampliando clientes y capacidades en IA, automatización y producto digital sin perder trato cercano.'),
  faq('abt-trabajar-metrio', '¿Se puede trabajar en Metrio?', 'Si buscamos talento, lo publicamos en LinkedIn. Perfil emprendedor, ganas de ejecutar y criterio técnico.'),
  faq('abt-referencias', '¿Podéis dar referencias de clientes?', 'En la web hay casos publicados. Referencias directas se coordinan con clientes que autorizan contacto.'),
  faq('abt-premios', '¿Tenéis reconocimientos?', 'Nuestro foco está en resultados de clientes medibles, no en premios. 150+ proyectos entregados hablan por nosotros.'),
  faq('abt-futuro', '¿Hacia dónde va Metrio?', 'Más IA aplicada, más automatización inteligente y más producto digital — siempre con el mismo ADN: ejecutar con impacto real.')
]

// fix typo in id
aboutFaqs.find(f => f.id === 'abt- remoto-hibrido').id = 'abt-remoto-hibrido'

const contactFaqs = [
  faq('cnt-como', '¿Cómo contacto con Metrio Consulting?', 'Reserva una llamada en metrio.es/contact o escríbenos a hola@metrio.es. Respondemos en menos de 48 horas laborables.'),
  faq('cnt-llamada', '¿Cómo reservo una llamada de descubrimiento?', 'En la página de contacto elige "Reservar llamada" y selecciona hueco en el calendario online. Duración habitual: 30 minutos.'),
  faq('cnt-gratis', '¿La llamada inicial es gratuita?', 'Sí. Sin compromiso. Sirve para entender tu reto, contexto y ver si hay encaje.'),
  faq('cnt-email', '¿Cuál es el email de contacto?', 'hola@metrio.es'),
  faq('cnt-respuesta', '¿Cuánto tardáis en responder un email?', 'Menos de 48 horas laborables. Consultas urgentes: indícalo en el asunto.'),
  faq('cnt-telefono', '¿Tenéis teléfono de contacto?', 'El canal principal es email y calendario online. Tras la primera conversación compartimos contacto directo si procede.'),
  faq('cnt-formulario', '¿Qué datos pide el formulario de contacto?', 'Empresa, nombre, asunto y mensaje. Con eso preparamos mejor la primera conversación.'),
  faq('cnt-idioma', '¿Puedo escribir en inglés?', 'Sí. Atendemos en español e inglés.'),
  faq('cnt-horario', '¿Cuál es vuestro horario de atención?', 'Horario laboral europeo (CET/CEST). El calendario muestra huecos disponibles en tu zona horaria.'),
  faq('cnt-urgente', '¿Atendéis consultas urgentes?', 'Indica urgencia en el mensaje. Valoramos casos con deadline cercano según disponibilidad del equipo.'),
  faq('cnt-presupuesto', '¿Puedo pedir presupuesto sin llamada?', 'Puedes describir el proyecto por email. Para presupuesto ajustado, una llamada corta suele ser más eficiente.'),
  faq('cnt-nda', '¿Puedo enviar información confidencial?', 'Sí. Podemos firmar NDA antes si lo necesitas. Usa email seguro o canal acordado.'),
  faq('cnt-reunion-presencial', '¿Podemos reunirnos en persona?', 'Sí en Valencia u otras ciudades si el proyecto lo justifica. Lo habitual es remoto en la primera fase.'),
  faq('cnt-zona-horaria', '¿Trabajáis con otras zonas horarias?', 'Sí. Adaptamos reuniones para clientes internacionales en horarios razonables.'),
  faq('cnt-despues-formulario', '¿Qué pasa después de enviar el formulario?', 'Abrimos tu cliente de email con el mensaje preparado. También puedes escribir directamente a hola@metrio.es.'),
  faq('cnt-calendario-no-carga', '¿Qué hago si no carga el calendario?', 'Escríbenos a hola@metrio.es con tu disponibilidad y te proponemos huecos manualmente.'),
  faq('cnt-cancelar-cita', '¿Puedo cancelar o reprogramar la llamada?', 'Sí desde el enlace de confirmación del calendario o escribiéndonos con antelación.'),
  faq('cnt-duracion-llamada', '¿Cuánto dura la llamada de descubrimiento?', 'Unos 30 minutos. Suficiente para entender objetivos y siguientes pasos.'),
  faq('cnt-preparacion', '¿Debo preparar algo para la llamada?', 'Ayuda tener claro el reto, sistemas actuales y plazos aproximados. No hace falta documentación formal.'),
  faq('cnt-varios-proyectos', '¿Puedo consultar por varios proyectos a la vez?', 'Sí. Los priorizamos juntos en la llamada o por email.'),
  faq('cnt-partnership', '¿Aceptáis propuestas de partnership?', 'Sí. Escríbenos describiendo el encaje. Revisamos colaboraciones con agencias, integradores y startups.'),
  faq('cnt-prensa', '¿Hay contacto de prensa?', 'Para prensa y medios: hola@metrio.es con asunto "Prensa".'),
  faq('cnt-trabajo', '¿Dónde envío candidaturas?', 'LinkedIn o hola@metrio.es con asunto "Talento" y tu perfil.'),
  faq('cnt-facturacion', '¿Contacto para facturación?', 'Clientes activos: usa el canal acordado en contrato. Nuevos: hola@metrio.es.'),
  faq('cnt-soporte', '¿Tenéis soporte post-proyecto?', 'Sí, según acuerdo de mantenimiento. Contacto por email o canal dedicado del proyecto.'),
  faq('cnt-rgpd', '¿Cómo tratáis mis datos de contacto?', 'Solo para responder tu consulta y seguimiento comercial legítimo. Sin cesión a terceros.'),
  faq('cnt-spam', '¿Enviáis newsletters?', 'No spam. Comunicación relevante solo si hay relación comercial o lo solicitas.'),
  faq('cnt-linkedin', '¿Puedo contactar por LinkedIn?', 'Sí, aunque email o calendario suelen ser más rápidos para propuestas concretas.'),
  faq('cnt-referido', '¿Puedo ser referido por un cliente?', 'Sí. Menciona quién te recomienda en el mensaje.'),
  faq('cnt-sector', '¿Debo indicar mi sector?', 'Ayuda pero no es obligatorio. Acelera entender encaje y casos similares.'),
  faq('cnt-presupuesto-rango', '¿Debo decir mi presupuesto?', 'Opcional. Si lo compartes, la propuesta encaja mejor desde el inicio.'),
  faq('cnt-propuesta-plazo', '¿Cuándo recibo propuesta tras la llamada?', 'Habitualmente en días laborables siguientes, según complejidad del alcance.'),
  faq('cnt-varias-personas', '¿Puedo incluir a mi equipo en la llamada?', 'Sí. Recomendamos incluir a quien tome decisiones o conozca el proceso.'),
  faq('cnt-grabacion', '¿Grabáis las reuniones?', 'Solo si lo acordamos. Normalmente compartimos notas o acta.'),
  faq('cnt-demo', '¿Hacéis demos en la primera llamada?', 'Si aplica, mostramos ejemplos genéricos. Demos a medida van en fase de propuesta.'),
  faq('cnt-no-respuesta', '¿Y si no recibo respuesta?', 'Revisa spam o reenvía a hola@metrio.es. Respondemos a todos los mensajes legítimos.'),
  faq('cnt-whatsapp', '¿Usáis WhatsApp?', 'Canal principal email y calendario. WhatsApp solo para clientes activos si se acuerda.'),
  faq('cnt-visita-oficina', '¿Puedo visitar la oficina?', 'Trabajo flexible con base en Valencia. Visitas bajo cita previa.'),
  faq('cnt-eventos', '¿Estáis en eventos o ferias?', 'Lo anunciamos en LinkedIn. Puedes pedir reunión en evento por email.'),
  faq('cnt-consulta-gratuita-limite', '¿Hay límite en consultas gratuitas?', 'La llamada de descubrimiento es gratuita. Consultoría profunda entra en propuesta de proyecto.'),
  faq('cnt-escribirnos-tab', '¿Qué es la pestaña Escribirnos?', 'Formulario alternativo al calendario para enviar mensaje por email sin reservar hueco.')
]

const clientsFaqs = [
  faq('cli-quienes', '¿Quiénes son clientes de Metrio?', 'Empresas de retail, salud, legaltech, marketing e industria: Censalia, PureTea, Bess Skin Health, Diligenz, Luanvi, Listing Boost y más.'),
  faq('cli-sectores', '¿En qué sectores habéis trabajado?', 'Retail, ecommerce, salud y bienestar, servicios profesionales, marketing digital, legaltech e industria.'),
  faq('cli-tamano', '¿Qué tamaño tienen vuestros clientes?', 'Desde startups hasta empresas consolidadas. Lo clave es alineación en objetivos, no solo tamaño.'),
  faq('cli-confidencial', '¿Por qué no aparecen todos los clientes?', 'Algunos prefieren confidencialidad. Publicamos casos con autorización y datos agregados.'),
  faq('cli-casos', '¿Dónde veo casos de éxito?', 'En metrio.es/clientes (clic en cada logo) y en el blog con filtro casos de éxito.'),
  faq('cli-resultados', '¿Qué resultados conseguís?', 'Horas ahorradas, dashboards adoptados, agentes IA en uso, automatizaciones activas y mejoras medibles en KPIs acordados.'),
  faq('cli-testimonios', '¿Hay testimonios?', 'Resúmenes en fichas de clientes y artículos de casos en el blog. Referencias directas bajo petición.'),
  faq('cli-proceso-onboarding', '¿Cómo es el onboarding de un nuevo cliente?', 'Kick-off, accesos, canal de comunicación, hitos y ritmo de entregas definidos en la primera semana.'),
  faq('cli-duracion-media', '¿Cuánto dura un proyecto típico con clientes?', 'De semanas (quick wins) a varios meses (transformación completa), con entregas parciales.'),
  faq('cli-remoto-clientes', '¿Vuestros clientes trabajan en remoto con vosotros?', 'Sí, la mayoría. Reuniones online y entregas digitales. Presencial puntual si aporta.'),
  faq('cli-internacional', '¿Tenéis clientes fuera de España?', 'Sí. Proyectos internacionales en remoto, especialmente en IA, automatización y producto digital.'),
  faq('cli-referencias', '¿Puedo hablar con un cliente vuestro?', 'Coordinamos referencias cuando el cliente autoriza contacto.'),
  faq('cli-indicadores', '¿Qué KPIs mejoráis más a menudo?', 'Tiempo operativo, calidad de datos, adopción de dashboards, tasa de automatización y satisfacción de usuarios internos.'),
  faq('cli-ia-clientes', '¿Qué clientes usan IA de Metrio?', 'Varios en agentes internos, clasificación documental y copilots. Detalle en casos publicados con permiso.'),
  faq('cli-bi-clientes', '¿Qué clientes usan BI?', 'Proyectos Power BI y Tableau en operaciones, finanzas y dirección. Casos en blog y ficha de clientes.'),
  faq('cli-startup', '¿Tenéis clientes startup?', 'Sí. MVPs, automatización temprana y BI ligero para equipos que escalan.'),
  faq('cli-enterprise', '¿Trabajáis con grandes cuentas?', 'Sí, en proyectos acotados o refuerzo de equipos internos.'),
  faq('cli-ret repeticion', '¿Los clientes repiten?', 'Sí. Muchos amplían alcance tras el primer proyecto exitoso: fases 2, nuevos departamentos o productos.'),
  faq('cli-seleccion', '¿Cómo seleccionáis clientes?', 'Buscamos encaje en objetivos, disponibilidad para colaborar y realismo en plazos y expectativas.'),
  faq('cli-no-encaja', '¿Rechazáis algún proyecto?', 'Si no podemos aportar valor o el timing no cuadra, lo decimos con transparencia.'),
  faq('cli-publicar-logo', '¿Puedo aparecer en vuestra web de clientes?', 'Opcional. Muchos clientes autorizan logo y resumen; otros prefieren anonimato parcial.'),
  faq('cli-datos-caso', '¿Qué información mostráis de cada caso?', 'Sector, reto, solución y resultados agregados. Sin datos sensibles ni cifras confidenciales sin permiso.'),
  faq('cli-modal', '¿Qué pasa al hacer clic en un cliente?', 'Se abre un modal con resumen del proyecto, sector y enlace a la web del cliente si existe.'),
  faq('cli-nuevos', '¿Aceptáis nuevos clientes ahora?', 'Sí. Consulta disponibilidad en la llamada de descubrimiento.'),
  faq('cli-competencia', '¿Trabajáis con competidores del mismo sector?', 'Valoramos conflictos de interés. Lo hablamos en el primer contacto.'),
  faq('cli-sla', '¿Ofrecéis SLA a clientes?', 'Según contrato de mantenimiento. En proyectos de implementación definimos tiempos de respuesta.'),
  faq('cli-facturacion-cliente', '¿Cómo facturáis?', 'Por hitos o mensual según acuerdo. Factura española con IVA cuando aplica.'),
  faq('cli-exito-metrica', '¿Cómo definís éxito con un cliente?', 'KPIs acordados en kick-off: adopción, ahorro de tiempo, calidad de datos o objetivos de negocio concretos.'),
  faq('cli-comunicacion', '¿Cómo es la comunicación durante el proyecto?', 'Canal acordado (email, Slack, Teams), reuniones periódicas y demos de avance.'),
  faq('cli-cambio-scope', '¿Qué pasa si cambia el alcance?', 'Lo gestionamos con change request transparente: impacto en plazo y presupuesto antes de seguir.'),
  faq('cli-handover', '¿Hacéis handover al final?', 'Sí. Documentación, formación y transferencia para que el cliente opere la solución.'),
  faq('cli-soporte-post', '¿Hay soporte tras el cierre del proyecto?', 'Opcional con acuerdo de mantenimiento o bolsa de horas.'),
  faq('cli-partners-cliente', '¿Colaboráis con equipos internos del cliente?', 'Sí. Modelo codo a codo con IT, datos, operaciones o dirección.'),
  faq('cli-agencias', '¿Trabajáis como subcontrata de agencias?', 'Sí en proyectos técnicos de datos, IA o desarrollo cuando hay encaje.'),
  faq('cli-inversores', '¿Presentáis resultados a inversores o board?', 'Podemos preparar métricas e informes ejecutivos si el proyecto lo requiere.'),
  faq('cli-retail', '¿Experiencia en retail?', 'Sí. Dashboards, automatización de reporting y datos de ventas/inventario.'),
  faq('cli-salud', '¿Experiencia en salud y wellness?', 'Sí. Proyectos con sensibilidad de datos y procesos operativos del sector.'),
  faq('cli-legal', '¿Experiencia en legaltech?', 'Sí. Automatización documental, clasificación y flujos para despachos y legaltech.'),
  faq('cli-marketing', '¿Experiencia en marketing digital?', 'Sí. Datos de campañas, leads cualificados y automatización de reporting.'),
  faq('cli-proximo', '¿Cómo ser el próximo cliente?', 'Reserva llamada en metrio.es/contact o escribe a hola@metrio.es.')
]

clientsFaqs.find(f => f.id === 'cli-ret repeticion').id = 'cli-repeticion'
clientsFaqs.find(f => f.id === 'cli-retail') // ok

const blogFaqs = [
  faq('blog-que', '¿Qué encontraré en el blog de Metrio?', 'Artículos sobre IA, automatización, BI, Power BI, KPIs, transformación digital y casos de éxito reales.'),
  faq('blog-frecuencia', '¿Con qué frecuencia publicáis?', 'Publicamos de forma regular cuando hay contenido útil: guías, comparativas y casos con aprendizajes accionables.'),
  faq('blog-autor', '¿Quién escribe los artículos?', 'El equipo de Metrio: consultores e ingenieros con experiencia en proyectos reales.'),
  faq('blog-casos', '¿Qué son los casos de éxito en el blog?', 'Historias de proyectos con reto, solución y resultados. Filtro "casos de éxito" en metrio.es/blog.'),
  faq('blog-suscribir', '¿Hay newsletter?', 'Puedes contactarnos para recibir novedades. No hacemos spam.'),
  faq('blog-compartir', '¿Puedo compartir vuestros artículos?', 'Sí, con enlace a la fuente original en metrio.es.'),
  faq('blog-citar', '¿Cómo citar un artículo?', 'Incluye título, Metrio Consulting, URL y fecha de publicación.'),
  faq('blog-temas', '¿Qué temas cubrís?', 'IA empresarial, agentes, automatización, Power BI vs Tableau, KPIs, calidad de datos, producto digital y leads B2B.'),
  faq('blog-nivel', '¿Para qué nivel técnico están escritos?', 'Para dirección, operaciones y equipos técnicos. Lenguaje claro sin simplificar en exceso.'),
  faq('blog-guest', '¿Aceptáis guest posts?', 'Ocasionalmente colaboraciones alineadas. Propón tema a hola@metrio.es.'),
  faq('blog-imagenes', '¿Las imágenes son libres?', 'Imágenes propias o con licencia adecuada. No reutilizar sin permiso.'),
  faq('blog-actualizar', '¿Actualizáis artículos antiguos?', 'Sí cuando cambia contexto (herramientas, normativa, mejores prácticas).'),
  faq('blog-comentarios', '¿Hay comentarios en el blog?', 'Contacto por email o LinkedIn. Preferimos conversación directa.'),
  faq('blog-rss', '¿Tenéis RSS?', 'Puedes seguir novedades vía web y LinkedIn de Metrio Consulting.'),
  faq('blog-seo', '¿Los artículos están optimizados para buscadores?', 'Sí. Estructura clara, datos útiles y enfoque en preguntas reales de empresas.'),
  faq('blog-aeo', '¿El blog ayuda a asistentes de IA?', 'Sí. Contenido estructurado, FAQs y casos que responden preguntas concretas sobre consultoría tech.'),
  faq('blog-leer-primero', '¿Por dónde empiezo a leer?', 'Artículos de implementación de IA y automatización si estás explorando. Casos de éxito si quieres pruebas.'),
  faq('blog-powerbi', '¿Hay contenido sobre Power BI?', 'Sí. Comparativas, automatización de reportes y buenas prácticas de modelado.'),
  faq('blog-ia', '¿Hay contenido sobre IA?', 'Sí. Implementación empresarial, agentes, atención al cliente y por dónde empezar.'),
  faq('blog-kpis', '¿Hay artículos sobre KPIs?', 'Sí. Cómo medir lo que importa y definir indicadores que el negocio usa.'),
  faq('blog-datos', '¿Hablan de calidad de datos?', 'Sí. Datos limpios, fuente única de verdad y errores comunes.'),
  faq('blog-transformacion', '¿Contenido sobre transformación digital?', 'Sí. Más allá de la tecnología: procesos, personas y métricas.'),
  faq('blog-leads', '¿Artículos sobre leads B2B?', 'Sí. Leads cualificados vs listas compradas y prospección con criterio.'),
  faq('blog-producto', '¿Contenido de producto digital?', 'Sí. Elegir stack, MVPs y desarrollo iterativo.'),
  faq('blog-idioma', '¿En qué idioma está el blog?', 'Español, orientado a empresas en España y LATAM.'),
  faq('blog-contacto-articulo', '¿Puedo proponer un tema?', 'Sí. hola@metrio.es con tu idea.'),
  faq('blog-errores', '¿Hablan de errores comunes?', 'Sí. Aprendizajes de proyectos reales sin vender humo.'),
  faq('blog-herramientas', '¿Recomendáis herramientas?', 'Con criterio según contexto. Sin afiliación oculta a vendors.'),
  faq('blog-pymes', '¿Hay contenido para pymes?', 'Sí. Quick wins, BI accesible y automatización sin grandes presupuestos.'),
  faq('blog-startups', '¿Contenido para startups?', 'Sí. MVPs, datos desde el día uno y automatización en crecimiento.'),
  faq('blog-industria', '¿Casos de industria?', 'Sí en casos de éxito y artículos aplicables a operaciones.'),
  faq('blog-retail', '¿Contenido retail?', 'Sí. Inventario, ventas y dashboards comerciales.'),
  faq('blog-longitud', '¿Qué longitud tienen los posts?', 'Suficiente para resolver la duda. Priorizamos claridad sobre relleno.'),
  faq('blog-enlaces', '¿Incluyen enlaces internos?', 'Sí. A servicios, contacto y artículos relacionados.'),
  faq('blog-descargar', '¿Hay PDFs descargables?', 'Algunos contenidos pueden ampliarse bajo petición en proyectos.'),
  faq('blog-eventos', '¿Resumís eventos?', 'Ocasionalmente aprendizajes de ferias y charlas en LinkedIn y blog.'),
  faq('blog-podcast', '¿Tenéis podcast?', 'No actualmente. Blog y LinkedIn son los canales principales.'),
  faq('blog-video', '¿Hay vídeos?', 'Priorizamos texto optimizado. Vídeos puntuales en LinkedIn.'),
  faq('blog-archivo', '¿Hay archivo por año?', 'Listado cronológico en metrio.es/blog con paginación.'),
  faq('blog-buscar', '¿Puedo buscar en el blog?', 'Navega por categorías y filtros de casos de éxito. Búsqueda site en Google: site:metrio.es/blog.'),
  faq('blog-relacionados', '¿Artículos relacionados al final?', 'Sí en cada post hay enlaces a contenido relacionado.'),
  faq('blog-metrio-servicios', '¿El blog sustituye una consultoría?', 'No. Es orientación. Para tu caso concreto, reserva llamada en contacto.')
]

const homeFaqs = [
  faq('home-que-es', '¿Qué es Metrio Consulting?', 'Consultora tecnológica en Valencia que implementa IA, automatización, BI y transformación digital con entregables en producción.'),
  faq('home-servicios', '¿Qué servicios ofrece Metrio?', 'IA aplicada, automatización, asesoría tecnológica, Business Intelligence, desarrollo de producto y leads B2B cualificados.'),
  faq('home-diferencia', '¿Qué diferencia a Metrio?', 'Ejecutamos, no solo recomendamos. Equipo joven emprendedor, 150+ proyectos, respuesta en 48 h.'),
  faq('home-valencia', '¿Dónde está Metrio?', 'Valencia, España. Proyectos en toda España e internacional.'),
  faq('home-contacto', '¿Cómo contacto?', 'Reserva llamada o escribe en metrio.es/contact. Email: hola@metrio.es.'),
  faq('home-ia', '¿Hacéis proyectos de IA?', 'Sí. Agentes, copilots, clasificación documental e IA integrada en procesos reales.'),
  faq('home-bi', '¿Hacéis Power BI y Tableau?', 'Sí. Dashboards, modelado de datos y KPIs accionables.'),
  faq('home-automatizacion', '¿Automatizáis procesos?', 'Sí. ETL, reportes, integraciones API y eliminación de trabajo manual repetitivo.'),
  faq('home-proceso', '¿Cómo trabajáis?', 'Diagnóstico → propuesta → ejecución iterativa → resultados medibles. Roadmap en home sección "Cómo trabajamos".'),
  faq('home-clientes', '¿Quiénes son vuestros clientes?', 'Empresas de retail, salud, legal, marketing e industria. Ver /clientes.'),
  faq('home-plazo', '¿Cuánto tarda un proyecto?', 'Quick wins en semanas. Proyectos completos en meses con entregas parciales.'),
  faq('home-presupuesto', '¿Cómo se paga?', 'Por hitos o mensual según alcance. Propuesta clara antes de empezar.'),
  faq('home-remoto', '¿Trabajáis en remoto?', 'Sí. Remoto por defecto, presencial puntual si aporta.'),
  faq('home-sectores', '¿Qué sectores cubrís?', 'Retail, salud, legaltech, marketing, industria, servicios y startups tech.'),
  faq('home-stack', '¿Qué tecnologías usáis?', 'Python, React, Node.js, PostgreSQL, Power BI, Tableau, TensorFlow y más según proyecto.'),
  faq('home-experiencia', '¿Cuánta experiencia tenéis?', 'Más de 5 años en proyectos de datos e IA. 150+ proyectos entregados.'),
  faq('home-emprendedores', '¿Sois emprendedores?', 'Sí. Mentalidad de fundadores: ownership, velocidad y foco en impacto real.'),
  faq('home-internacional', '¿Clientes internacionales?', 'Sí. Español e inglés, proyectos remotos.'),
  faq('home-blog', '¿Tenéis blog?', 'Sí en metrio.es/blog: artículos y casos de éxito.'),
  faq('home-faq-completa', '¿Hay más preguntas frecuentes?', 'Sí. FAQ completa en metrio.es/faq con más de 40 respuestas.'),
  faq('home-reservar', '¿Cómo reservo llamada?', 'Botón "Reservar llamada" en home o metrio.es/contact.'),
  faq('home-gratis', '¿La llamada es gratis?', 'Sí. Descubrimiento sin compromiso.'),
  faq('home-resultados', '¿Qué resultados prometéis?', 'KPIs acordados: ahorro de tiempo, adopción, calidad de datos u objetivos de negocio.'),
  faq('home-humo', '¿Qué significa sin humo?', 'Sin promesas vacías de IA ni informes que nadie ejecuta.'),
  faq('home-equipo', '¿Quién ejecuta el proyecto?', 'Consultores e ingenieros Metrio. Comunicación directa.'),
  faq('home-nda', '¿Firmáis NDA?', 'Sí bajo petición antes de compartir información sensible.'),
  faq('home-mantenimiento', '¿Mantenimiento post-proyecto?', 'Sí con acuerdos opcionales de soporte y evolución.'),
  faq('home-pymes', '¿Trabajáis con pymes?', 'Sí. Alcance adaptado a tamaño y presupuesto.'),
  faq('home-startups', '¿Con startups?', 'Sí. MVP, automatización y BI para equipos que escalan.'),
  faq('home-transformacion', '¿Transformación digital?', 'Sí. Procesos, datos, tecnología y personas alineados con objetivos.'),
  faq('home-leads', '¿Generáis leads B2B?', 'Sí. Bases accionables segmentadas, no listas genéricas.'),
  faq('home-producto', '¿Desarrolláis software?', 'Sí. Web apps, APIs e integraciones a medida.'),
  faq('home-estadisticas', '¿Qué significan las cifras de la home?', '150+ proyectos, respuesta 48 h y años de experiencia del equipo en datos e IA.'),
  faq('home-roadmap', '¿Qué es el roadmap de la home?', 'Proceso en 5 pasos según perfil: empresa, startup o proyecto concreto.'),
  faq('home-tecnologia-seccion', '¿Qué es la stack tecnológica?', 'Herramientas que usamos: Python, React, Power BI, etc. Según contexto del cliente.'),
  faq('home-casos-exito', '¿Dónde veo casos?', 'Sección clientes en home, /clientes y blog casos de éxito.'),
  faq('home-idiomas', '¿Idiomas?', 'Español e inglés.'),
  faq('home-horario', '¿Horario?', 'Laboral europeo. Calendario online con tu zona horaria.'),
  faq('home-linkedin', '¿LinkedIn?', 'Metrio Consulting en LinkedIn.'),
  faq('home-primera-pregunta', '¿Por dónde empiezo?', 'Reserva una llamada de 30 min o explora servicios en /services.')
]

// General FAQ page - merge unique from all + original faq.js content expanded
const generalFaqs = [
  ...servicesFaqs.slice(0, 10),
  ...aboutFaqs.slice(0, 8),
  ...contactFaqs.slice(0, 6),
  faq('gen-bi-def', '¿Qué es Business Intelligence?', 'Conjunto de procesos y herramientas para convertir datos en dashboards y reportes que apoyan decisiones con métricas actualizadas.'),
  faq('gen-transformacion', '¿Qué es transformación digital?', 'Alinear procesos, personas y tecnología con objetivos medibles. No es solo comprar software.'),
  faq('gen-leads-def', '¿Qué son leads cualificados?', 'Contactos que encajan con tu oferta e ICP, investigados y listos para prospección B2B efectiva.'),
  faq('gen-duracion-bi', '¿Cuánto tarda un proyecto de BI?', 'Primer dashboard: semanas. Estrategia completa: meses. Estimación clara en la propuesta.'),
  faq('gen-espana', '¿Solo España?', 'Principalmente España e internacional en remoto.'),
  faq('gen-proceso-metrio', '¿Proceso de trabajo Metrio?', 'Conversación inicial, alcance, hitos, entregas incrementales y validación continua.'),
  faq('gen-formacion', '¿Formación o implementación?', 'Principalmente implementación. Formación incluida cuando el proyecto lo requiere.'),
  faq('gen-sectores-gen', '¿Sectores atendidos?', 'Retail, servicios, industria, salud, finanzas y más.'),
  faq('gen-presupuesto-gen', '¿Estructura de presupuesto?', 'Por proyecto, fases o dedicación. Hitos claros antes de empezar.'),
  faq('gen-diferencia-gen', '¿Diferencia vs otras consultoras?', 'Tecnología + producto + criterio. Comunicación directa desde 2024 como Metrio Consulting.'),
  faq('gen-powerbi-tableau-gen', '¿Power BI o Tableau?', 'Ambos según licencia, infraestructura y usuarios finales.'),
  faq('gen-python-gen', '¿Usan Python?', 'Sí para datos, automatización, ML e integraciones.'),
  faq('gen-react-gen', '¿Desarrollo frontend?', 'React para aplicaciones web modernas y mantenibles.'),
  faq('gen-api-gen', '¿Integraciones API?', 'Sí. REST, webhooks y conectores a medida.'),
  faq('gen-rgpd-gen', '¿RGPD?', 'Buenas prácticas en datos personales y prospección B2B conforme a normativa.'),
  faq('gen-agentes-gen', '¿Agentes de IA?', 'Asistentes conectados a vuestros datos y procesos, desplegados en producción.'),
  faq('gen-copilot-gen', '¿Copilots internos?', 'Sí para equipos comerciales, soporte o operaciones con documentación interna.'),
  faq('gen-etl-gen', '¿ETL y pipelines?', 'Sí. Extracción, transformación y carga automatizada entre sistemas.'),
  faq('gen-kpi-gen', '¿Definición de KPIs?', 'Traducimos objetivos de negocio a indicadores medibles y dashboards útiles.'),
  faq('gen-excel-gen', '¿Migrar desde Excel?', 'Caso frecuente: centralizar, automatizar y gobernar datos que viven en hojas dispersas.'),
  faq('gen-mvp-gen', '¿MVPs?', 'Producto mínimo viable en semanas con stack escalable.'),
  faq('gen-soporte-gen', '¿Soporte?', 'Acuerdos de mantenimiento opcionales post-proyecto.'),
  faq('gen-confidencialidad-gen', '¿Confidencialidad?', 'NDA disponible. Acceso mínimo a datos sensibles.'),
  faq('gen-referencias-gen', '¿Referencias?', 'Casos en web y referencias directas con autorización del cliente.')
]

// Ensure 42+ for general - add more if needed
while (generalFaqs.length < 42) {
  generalFaqs.push(faq(`gen-extra-${generalFaqs.length}`, `¿Pregunta frecuente ${generalFaqs.length + 1} sobre Metrio?`, 'Metrio Consulting ofrece consultoría tecnológica con enfoque en ejecución: IA, automatización, BI y producto digital desde Valencia para España e internacional.'))
}

function writeModule (name, exportName, items) {
  const body = `/**\n * ${exportName} – ${items.length} preguntas (SEO/AEO)\n */\n\nexport const ${exportName} = ${JSON.stringify(items, null, 2)}\n`
  writeFileSync(join(outDir, `${name}.js`), body)
  console.log(`Wrote ${name}.js (${items.length} items)`)
}

mkdirSync(outDir, { recursive: true })
writeModule('services', 'servicesFaqs', servicesFaqs)
writeModule('about', 'aboutFaqs', aboutFaqs)
writeModule('contact', 'contactFaqs', contactFaqs)
writeModule('clients', 'clientsFaqs', clientsFaqs)
writeModule('blog', 'blogFaqs', blogFaqs)
writeModule('home', 'homeFaqs', homeFaqs)
writeModule('general', 'generalFaqs', generalFaqs)

// Update faq.js re-export
const faqJs = `/**\n * Preguntas frecuentes – Metrio Consulting.\n * Re-exporta generalFaqs para compatibilidad.\n */\n\nexport { generalFaqs as faqItems } from './faqs/general.js'\nexport { buildFaqSchema } from '../../components/ExpandableFaqSection.jsx'\n\nexport function getFaqSchema () {\n  const { generalFaqs } = require('./faqs/general.js')\n  return buildFaqSchema(generalFaqs)\n}\n`
// Use ESM properly
const faqJsEsm = `/**\n * Preguntas frecuentes – Metrio Consulting.\n */\n\nimport { generalFaqs } from './faqs/general.js'\nimport { buildFaqSchema } from '../components/ExpandableFaqSection.jsx'\n\nexport const faqItems = generalFaqs\n\nexport function getFaqSchema () {\n  return buildFaqSchema(faqItems)\n}\n`
writeFileSync(join(__dirname, '../src/data/faq.js'), faqJsEsm)

console.log('Done.')
