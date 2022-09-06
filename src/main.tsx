import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.scss'

ReactDOM.createRoot(document.getElementById('covid19_dashboard') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
