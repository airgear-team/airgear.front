import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <GoogleOAuthProvider clientId = '1014034272311-60qp8743krm7b55jjkununv85iapmsea.apps.googleusercontent.com'>
          <App />
      </GoogleOAuthProvider>
  </React.StrictMode>,
)
