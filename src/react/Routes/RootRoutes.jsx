import React from 'react'

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

import LandingPage from '../Pages/LandingPage/LandingPage'
import Login from '../Pages/Login/Login'
import Aftersearch from '../Pages/LandingPage/Aftersearch/Aftersearch'

// Route path für single page application, Reihenfolge beachten
// firebase init? configs? wenn emulator: //firebase emulators oder so
// evt. user login irgendwie if(!user) is logged in boolean user !islogged in return loginPage; is LoggedIn&& landing page; runde klammern wie return; evt. fake element als parent (fragment)
// evt. userContext; um Route pakcen
// beim laden der app medikamentenkontext evt.

// bis jetzt landing nicht geschützt; direkt aufrufbar
const RootRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/aftersearch" element={<Aftersearch />} />
    </Routes>
  </Router>
)

export default RootRoutes
