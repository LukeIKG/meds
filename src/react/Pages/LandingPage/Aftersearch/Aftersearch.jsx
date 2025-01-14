import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Box,
  AppBar,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function Aftersearch() {
  const location = useLocation();
  const navigate = useNavigate();

  const [meds, setMeds] = useState(location.state?.meds || []); // Get meds from router state
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = (med) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === med.id)
        ? prevFavorites.filter((fav) => fav.id !== med.id)
        : [...prevFavorites, med]
    );
  };

  return (
    <Container maxWidth="md">
      <AppBar position="static">
        <Box>
          <Button
            variant="text"
            color="inherit"
            onClick={() => navigate("/LandingPage")}
          >
            Back to Landing Page
          </Button>
        </Box>
      </AppBar>

      <Typography variant="h4" gutterBottom>
        Medication List
      </Typography>

      {/* Medication List */}
      <Grid container spacing={3}>
        {meds.map((med, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{med.Arzneimittelbezeichnung}</Typography>
                <Typography variant="body2" color="textSecondary">
                  Active Ingredient: {med.Wirkstoffe}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Start Date: {med.Beginn}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  End Date: {med.Ende}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color={favorites.some((fav) => fav.id === med.id) ? "error" : "primary"}
                  onClick={() => toggleFavorite(med)}
                >
                  {favorites.some((fav) => fav.id === med.id) ? "Unfavorite" : "Favorite"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Favorites Section */}
      <Box mt={4}>
        <Typography variant="h5" gutterBottom>
          My Favorites
        </Typography>
        {favorites.length > 0 ? (
          <Grid container spacing={3}>
            {favorites.map((fav) => (
              <Grid item xs={12} sm={6} md={4} key={fav.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6">{fav.name}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Active Ingredient: {fav.Wirkstoffe}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1">No favorites yet!</Typography>
        )}
      </Box>
    </Container>
  );
}

export default Aftersearch;
