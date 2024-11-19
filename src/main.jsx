/* eslint-disable no-undef */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={window.location.hostname === "localhost" ? "" : process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
