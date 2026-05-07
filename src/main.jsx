// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Admin from './pages/admin.jsx'
import Login from './pages/Login.jsx'

function Root() {
  const [view, setView] = useState("login")

  if (view === "login") {
    return (
      <>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Lato:wght@300;400;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0A0806; }
        `}</style>
        <Login
          onAdmin={() => setView("admin")}
          onGuest={() => setView("guest")}
        />
      </>
    )
  }

  if (view === "admin") return <Admin onLogout={() => setView("login")} />
  if (view === "guest") return <App onLogout={() => setView("login")} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode><Root /></StrictMode>
)