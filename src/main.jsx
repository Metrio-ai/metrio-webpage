import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'
import Blog from './sections/Blog/Blog.jsx'
import BlogPost from './sections/Blog/BlogPost.jsx'
import ContactPage from './sections/Contact/ContactPage.jsx'

const router = createHashRouter([
  {
    path: '/',
    element: <App />
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
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
