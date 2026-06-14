export const METRIO_EMAIL = 'hola@metrio.es'

export const CONTACT_BOOK = '/contact'
export const CONTACT_WRITE = '/contact?tab=escribir'
export const CONTACT_HOME = '/#contact'
export const CAREERS_PATH = '/trabaja-con-nosotros'

export function buildMailto ({ to = METRIO_EMAIL, subject, body }) {
  const params = new URLSearchParams()
  if (subject) params.set('subject', subject)
  if (body) params.set('body', body)
  const query = params.toString()
  return `mailto:${to}${query ? `?${query}` : ''}`
}
