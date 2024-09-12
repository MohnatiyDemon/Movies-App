import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GenresProvider } from './components/GenresContext/GenresContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GenresProvider>
      <App />
    </GenresProvider>
  </StrictMode>
)
