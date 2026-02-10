import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import Layout from './components/Layout'

const Blog = lazy(() => import('./sections/Blog/Blog.jsx'))
const BlogPost = lazy(() => import('./sections/Blog/BlogPost.jsx'))
const ContactPage = lazy(() => import('./sections/Contact/ContactPage.jsx'))
const ServicesPage = lazy(() => import('./sections/Services/ServicesPage.jsx'))
const FaqPage = lazy(() => import('./sections/Faq/FaqPage.jsx'))

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
    path: '/blog',
    element: withSuspense(Blog)
  },
  {
    path: 'blog/:slug',
    element: withSuspense(BlogPost)
  },
  {
    path: '/contact',
    element: withSuspense(ContactPage)
  },
  {
    path: '/faq',
    element: withSuspense(FaqPage)
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
