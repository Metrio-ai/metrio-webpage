import { CAREERS_PATH } from '../constants/contact'

/** Enlaces principales — todas las páginas del sitio accesibles desde el header. */
export const MAIN_NAV = [
  { type: 'link', to: '/', label: 'Inicio', end: true },
  { type: 'link', to: '/sobre-nosotros', label: 'Sobre nosotros' },
  {
    type: 'dropdown',
    label: 'Servicios',
    to: '/services',
    matchPaths: ['/services'],
    items: [
      { to: '/services', label: 'Todos los servicios' },
      { to: '/services#implementacion-ia', label: 'Implementación de IA' },
      { to: '/services#automatizacion', label: 'Automatización de procesos' },
      { to: '/services#business-intelligence', label: 'Business Intelligence' },
      { to: '/services#producto-digital', label: 'Producto digital' },
      { to: '/services#asesoria', label: 'Transformación digital' }
    ]
  },
  { type: 'link', to: '/clientes', label: 'Clientes', homeHash: '#clientes' },
  { type: 'link', to: '/blog', label: 'Blog' },
  {
    type: 'dropdown',
    label: 'Recursos',
    to: '/faq',
    matchPaths: ['/faq'],
    items: [
      { to: '/faq', label: 'Preguntas frecuentes' },
      { to: '/faq/inteligencia-artificial', label: 'FAQ sobre IA' },
      { to: '/faq/automatizacion-procesos', label: 'FAQ automatización' },
      { to: '/faq/business-intelligence', label: 'FAQ Business Intelligence' },
      { to: '/blog?filter=casos-exito', label: 'Casos de éxito' }
    ]
  },
  { type: 'link', to: '/contact', label: 'Contacto' },
  { type: 'link', to: CAREERS_PATH, label: 'Trabaja con nosotros' }
]

export function isNavItemActive (item, pathname) {
  if (item.type === 'link') {
    if (item.end) return pathname === item.to
    return pathname === item.to || pathname.startsWith(`${item.to}/`)
  }
  if (item.type === 'dropdown') {
    if (item.matchPaths?.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true
    return item.items?.some((sub) => {
      const base = sub.to.split('?')[0].split('#')[0]
      return pathname === base || pathname.startsWith(`${base}/`)
    })
  }
  return false
}
