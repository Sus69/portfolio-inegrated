import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'
import './hero/hero.css'
import './sections/cards/styles/experience.css'
import './sections/projects/styles/projects.css'
import './sections/footer/styles/footer.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
