import pythonLogo from '/src/assets/img/python.svg'
import nodejsLogo from '/src/assets/img/nodejs.svg'
import postgresLogo from '/src/assets/img/postgresql.svg'
import mongodbLogo from '/src/assets/img/mongodb.svg'
import reactlogo from '/src/assets/img/react.svg'
import dockerLogo from '/src/assets/img/docker.svg'
import excelLogo from '/src/assets/img/excel.svg'
import powerbiLogo from '/src/assets/img/powerbi.svg'
import tableauLogo from '/src/assets/img/tableau.svg'
import pandasLogo from '/src/assets/img/pandas.svg'
import matplotlibLogo from '/src/assets/img/matplotlib.svg'
import tensorflowLogo from '/src/assets/img/tensorflow.svg'
import SectionImage from '../../components/SectionImage'
import { SECTION_IMAGES } from '../../data/sectionImages'
import './TechStack.css'

const CATEGORIES = [
  {
    id: 'dev',
    label: 'Desarrollo e integraciones',
    desc: 'Producto digital, APIs y conexión entre sistemas',
    tools: [
      { src: pythonLogo, alt: 'Python', name: 'Python' },
      { src: nodejsLogo, alt: 'Node.js', name: 'Node.js' },
      { src: reactlogo, alt: 'React', name: 'React' },
      { src: postgresLogo, alt: 'PostgreSQL', name: 'PostgreSQL' },
      { src: mongodbLogo, alt: 'MongoDB', name: 'MongoDB' },
      { src: dockerLogo, alt: 'Docker', name: 'Docker' }
    ]
  },
  {
    id: 'data',
    label: 'Datos & Business Intelligence',
    desc: 'Dashboards, KPIs y fuente única de verdad',
    tools: [
      { src: powerbiLogo, alt: 'Power BI', name: 'Power BI' },
      { src: tableauLogo, alt: 'Tableau', name: 'Tableau' },
      { src: excelLogo, alt: 'Excel', name: 'Excel' },
      { src: pandasLogo, alt: 'Pandas', name: 'Pandas' },
      { src: matplotlibLogo, alt: 'Matplotlib', name: 'Matplotlib' }
    ]
  },
  {
    id: 'ai',
    label: 'Inteligencia artificial',
    desc: 'Modelos, agentes y automatización inteligente',
    tools: [
      { src: tensorflowLogo, alt: 'TensorFlow', name: 'TensorFlow' },
      { src: pythonLogo, alt: 'Python ML', name: 'Python ML' }
    ]
  }
]

function TechStack () {
  return (
    <section className="techStack" id="stack" aria-labelledby="stack-title">
      <div className="techStackInner">
        <div className="techStackIntro">
          <div className="techStackVisual">
            <SectionImage
              src={SECTION_IMAGES.techStack}
              alt="Automatización, integraciones y stack tecnológica en producción"
              width={960}
              height={660}
            />
          </div>
          <div className="techStackHeader">
            <p className="sectionLabel">Stack tecnológica</p>
            <h2 id="stack-title" className="sectionTitle">
              Tecnología que encaja con tu operación
            </h2>
            <p className="sectionLead techStackLead">
              No vendemos moda. Elegimos herramientas según tu contexto, tu equipo
              y tus objetivos de negocio — desde Python y Power BI hasta agentes de IA
              en producción.
            </p>
          </div>
        </div>

        <ul className="techStackGrid">
          {CATEGORIES.map((cat) => (
            <li key={cat.id}>
              <article className="techStackCard">
                <header className="techStackCardHeader">
                  <h3 className="techStackCardTitle">{cat.label}</h3>
                  <p className="techStackCardDesc">{cat.desc}</p>
                </header>
                <ul className="techStackTools" aria-label={cat.label}>
                  {cat.tools.map((tool) => (
                    <li key={tool.name} className="techStackTool">
                      <img src={tool.src} alt="" width="36" height="36" loading="lazy" decoding="async" />
                      <span>{tool.name}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default TechStack
