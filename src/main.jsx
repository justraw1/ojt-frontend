import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/sidenav.css'
import './css/documents.css'
import './css/tables.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
