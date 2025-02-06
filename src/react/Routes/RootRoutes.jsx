import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LandingPage from "../Pages/LandingPage/LandingPage";
import Login from "../Pages/Login/Login";
import Aftersearch from "../Pages/LandingPage/Aftersearch/Aftersearch";

const RootRoutes = () => {
  // Load favorites from localStorage when the app starts
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite function (shared between LandingPage & Aftersearch)
  const toggleFavorite = (id, meds = []) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== id);
      } else {
        const medToAdd = meds.find((med) => med.id === id);
        return medToAdd ? [...prevFavorites, medToAdd] : prevFavorites;
      }
    });
  };
  
  // Route path für single page application, Reihenfolge beachten
// firebase init? configs? wenn emulator: //firebase emulators oder so
// evt. user login irgendwie if(!user) is logged in boolean user !islogged in return loginPage; is LoggedIn&& landing page; runde klammern wie return; evt. fake element als parent (fragment)
// evt. userContext; um Route pakcen
// beim laden der app medikamentenkontext evt.

// bis jetzt landing nicht geschützt; direkt aufrufbar

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/landing"
          element={<LandingPage favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
        <Route
          path="/aftersearch"
          element={<Aftersearch favorites={favorites} toggleFavorite={toggleFavorite} />}
        />
      </Routes>
    </Router>
  );
};

export default RootRoutes;