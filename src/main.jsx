import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

/* =========================
   NEW : React Router Import
========================= */
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import App from './App.jsx'
import Admin from './pages/admin.jsx'
import Login from './pages/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    {/* =========================
       NEW : BrowserRouter Added
    ========================= */}
    <BrowserRouter>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background: #0A0806;
        }
      `}</style>

      {/* =========================
         NEW : Routes Added
      ========================= */}
      <Routes>

        {/* Home Page */}
        <Route path="/" element={<App />} />

        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Admin Page */}
        <Route path="/admin" element={<Admin />} />

      </Routes>

    </BrowserRouter>

  </StrictMode>
)