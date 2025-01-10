import React from 'react'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import LandingPage from '../Pages/LandingPage/LandingPage'

// Route path für single page application, Reihenfolge beachten
// firebase init? configs? wenn emulator: //firebase emulators oder so

const RootRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  </Router>
)

export default RootRoutes
