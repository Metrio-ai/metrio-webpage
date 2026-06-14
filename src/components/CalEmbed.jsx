import { useEffect, useId, useRef, useState } from 'react'
import { mountCalInline } from '../utils/cal'
import './CalEmbed.css'

function CalEmbed ({
  className = '',
  minHeight = 620,
  maxHeight,
  compact = false,
  hideEventTypeDetails = false,
  layout = 'column',
  label = 'Calendario de reservas',
  lazy = true
}) {
  const reactId = useId().replace(/:/g, '')
  const elementId = `cal-inline-${reactId}`
  const wrapRef = useRef(null)
  const containerRef = useRef(null)
  const [visible, setVisible] = useState(!lazy)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    if (!lazy || visible) return undefined

    const node = wrapRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '240px 0px' }
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [lazy, visible])

  useEffect(() => {
    if (!visible) return undefined

    let active = true

    mountCalInline(elementId, { hideEventTypeDetails, layout })
      .then(() => {
        if (active) setStatus('ready')
      })
      .catch(() => {
        if (active) setStatus('error')
      })

    return () => {
      active = false
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [visible, elementId, hideEventTypeDetails, layout])

  const targetStyle = {
    minHeight: status === 'ready' ? minHeight : 0,
    ...(maxHeight ? { maxHeight } : {})
  }

  return (
    <div
      ref={wrapRef}
      className={`calEmbedWrap ${compact ? 'calEmbedWrap--compact' : ''} ${className}`.trim()}
    >
      {status === 'loading' && (
        <div className="calEmbedLoading" aria-live="polite">
          <div className="calEmbedSpinner" aria-hidden="true" />
          <span>{visible ? 'Cargando calendario…' : 'Calendario disponible al hacer scroll'}</span>
        </div>
      )}
      {status === 'error' && (
        <p className="calEmbedError" role="alert">
          No se pudo cargar el calendario. Escríbenos a{' '}
          <a href="mailto:hola@metrio.es">hola@metrio.es</a>.
        </p>
      )}
      <div
        id={elementId}
        ref={containerRef}
        className="calEmbedTarget"
        style={targetStyle}
        aria-label={label}
        role="region"
      />
    </div>
  )
}

export default CalEmbed
