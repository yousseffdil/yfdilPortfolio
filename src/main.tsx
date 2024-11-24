import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import RootLayout from './layout.tsx'
import Home from "./page";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootLayout>
      <Home />
    </RootLayout>
  </StrictMode>,
)
