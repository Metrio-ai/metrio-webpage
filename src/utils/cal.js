const CAL_ORIGIN = 'https://app.cal.com'
const CAL_SCRIPT = 'https://app.cal.com/embed/embed.js'
export const CAL_LINK = 'santi-corell-7cn8g6/llamada-descubrimiento'

function ensureCalPreconnect () {
  if (typeof document === 'undefined') return
  if (document.querySelector('link[data-cal-preconnect]')) return
  const link = document.createElement('link')
  link.rel = 'preconnect'
  link.href = CAL_ORIGIN
  link.crossOrigin = 'anonymous'
  link.dataset.calPreconnect = 'true'
  document.head.appendChild(link)
}

function bootstrapCalLoader () {
  if (typeof window === 'undefined' || window.Cal) return

  /* eslint-disable */
  (function (C, A, L) {
    const p = function (a, ar) { a.q.push(ar) }
    const d = C.document
    C.Cal = C.Cal || function () {
      const cal = C.Cal
      const ar = arguments
      if (!cal.loaded) {
        cal.ns = {}
        cal.q = cal.q || []
        d.head.appendChild(d.createElement('script')).src = A
        cal.loaded = true
      }
      if (ar[0] === L) {
        const api = function () { p(api, arguments) }
        const namespace = ar[1]
        api.q = api.q || []
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api
          p(cal.ns[namespace], ar)
          p(cal, ['initNamespace', namespace])
        } else {
          p(cal, ar)
        }
        return
      }
      p(cal, ar)
    }
  })(window, CAL_SCRIPT, 'init')
  /* eslint-enable */
}

export function loadCal () {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (window.__calReady) return window.__calReady

  ensureCalPreconnect()
  bootstrapCalLoader()

  window.__calReady = new Promise((resolve) => {
    const start = Date.now()
    const tick = () => {
      if (window.Cal?.loaded) {
        resolve(window.Cal)
        return
      }
      if (Date.now() - start > 8000) {
        resolve(window.Cal || null)
        return
      }
      requestAnimationFrame(tick)
    }
    tick()
  })

  return window.__calReady
}

export async function mountCalInline (elementId, { hideEventTypeDetails = false, layout = 'column' } = {}) {
  const Cal = await loadCal()
  if (!Cal) return

  const namespace = `llamada-descubrimiento-${elementId}`
  const calLayout = layout === 'month' ? 'month_view' : 'column_view'

  Cal('init', namespace, { origin: CAL_ORIGIN })
  Cal.config = Cal.config || {}
  Cal.config.forwardQueryParams = true

  Cal.ns[namespace]('inline', {
    elementOrSelector: `#${elementId}`,
    config: { layout: calLayout, useSlotsViewOnSmallScreen: 'true' },
    calLink: CAL_LINK
  })

  Cal.ns[namespace]('ui', {
    hideEventTypeDetails,
    layout: calLayout
  })
}
