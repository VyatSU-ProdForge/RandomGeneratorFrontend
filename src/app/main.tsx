import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/app/App'
import '@/app/assets/styles/app.scss'

import { StoragesProvider } from '@providers/use-storages-context'
import { ServicesProvider } from '@providers/use-services-context'
import { AuthProvider } from '@providers/use-auth-context'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoragesProvider>
      <ServicesProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ServicesProvider>
    </StoragesProvider>
  </StrictMode>,
)
