import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App'
import 'mapbox-gl/dist/mapbox-gl.css'
// import 'bootstrap/dist/css/bootstrap.min.css'


createRoot(document.getElementById('root')).render(
  // <GoogleOAuthProvider clientId='975919988789-eb21d8ggbh8mtef41ips5k1rp20mslqs.apps.googleusercontent.com'>
  <App />
  // </GoogleOAuthProvider>
)