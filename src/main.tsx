import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HealthProgressApp } from './HealthProgressApp'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HealthProgressApp />
  </StrictMode>,
)
