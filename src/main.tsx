import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Only run in browser environment
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root')
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  }
}
