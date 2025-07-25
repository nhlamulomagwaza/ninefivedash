import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContext from './store/AppContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppContext>

    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AppContext>
  </StrictMode>,
)
