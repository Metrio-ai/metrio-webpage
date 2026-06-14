import { METRIO_EMAIL, buildMailto } from '../constants/contact'

const FORM_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || METRIO_EMAIL
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(FORM_EMAIL)}`

/**
 * Envía el formulario a hola@metrio.es vía FormSubmit (AJAX).
 * La primera vez, FormSubmit envía un email de activación a esa dirección — hay que confirmarlo una vez.
 * Si falla la red, abre mailto como respaldo.
 */
export async function submitContactForm ({
  name,
  email,
  company,
  subject,
  message,
  formType = 'contact',
  extra = {}
}) {
  const payload = {
    name: name || 'Sin nombre',
    email: email || '',
    empresa: company || '',
    asunto: subject || '',
    mensaje: message || '',
    origen: `metrio.es — ${formType}`,
    ...extra,
    _subject: subject
      ? `[Metrio · ${formType}] ${subject}`
      : `[Metrio · ${formType}] Nuevo mensaje`,
    _replyto: email || undefined,
    _template: 'table',
    _captcha: 'false'
  }

  const res = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  const data = await res.json()
  if (data.success !== 'true' && data.success !== true) {
    throw new Error(data.message || 'Envío rechazado')
  }

  return data
}

export function openMailtoFallback ({ subject, body }) {
  window.location.href = buildMailto({ subject, body })
}
