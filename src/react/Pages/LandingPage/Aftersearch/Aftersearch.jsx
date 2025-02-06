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
  Toolbar,
  CircularProgress,
  Alert,
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load favorites from local storage
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);


  // Simulate loading state (in case of async fetching)
  const fetchData = async () => {
    setLoading(true);
    try {
      // Simulate async operation (if needed)
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (err) {
      setError("Error fetching medication data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some((fav) => fav.id === id);
      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.id !== id);
      } else {
        const medToAdd = meds.find((med) => med.id === id); // Use `meds` directly here
        return medToAdd ? [...prevFavorites, medToAdd] : prevFavorites;
      }
    });
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        overflowY: "auto",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        paddingY: 4,
      }}
    >
      {/* AppBar for Navigation */}
      <AppBar position="static" sx={{ backgroundColor: "#42a5f5" }}>
        <Toolbar>
          <Button
            variant="text"
            color="inherit"
            onClick={() => navigate("/landing")}
            sx={{ fontSize: 16, fontWeight: "bold" }}
          >
            Back to Landing Page
          </Button>
        </Toolbar>
      </AppBar>

       {/* Favorites Section */}
       <Box mt={4} sx={{ textAlign: "center" }}>
        <Typography variant="h5" gutterBottom sx={{ color: "#444", fontWeight: "bold" }}>
          My Favorites
        </Typography>
        {favorites.length > 0 ? (
          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {favorites.map((fav) => (
              <Grid item xs={12} sm={6} md={4} key={fav.id}>
                <Card
                  variant="outlined"
                  sx={{
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    boxShadow: 2,
                    transition: "transform 0.2s ease-in-out",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardContent sx={{ padding: 2 }}>
                    <Typography variant="h6" sx={{ color: "#42a5f5", fontWeight: "bold" }}>
                      {fav.arzneimittelbezeichnung}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Wirkstoffe: {fav.wirkstoff || "N/A"}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="body1" sx={{ color: "#777", fontStyle: "italic", mt: 2 }}>
            No favorites yet!
          </Typography>
        )}
      </Box>

      <Typography variant="h4" gutterBottom sx={{ textAlign: "center", color: "#333", mt: 3 }}>
        Medication List
      </Typography>

      {/* Loading and Error Handling */}
      {loading && (
        <Grid container justifyContent="center" sx={{ my: 2 }}>
          <CircularProgress />
        </Grid>
      )}
      {error && (
        <Alert severity="error" sx={{ my: 2 }}>
          {error}
        </Alert>
      )}

      {/* Medication List */}
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {meds.map((medikament) => (
          <Grid item xs={12} sm={6} md={4} key={medikament.id}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: 2,
                boxShadow: 3,
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardContent sx={{ flexGrow: 1, padding: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#42a5f5", fontWeight: "bold" }}>
                  {medikament.arzneimittelbezeichnungNormalized || "Unknown"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Wirkstoffe: {medikament.wirkstoff || "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Begin: {medikament.beginn || "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Ende: {medikament.ende || "N/A"}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Lieferbar: {medikament.lieferbar || "Nein"}
                </Typography>
              </CardContent>

              <CardActions sx={{ justifyContent: "center", paddingBottom: 2 }}>
                <Button
                  variant="contained"
                  color={favorites.some((fav) => fav.id === medikament.id) ? "secondary" : "primary"}
                  onClick={() => toggleFavorite(medikament.id)}
                  sx={{ width: "90%", fontWeight: "bold" }}
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

    </Container>
  );
}

export default Aftersearch;
