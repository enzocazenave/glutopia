import { createRoot } from 'react-dom/client'
import { Router } from './router/Router'

const rootElement = document.getElementById('root')

createRoot(rootElement).render(<Router />)