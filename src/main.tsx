import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './style.css'
import './overrides.css'
import './project-media.css'

createRoot(document.getElementById('app')!).render(<StrictMode><App /></StrictMode>)
