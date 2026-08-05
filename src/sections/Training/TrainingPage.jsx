import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout'
import SectionImage from '../../components/SectionImage'
import BookCallActions from '../../components/BookCallActions'
import ExpandableFaqSection, { buildFaqSchema } from '../../components/ExpandableFaqSection'
import { trainingFaqs } from '../../data/faqs/training'
import { SECTION_IMAGES } from '../../data/sectionImages'
import { CONTACT_BOOK } from '../../constants/contact'
import {
  TRAINING_SEO,
  TRAINING_BENEFITS,
  TRAINING_STATS,
  TRAINING_PROGRAMS,
  TRAINING_MODALITIES,
  TRAINING_PACKS,
  TRAINING_NORMS,
  IMPLANTATION_PROGRAM,
  COMPLIANCE_AREAS,
  ACADEMY_CATALOG,
  FUNDAE_NOTICE,
  AI_ACT_URL
} from '../../data/training'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import './TrainingPage.css'

const BASE = import.meta.env.BASE_URL

function TrainingPage () {
  const jsonLdRef = useRef(null)

  useEffect(() => {
    document.title = TRAINING_SEO.title
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', TRAINING_SEO.description)
    const metaKw = document.querySelector('meta[name="keywords"]')
    if (metaKw) metaKw.setAttribute('content', TRAINING_SEO.keywords)

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://metrio.es/' },
            { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://metrio.es/services' },
            { '@type': 'ListItem', position: 3, name: 'Formación para empresas', item: 'https://metrio.es/formacion-empresas' }
          ]
        },
        {
          '@type': 'Service',
          '@id': 'https://metrio.es/formacion-empresas#service',
          name: 'Formación empresarial en IA y cumplimiento del AI Act',
          description: TRAINING_SEO.description,
          provider: {
            '@type': 'Organization',
            name: 'Metrio Consulting',
            url: 'https://metrio.es'
          },
          areaServed: 'ES',
          serviceType: 'Corporate training'
        },
        buildFaqSchema(trainingFaqs, 'https://metrio.es/formacion-empresas#faq')
      ]
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(graph)
    script.id = 'training-jsonld'
    document.head.appendChild(script)
    jsonLdRef.current = script

    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
      if (jsonLdRef.current?.parentNode) jsonLdRef.current.remove()
    }
  }, [])

  return (
    <Layout className="trainingPage">
      <main>
        <header className="trainingHero">
          <div className="trainingHeroGrid">
            <div className="trainingHeroContent">
              <p className="sectionLabel">Formación para empresas</p>
              <h1 className="trainingHeroTitle">
                Formación en Inteligencia Artificial para Empresas
              </h1>
              <p className="trainingHeroLead">
                La IA ya está en el día a día. Formamos a tus equipos para usarla con seguridad,
                productividad y conforme al{' '}
                <a
                  href={AI_ACT_URL}
                  className="trainingHeroLink"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reglamento Europeo de IA (AI Act)
                </a>
                {' '}— casos reales de tu negocio, certificados y posibilidad de bonificación vía FUNDAE.
              </p>
              <BookCallActions
                align="start"
                variant="hero"
                scrollTarget="#programas"
                scrollLabel="Ver programas"
              />
              <p className="trainingHeroNote">
                Primera llamada gratis · Respuesta en 48 h · Presencial u online
              </p>
            </div>
            <div className="trainingHeroVisual">
              <SectionImage
                src={SECTION_IMAGES.ai}
                alt="Sesión de formación empresarial en inteligencia artificial con el equipo"
                width={960}
                height={660}
                priority
                caption="Formación práctica: IA, AI Act y adopción real en la empresa"
              />
            </div>
          </div>

          <aside className="trainingTrustBar" aria-label="Marco normativo y partners">
            <p className="trainingTrustLabel">Alineados con</p>
            <div className="trainingTrustLogos">
              <a
                href={AI_ACT_URL}
                className="trainingTrustLogoLink"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ley de IA — Comisión Europea (abre en nueva pestaña)"
              >
                <img
                  src={`${BASE}partners/comision-europea.png`}
                  alt="Comisión Europea"
                  className="trainingTrustLogo trainingTrustLogo--eu"
                  width="200"
                  height="62"
                  loading="eager"
                  decoding="async"
                />
              </a>
              <a
                href="https://www.fundae.es/"
                className="trainingTrustLogoLink"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="FUNDAE — Fundación Estatal para la Formación en el Empleo"
              >
                <img
                  src={`${BASE}partners/fundae.svg`}
                  alt="FUNDAE — Fundación Estatal para la Formación en el Empleo"
                  className="trainingTrustLogo trainingTrustLogo--fundae"
                  width="240"
                  height="40"
                  loading="eager"
                  decoding="async"
                />
              </a>
            </div>
            <a
              href={AI_ACT_URL}
              className="trainingTrustActLink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Consultar la Ley de IA
              <span className="material-icons" aria-hidden="true">open_in_new</span>
            </a>
          </aside>
        </header>

        <section className="trainingNorms" id="normativas" aria-labelledby="norms-title">
          <div className="trainingNormsInner">
            <div className="trainingNormsIntro">
              <h2 id="norms-title" className="trainingSectionTitle">
                Normativa que marcamos en la formación
              </h2>
              <p className="trainingSectionLead">
                Formamos con referencia al marco oficial europeo y a las obligaciones que ya afectan
                a empresas que usan IA en el día a día.
              </p>
            </div>
            <div className="trainingNormsGrid">
              {TRAINING_NORMS.map((norm) => (
                <article key={norm.id} className="trainingNormCard">
                  <h3 className="trainingNormTitle">{norm.title}</h3>
                  <p className="trainingNormText">{norm.text}</p>
                  {norm.href && (
                    <a
                      href={norm.href}
                      className="trainingNormLink"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {norm.hrefLabel}
                      <span className="material-icons" aria-hidden="true">arrow_outward</span>
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="trainingStats" aria-label="Resultados de formación">
          <div className="trainingStatsInner">
            <ul className="trainingStatsBand">
              {TRAINING_STATS.map((stat) => (
                <li key={stat.label} className="trainingStatCell">
                  <p className="trainingStatValue">{stat.value}</p>
                  <p className="trainingStatLabel">{stat.label}</p>
                </li>
              ))}
            </ul>
            <p className="trainingStatsFoot">
              Horas y profesionales formados en workshops, sesiones in-company y programas de adopción
              de IA, datos y automatización.
            </p>
          </div>
        </section>

        <section className="trainingSection" aria-labelledby="training-benefits-title">
          <div className="trainingSectionInner trainingSplit">
            <div className="trainingSplitVisual">
              <SectionImage
                src={SECTION_IMAGES.howItWorks}
                alt="Equipo en workshop de formación tecnológica planificando adopción de IA"
                width={960}
                height={660}
                caption="Casos prácticos por departamento, no teoría genérica"
              />
            </div>
            <div>
              <h2 id="training-benefits-title" className="trainingSectionTitle">
                ¿Qué conseguimos?
              </h2>
              <p className="trainingSectionLead">
                No vendemos cursos sueltos. Diseñamos e impartimos programas para que tu empresa
                aproveche la IA con criterio y evidencia de formación.
              </p>
              <ul className="trainingBenefits">
                {TRAINING_BENEFITS.map((item) => (
                  <li key={item}>
                    <span className="material-icons" aria-hidden="true">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link to={CONTACT_BOOK} className="trainingInlineCta">
                Quiero formar a mi equipo
                <span className="material-icons" aria-hidden="true">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>

        <section className="trainingSection trainingFundaeSection" id="fundae" aria-labelledby="fundae-title">
          <div className="trainingSectionInner">
            <div className="trainingFundaeCard">
              <div className="trainingFundaeBrand">
                <div className="trainingLogoPlate">
                  <img
                    src={`${BASE}partners/fundae.svg`}
                    alt="FUNDAE — Fundación Estatal para la Formación en el Empleo"
                    className="trainingFundaeLogo"
                    width="320"
                    height="100"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <p className="trainingFundaeBadge">Formación bonificable</p>
              </div>
              <div className="trainingFundaeCopy">
                <h2 id="fundae-title" className="trainingSectionTitle trainingSectionTitle--onDark">
                  Formación bonificable mediante FUNDAE
                </h2>
                <p className="trainingProse trainingProse--onDark">{FUNDAE_NOTICE}</p>
                <div className="trainingFundaeActions">
                  <Link to={CONTACT_BOOK} className="trainingFundaeBtn">
                    Consultar bonificación
                    <span className="material-icons" aria-hidden="true">event_available</span>
                  </Link>
                  <a
                    href="https://www.fundae.es/"
                    className="trainingFundaeLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Más sobre FUNDAE
                    <span className="material-icons" aria-hidden="true">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="trainingSection" id="programas" aria-labelledby="programs-title">
          <div className="trainingSectionInner">
            <h2 id="programs-title" className="trainingSectionTitle">
              Programas disponibles
            </h2>
            <p className="trainingSectionLead">
              Catálogo profesional orientado a resultados de negocio. Elige un programa o lo
              adaptamos a tu empresa.
            </p>
            <div className="trainingProgramGrid">
              {TRAINING_PROGRAMS.map((p) => (
                <article key={p.id} className="trainingProgramCard">
                  <span className="material-icons trainingProgramIcon" aria-hidden="true">{p.icon}</span>
                  <h3 className="trainingProgramTitle">{p.title}</h3>
                  <p className="trainingProgramText">{p.text}</p>
                  <Link to={CONTACT_BOOK} className="trainingCardCta">
                    Pedir este programa
                    <span className="material-icons" aria-hidden="true">chevron_right</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="trainingMidCta" aria-label="Contacto rápido">
          <div className="trainingMidCtaInner">
            <div>
              <h2 className="trainingMidCtaTitle">¿Hablamos 30 minutos?</h2>
              <p className="trainingMidCtaText">
                Te contamos qué programa encaja, si FUNDAE aplica en tu caso y un presupuesto orientativo.
                Sin compromiso.
              </p>
            </div>
            <BookCallActions align="end" />
          </div>
        </section>

        <section className="trainingSection trainingSection--accent" id="implantacion" aria-labelledby="implant-title">
          <div className="trainingSectionInner trainingSplit trainingSplit--reverse">
            <div className="trainingSplitVisual">
              <SectionImage
                src={SECTION_IMAGES.process}
                alt="Proceso de implantación de IA empresarial con formación y automatización"
                width={960}
                height={660}
                caption="De la auditoría a la implantación: formación + ejecución"
              />
            </div>
            <div>
              <p className="trainingEyebrow">Proyecto de transformación</p>
              <h2 id="implant-title" className="trainingSectionTitle">
                {IMPLANTATION_PROGRAM.title}
              </h2>
              <p className="trainingSectionLead trainingSectionLead--wide">
                {IMPLANTATION_PROGRAM.lead}
              </p>
              <ul className="trainingImplantList">
                {IMPLANTATION_PROGRAM.items.map((item) => (
                  <li key={item}>
                    <span className="material-icons" aria-hidden="true">arrow_forward</span>
                    {item}
                  </li>
                ))}
              </ul>
              <BookCallActions align="start" className="trainingImplantCta" />
            </div>
          </div>
        </section>

        <section className="trainingSection" id="packs" aria-labelledby="packs-title">
          <div className="trainingSectionInner">
            <h2 id="packs-title" className="trainingSectionTitle">
              Packs de formación y cumplimiento
            </h2>
            <p className="trainingSectionLead">
              Entra por compliance, productividad, dirección o transformación completa.
            </p>
            <div className="trainingPackGrid">
              {TRAINING_PACKS.map((pack) => (
                <article key={pack.id} className="trainingPackCard">
                  <span className="material-icons trainingPackIcon" aria-hidden="true">{pack.icon}</span>
                  <h3 className="trainingPackTitle">{pack.title}</h3>
                  <p className="trainingPackText">{pack.text}</p>
                  <ul className="trainingPackItems">
                    {pack.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link to={CONTACT_BOOK} className="trainingCardCta">
                    Solicitar {pack.title}
                    <span className="material-icons" aria-hidden="true">chevron_right</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="trainingSection trainingSection--subtle" id="cumplimiento" aria-labelledby="compliance-title">
          <div className="trainingSectionInner">
            <div className="trainingComplianceHeader">
              <div>
                <h2 id="compliance-title" className="trainingSectionTitle">
                  Cumplimiento y marco normativo
                </h2>
                <p className="trainingSectionLead">
                  Formamos con rigor práctico: lo que la normativa exige y lo que tu equipo debe aplicar.
                  Fuente oficial de la{' '}
                  <a
                    href={AI_ACT_URL}
                    className="trainingInlineDocLink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Ley de IA (Comisión Europea)
                  </a>.
                </p>
              </div>
              <a
                href={AI_ACT_URL}
                className="trainingEuBadge"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir Ley de IA en el sitio de la Comisión Europea"
              >
                <img
                  src={`${BASE}partners/comision-europea.png`}
                  alt="Comisión Europea"
                  width="200"
                  height="50"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
            <div className="trainingComplianceGrid">
              {COMPLIANCE_AREAS.map((area) => (
                <article key={area.title} className="trainingComplianceCard">
                  <h3 className="trainingComplianceTitle">{area.title}</h3>
                  <p className="trainingComplianceText">{area.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="trainingSection" id="academia" aria-labelledby="academy-title">
          <div className="trainingSectionInner">
            <div className="trainingAcademyHeader">
              <div>
                <h2 id="academy-title" className="trainingSectionTitle">
                  Academia Metrio — catálogo
                </h2>
                <p className="trainingSectionLead">
                  Itinerarios por área. Combinables según tu organización.
                </p>
              </div>
              <div className="trainingAcademyVisual">
                <SectionImage
                  src="/blog/implementacion-ia.webp"
                  alt="Profesionales aplicando inteligencia artificial en el puesto de trabajo"
                  width={800}
                  height={560}
                />
              </div>
            </div>
            <div className="trainingAcademyGrid">
              {ACADEMY_CATALOG.map((cat) => (
                <article key={cat.category} className="trainingAcademyCard">
                  <h3 className="trainingAcademyCategory">{cat.category}</h3>
                  <ul className="trainingAcademyList">
                    {cat.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="trainingSection trainingSection--subtle" aria-labelledby="modalities-title">
          <div className="trainingSectionInner">
            <h2 id="modalities-title" className="trainingSectionTitle">
              Modalidades y certificación
            </h2>
            <div className="trainingModalityGrid">
              {TRAINING_MODALITIES.map((m) => (
                <article key={m.title} className="trainingModalityCard">
                  <span className="material-icons" aria-hidden="true">{m.icon}</span>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </article>
              ))}
            </div>
            <div className="trainingCertBlock">
              <span className="material-icons" aria-hidden="true">workspace_premium</span>
              <div>
                <h3>Certificado de aprovechamiento</h3>
                <p>
                  Al finalizar, cada participante recibe un certificado emitido por Metrio Consulting:
                  útil como evidencia interna de AI literacy y formación continua.
                </p>
              </div>
              <Link to={CONTACT_BOOK} className="trainingCertBtn">
                Reservar llamada
              </Link>
            </div>
          </div>
        </section>

        <ExpandableFaqSection
          title="Preguntas frecuentes sobre formación empresarial"
          titleId="training-faq-title"
          items={trainingFaqs}
          initialCount={6}
          className="expandableFaq--subtle"
        />

        <section className="trainingCta" aria-labelledby="training-cta-title">
          <div className="trainingCtaCard">
            <div className="trainingLogoPlate trainingLogoPlate--cta">
              <img
                src={`${BASE}partners/fundae.svg`}
                alt=""
                className="trainingCtaFundae"
                width="200"
                height="64"
                loading="lazy"
                decoding="async"
                aria-hidden="true"
              />
            </div>
            <h2 id="training-cta-title">¿Diseñamos el programa de tu empresa?</h2>
            <p>
              Cuéntanos sector, tamaño de equipo y si te interesa FUNDAE. En 30 minutos te proponemos
              un plan concreto — packs, implantación o programa a medida.
            </p>
            <BookCallActions />
            <p className="trainingCtaLinks">
              <Link to="/services">Ver todos los servicios</Link>
              <span aria-hidden="true">·</span>
              <Link to="/blog/formacion-ia-empresas-prioridad-2026">Por qué la formación es prioritaria</Link>
              <span aria-hidden="true">·</span>
              <Link to="/contact">Escribir a hola@metrio.es</Link>
            </p>
          </div>
        </section>
      </main>
    </Layout>
  )
}

export default TrainingPage
