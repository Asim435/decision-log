import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Demo from './pages/Demo.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/decision-log">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
