import { useEffect, useMemo, useRef, useState } from 'react'
import './ExpandableFaqSection.css'

export function buildFaqSchema (items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question || item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer || item.a
      }
    }))
  }
}

function itemKey (item, index) {
  return item.id || item.question || item.q || String(index)
}

function ExpandableFaqSection ({
  title,
  titleId = 'faq-section-title',
  labelledBy,
  items,
  initialCount = 8,
  className = '',
  numbered = false,
  variant = 'default',
  categories = null,
  getCategory = null,
  showSearch = false
}) {
  const [expanded, setExpanded] = useState(false)
  const [openId, setOpenId] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const questionRefs = useRef({})
  const isPremium = variant === 'premium'

  const filteredByCategory = useMemo(() => {
    if (!categories || activeCategory === 'all' || !getCategory) return items
    return items.filter((item) => getCategory(item) === activeCategory)
  }, [items, categories, activeCategory, getCategory])

  const filteredBySearch = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return filteredByCategory
    return filteredByCategory.filter((item) => {
      const question = (item.question || item.q || '').toLowerCase()
      const answer = (item.answer || item.a || '').toLowerCase()
      return question.includes(q) || answer.includes(q)
    })
  }, [filteredByCategory, searchQuery])

  const hasMore = !searchQuery && filteredBySearch.length > initialCount
  const visible = expanded || searchQuery ? filteredBySearch : filteredBySearch.slice(0, initialCount)
  const hiddenCount = Math.max(0, filteredBySearch.length - initialCount)
  const sectionLabelId = labelledBy || (title ? titleId : undefined)

  const activeIndex = visible.findIndex((item, i) => itemKey(item, i) === openId)
  const safeIndex = activeIndex >= 0 ? activeIndex : 0
  const active = visible[safeIndex]
  const activeQuestion = active?.question || active?.q || ''
  const activeAnswer = active?.answer || active?.a || ''
  const activeKey = active ? itemKey(active, safeIndex) : null

  useEffect(() => {
    if (visible.length === 0) {
      setOpenId(null)
      return
    }
    const stillVisible = visible.some((item, i) => itemKey(item, i) === openId)
    if (!openId || !stillVisible) {
      setOpenId(itemKey(visible[0], 0))
    }
  }, [visible, openId])

  const selectQuestion = (key, index) => {
    setOpenId(key)
    const el = questionRefs.current[key]
    if (el?.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
    }
  }

  const goToIndex = (index) => {
    if (index < 0 || index >= visible.length) return
    selectQuestion(itemKey(visible[index], index), index)
  }

  const onKeyDown = (e, index, key) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      selectQuestion(key, index)
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      goToIndex(index + 1)
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      goToIndex(index - 1)
    }
  }

  return (
    <section
      className={`expandableFaq expandableFaq--${variant} ${className}`.trim()}
      aria-labelledby={sectionLabelId}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {title && (
        <h2 id={titleId} className="expandableFaqTitle">
          {title}
        </h2>
      )}

      <div className="expandableFaqShell">
        {(showSearch || categories) && (
          <div className="expandableFaqToolbar">
            {showSearch && (
              <label className="expandableFaqSearch">
                <span className="material-icons" aria-hidden="true">search</span>
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar pregunta..."
                  aria-label="Buscar en preguntas frecuentes"
                />
              </label>
            )}
            {categories && (
              <div className="expandableFaqCategories" role="tablist" aria-label="Filtrar por tema">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    className={`expandableFaqCategory ${activeCategory === cat.id ? 'expandableFaqCategory--active' : ''}`}
                    aria-selected={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {visible.length === 0 ? (
          <p className="expandableFaqEmpty">No hay preguntas que coincidan. Prueba otro término o categoría.</p>
        ) : (
          <div className="expandableFaqSplit">
            <div className="expandableFaqQuestionsCol">
              <p className="expandableFaqColLabel">
                <span className="material-icons" aria-hidden="true">help_outline</span>
                Preguntas
              </p>
              <div
                className="expandableFaqQuestions"
                role="tablist"
                aria-label="Preguntas frecuentes"
              >
                {visible.map((item, index) => {
                  const question = item.question || item.q
                  const key = itemKey(item, index)
                  const isActive = openId === key

                  return (
                    <button
                      key={key}
                      ref={(el) => { questionRefs.current[key] = el }}
                      type="button"
                      role="tab"
                      id={`faq-tab-${key}`}
                      aria-selected={isActive}
                      aria-controls={`faq-panel-${key}`}
                      className={`expandableFaqQuestion ${isActive ? 'expandableFaqQuestion--active' : ''}`}
                      onClick={() => selectQuestion(key, index)}
                      onKeyDown={(e) => onKeyDown(e, index, key)}
                      itemScope
                      itemProp="mainEntity"
                      itemType="https://schema.org/Question"
                    >
                      {numbered && (
                        <span className="expandableFaqNumber" aria-hidden="true">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      )}
                      <span className="expandableFaqQuestionText" itemProp="name">
                        {question}
                      </span>
                      <span className="material-icons expandableFaqQuestionIcon" aria-hidden="true">
                        chevron_right
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="expandableFaqAnswerCol">
              <p className="expandableFaqColLabel">
                <span className="material-icons" aria-hidden="true">chat_bubble_outline</span>
                Respuesta
              </p>
              <div
                className="expandableFaqAnswerPanel"
                role="tabpanel"
                id={`faq-panel-${activeKey}`}
                aria-labelledby={`faq-tab-${activeKey}`}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
                key={activeKey}
              >
                <h3 className="expandableFaqAnswerTitle" itemProp="name">
                  {activeQuestion}
                </h3>
                <div
                  className="expandableFaqAnswerBody"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{activeAnswer}</p>
                </div>
                <div className="expandableFaqAnswerMeta">
                  <span className="expandableFaqAnswerCount">
                    {String(safeIndex + 1).padStart(2, '0')} / {String(visible.length).padStart(2, '0')}
                  </span>
                  <div className="expandableFaqAnswerNav">
                    <button
                      type="button"
                      className="expandableFaqAnswerNavBtn"
                      onClick={() => goToIndex(safeIndex - 1)}
                      disabled={safeIndex === 0}
                      aria-label="Pregunta anterior"
                    >
                      <span className="material-icons" aria-hidden="true">arrow_back</span>
                    </button>
                    <button
                      type="button"
                      className="expandableFaqAnswerNavBtn"
                      onClick={() => goToIndex(safeIndex + 1)}
                      disabled={safeIndex >= visible.length - 1}
                      aria-label="Pregunta siguiente"
                    >
                      <span className="material-icons" aria-hidden="true">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {hasMore && (
        <div className="expandableFaqToggleWrap">
          <button
            type="button"
            className="expandableFaqToggle"
            onClick={() => {
              setExpanded((v) => !v)
              if (expanded && visible.length > 0) {
                setOpenId(itemKey(visible[0], 0))
              }
            }}
            aria-expanded={expanded}
          >
            {expanded ? 'Ver menos preguntas' : `Ver más preguntas (${hiddenCount} más)`}
            <span className="material-icons" aria-hidden="true">
              {expanded ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>
      )}

      {isPremium && visible.length > 0 && (
        <p className="expandableFaqHint">
          {visible.length} preguntas · elige otra a la izquierda para cambiar la respuesta
        </p>
      )}

      <ul className="expandableFaqSeoHidden" aria-hidden="true">
        {items.map((item, index) => (
          <li key={itemKey(item, index)}>
            {item.question || item.q}: {item.answer || item.a}
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExpandableFaqSection
