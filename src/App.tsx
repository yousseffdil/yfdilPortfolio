import PortFolio from './Components/Portfolio'
import './App.css'
import { Analytics } from "@vercel/analytics/react"
function App() {
  return (
    <>
      <PortFolio />
      <Analytics/>
    </>
  )
}

export default App
