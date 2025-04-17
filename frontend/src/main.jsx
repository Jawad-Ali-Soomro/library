import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))

function renderApp() {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

function renderOfflineMessage() {
  root.render(
    <div style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '24px',
      color: 'red',
      textTransform: 'uppercase'
    }}>
      🚫 No Internet Connection
    </div>
  )
}

navigator.onLine ? renderApp() : renderOfflineMessage()

window.addEventListener('online', renderApp)
window.addEventListener('offline', renderOfflineMessage)
