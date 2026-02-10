import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import Layout from './components/Layout'
import Blog from './sections/Blog/Blog.jsx'
import BlogPost from './sections/Blog/BlogPost.jsx'
import ContactPage from './sections/Contact/ContactPage.jsx'
import ServicesPage from './sections/Services/ServicesPage.jsx'
import FaqPage from './sections/Faq/FaqPage.jsx'
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
    element: <ServicesPage />
  },
  {
    path: '/blog',
    element: <Blog />
  },
  {
    path: 'blog/:slug',
    element: <BlogPost />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/faq',
    element: <FaqPage />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
