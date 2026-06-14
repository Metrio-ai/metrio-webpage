import { Link } from 'react-router-dom'
import SectionImage from '../../components/SectionImage'
import { SECTION_IMAGES } from '../../data/sectionImages'
import BookCallActions from '../../components/BookCallActions'
import './AiSection.css'

const CAPABILITIES = [
  {
    title: 'Procesos documentales',
    text: 'Extracción, clasificación y enrutado de facturas, contratos o solicitudes sin intervención manual.'
  },
  {
    title: 'Asistentes internos',
    text: 'Copilots conectados a tu CRM, ERP o base de conocimiento para equipos comerciales y operativos.'
  },
  {
    title: 'Automatización inteligente',
    text: 'Reglas + modelos donde aportan: alertas, priorización y decisiones repetitivas aceleradas.'
  }
]

function AiSection () {
  return (
    <section className="aiSection" id="ia" aria-labelledby="ai-title">
      <div className="aiInner">
        <div className="aiVisual">
          <SectionImage
            src={SECTION_IMAGES.ai}
            alt="Inteligencia artificial aplicada en procesos empresariales y operaciones"
            width={960}
            height={660}
            caption="IA en producción: agentes, copilots e integraciones con tus sistemas"
          />
        </div>
        <div className="aiIntro">
          <p className="sectionLabel">Inteligencia artificial</p>
          <h2 id="ai-title" className="sectionTitle">
            IA integrada en operaciones reales
          </h2>
          <p className="sectionLead aiLead">
            No hacemos demos vacías. Diseñamos e implementamos soluciones de IA que encajan
            con tus sistemas, tu equipo y tus métricas de negocio.
          </p>
          <Link to="/services#implementacion-ia" className="aiLink">
            Cómo lo abordamos
            <span className="material-icons" aria-hidden="true">arrow_forward</span>
          </Link>
          <BookCallActions className="aiBookCall" align="start" />
        </div>
      </div>

      <ul className="aiList">
        {CAPABILITIES.map((item, i) => (
          <li key={item.title} className="aiItem">
            <span className="aiItemIndex" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="aiItemTitle">{item.title}</h3>
              <p className="aiItemText">{item.text}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default AiSection
