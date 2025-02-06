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

  // Get meds from router state
  const [meds, setMeds] = useState(
    location.state?.meds.map((med, index) => ({ ...med, id: med.id || index })) || []
  );
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
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some((fav) => fav.id === id)
        ? prevFavorites.filter((fav) => fav.id !== id)
        : [...prevFavorites, meds.find((med) => med.id === id)]
    );
  };

  return (
    <Container maxWidth="md"
    sx={{
      overflowY: "auto",
      height: "100vh",
    }}
    >
      <AppBar position="static">
        <Box p={1}>
          <Button variant="text" color="inherit" onClick={() => navigate("/")}>
            Back to Landing Page
          </Button>
        </Box>
      </AppBar>

      <Typography variant="h4" gutterBottom>
        Medication List
      </Typography>

      {/* Medication List */}
      <div>
        <Grid container spacing={3}>
          {meds.map((medikament) => (
            <Grid item xs={12} sm={6} md={4} key={medikament.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {medikament.arzneimittelbezeichnungNormalized || "Unknown"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Wirkstoffe: {medikament.Wirkstoffe || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Begin: {medikament.beginn || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Ende: {medikament.ende || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    lieferbar: {medikament.lieferbar || "N/A"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color={
                      favorites.some((fav) => fav.id === medikament.id)
                        ? "secondary"
                        : "primary"
                    }
                    onClick={() => toggleFavorite(medikament.id)}
                  >
                    {favorites.some((fav) => fav.id === medikament.id)
                      ? "Remove from Favorites"
                      : "Add to Favorites"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>

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
                    <Typography variant="h6">{fav.arzneimittelbezeichnung}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Wirkstoffe: {fav.Wirkstoffe || "N/A"}
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
