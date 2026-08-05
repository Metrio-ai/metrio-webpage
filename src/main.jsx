import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import Layout from './components/Layout'
import { ThemeProvider } from './context/ThemeContext'
import { LOCATION_SERVICE_TYPES } from './data/locationPages.js'

const Blog = lazy(() => import('./sections/Blog/Blog.jsx'))
const BlogPost = lazy(() => import('./sections/Blog/BlogPost.jsx'))
const ContactPage = lazy(() => import('./sections/Contact/ContactPage.jsx'))
const ServicesPage = lazy(() => import('./sections/Services/ServicesPage.jsx'))
const AboutPage = lazy(() => import('./sections/About/AboutPage.jsx'))
const ClientsPage = lazy(() => import('./sections/Clients/ClientsPage.jsx'))
const FaqPage = lazy(() => import('./sections/Faq/FaqPage.jsx'))
const FaqTopicPage = lazy(() => import('./sections/Faq/FaqTopicPage.jsx'))
const CareersPage = lazy(() => import('./sections/Careers/CareersPage.jsx'))
const TrainingPage = lazy(() => import('./sections/Training/TrainingPage.jsx'))
const LocationHubPage = lazy(() => import('./sections/Locations/LocationHubPage.jsx'))
const LocationPage = lazy(() => import('./sections/Locations/LocationPage.jsx'))

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }} aria-hidden="true">
    <div style={{ width: 32, height: 32, border: '3px solid var(--color-border)', borderTopColor: 'var(--color-accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
  </div>
)

const withSuspense = (Component) => (
  <Suspense fallback={<Layout><PageLoader /></Layout>}>
    <Component />
  </Suspense>
)

/** Tras un deploy, chunks viejos pueden fallar: recargar una vez con la HTML nueva. */
function installChunkReload () {
  if (typeof window === 'undefined') return
  const KEY = 'metrio_chunk_reload'

  const reloadOnce = () => {
    try {
      if (sessionStorage.getItem(KEY) === '1') return
      sessionStorage.setItem(KEY, '1')
    } catch {
      /* ignore */
    }
    window.location.reload()
  }

  window.addEventListener('vite:preloadError', (event) => {
    event.preventDefault()
    reloadOnce()
  })

  window.addEventListener('unhandledrejection', (event) => {
    const msg = String(event?.reason?.message || event?.reason || '')
    if (
      msg.includes('Failed to fetch dynamically imported module') ||
      msg.includes('Importing a module script failed') ||
      msg.includes('error loading dynamically imported module')
    ) {
      reloadOnce()
    }
  })

  // Limpiar flag tras carga correcta
  window.setTimeout(() => {
    try { sessionStorage.removeItem(KEY) } catch { /* ignore */ }
  }, 4000)
}

installChunkReload()

const router = createBrowserRouter([
  {
    path: '/casos-exito',
    element: (
      <Layout>
        <Navigate to="/blog" replace />
      </Layout>
    )
  },
  {
    path: '/',
    element: <App />
  },
  {
    path: '/services',
    element: withSuspense(ServicesPage)
  },
  {
    path: '/formacion-empresas',
    element: withSuspense(TrainingPage)
  },
  {
    path: '/sobre-nosotros',
    element: withSuspense(AboutPage)
  },
  {
    path: '/clientes',
    element: withSuspense(ClientsPage)
  },
  {
    path: '/blog',
    element: withSuspense(Blog)
  },
  {
    path: '/blog/:slug',
    element: withSuspense(BlogPost)
  },
  {
    path: '/contact',
    element: withSuspense(ContactPage)
  },
  {
    path: '/faq',
    element: withSuspense(FaqPage)
  },
  {
    path: '/faq/:slug',
    element: withSuspense(FaqTopicPage)
  },
  {
    path: '/trabaja-con-nosotros',
    element: withSuspense(CareersPage)
  },
  ...Object.keys(LOCATION_SERVICE_TYPES).flatMap((slug) => [
    { path: `/${slug}`, element: withSuspense(LocationHubPage) },
    { path: `/${slug}/:citySlug`, element: withSuspense(LocationPage) }
  ])
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)
