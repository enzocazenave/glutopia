import { createRoot } from 'react-dom/client'
import { Router } from './router/Router'
import { AuthProvider } from './context/AuthContext'

const rootElement = document.getElementById('root')

createRoot(rootElement).render(
  <AuthProvider>
    <Router />
  </AuthProvider>
)