import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  once: true,
  duration: 500,
})

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './routes/root.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Routes />
  </StrictMode>,
)

