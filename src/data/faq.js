/**
 * Preguntas frecuentes – Metrio Consulting.
 */

import { generalFaqs } from './faqs/general.js'
import { buildFaqSchema } from '../components/ExpandableFaqSection.jsx'

const PREFIX_ORDER = { abt: 0, gen: 1, svc: 2, cnt: 3 }

export function getFaqCategory (item) {
  const id = item.id || ''
  if (id.startsWith('abt')) return 'empresa'
  if (id.startsWith('svc')) return 'servicios'
  if (id.startsWith('gen')) return 'general'
  if (id.startsWith('cnt')) return 'contacto'
  return 'general'
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'Todas' },
  { id: 'empresa', label: 'Empresa' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'general', label: 'General' },
  { id: 'contacto', label: 'Contacto' }
]

function sortFaqs (items) {
  return [...items].sort((a, b) => {
    const pa = (a.id || '').split('-')[0]
    const pb = (b.id || '').split('-')[0]
    const order = (PREFIX_ORDER[pa] ?? 9) - (PREFIX_ORDER[pb] ?? 9)
    if (order !== 0) return order
    return (a.question || '').localeCompare(b.question || '', 'es')
  })
}

export const faqItems = sortFaqs(generalFaqs)

export function getFaqSchema () {
  return buildFaqSchema(faqItems)
}
