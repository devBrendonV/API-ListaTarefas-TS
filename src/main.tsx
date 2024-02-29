import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ContextProvider } from './Context/index.tsx'
import { CssBaseline } from '@mui/material'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
    <App />
    <CssBaseline/>
    </ContextProvider>
  </React.StrictMode>,
)
