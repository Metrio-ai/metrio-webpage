/**
 * Preguntas frecuentes – re-export hub (páginas temáticas en faqPages.js).
 */

import { faqHubPreview, FAQ_TOPICS, getTotalFaqCount } from './faqPages.js'
import { buildFaqSchema } from '../components/ExpandableFaqSection.jsx'

export { FAQ_TOPICS, faqHubPreview, getTotalFaqCount, getFaqTopic, getAllFaqTopicSlugs } from './faqPages.js'

export function getFaqCategory () {
  return 'general'
}

export const FAQ_CATEGORIES = [{ id: 'all', label: 'Todas' }]

/** @deprecated Usar faqHubPreview o FAQ_TOPICS[].items */
export const faqItems = faqHubPreview

export function getFaqSchema () {
  return buildFaqSchema(faqHubPreview)
}
