import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  CircularProgress,
  Alert,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Such-Icon
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import { useNavigate } from "react-router-dom";

const Suchfeld = () => {
  const [suchText, setSuchText] = useState("");
  const [medikamente, setMedikamente] = useState([]);
  const [gefilterteMedikamente, setGefilterteMedikamente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  // Daten aus Firestore laden
  useEffect(() => {
    const fetchMedikamente = async () => {
      try {
        const medsRef = collection(db, "meds");
        const querySnapshot = await getDocs(medsRef);
        const medsData = querySnapshot.docs.map((doc) => doc.data());
        setMedikamente(medsData);
        setGefilterteMedikamente(medsData);
      } catch (err) {
        setError("Fehler beim Laden der Medikamente");
        console.error("Fehler beim Laden der Medikamente:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedikamente();
  }, []);

  // Favoriten aus localStorage laden
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Favoriten entfernen
  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const handleSearch = () => {
    navigate("/aftersearch", { state: { meds: gefilterteMedikamente } });
  };

  // Filtere Medikamente basierend auf dem Suchtext
  useEffect(() => {
    if (suchText === "") {
      setGefilterteMedikamente(medikamente);
      return;
    }

    const gefiltert = medikamente.filter((medikament) =>
      medikament.arzneimittelbezeichnung
        ?.toLowerCase()
        .includes(suchText.toLowerCase())
    );

    setGefilterteMedikamente(gefiltert);
  }, [suchText, medikamente]);

  return (
    <div
      style={{
        background: "linear-gradient(45deg, #42a5f5 30%, #90caf9 90%)",
        minHeight: "100vh",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
        Meine Favoriten
      </Typography>
      <Grid container spacing={2}>
        {favorites.length > 0 ? (
          favorites.map((fav) => (
            <Grid item xs={12} sm={6} md={4} key={fav.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {fav.arzneimittelbezeichnungNormalized}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Wirkstoffe: {fav.wirkstoff || "N/A"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeFavorite(fav.id)}
                  >
                    Entfernen
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
            Noch keine Favoriten gespeichert!
          </Typography>
        )}
      </Grid>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Medikamente-Suche
        </Typography>

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

        {/* Floating Search Bar */}
        <Grid
          container
          justifyContent="center"
          spacing={2}
          sx={{
            position: "sticky",
            top: "20px",
            zIndex: 1000,
            background: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            p: 2,
            borderRadius: "25px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)",
            },
            my: 2,
          }}
        >
          {/* Suchfeld (Autocomplete) */}
          <Grid item xs={12} sm={8} md={6}>
            <Autocomplete
              options={gefilterteMedikamente}
              getOptionLabel={(option) => option.arzneimittelbezeichnung || ""}
              value={suchText ? { arzneimittelbezeichnung: suchText } : null}
              onInputChange={(event, newInputValue) => setSuchText(newInputValue)}
              onChange={(event, newValue) =>
                setSuchText(newValue ? newValue.arzneimittelbezeichnung : "")
              }
              renderOption={(props, option, { inputValue }) => {
                const matches = match(option.arzneimittelbezeichnung, inputValue);
                const parts = parse(option.arzneimittelbezeichnung, matches);

                return (
                  <li {...props} style={{ padding: "8px", borderRadius: "8px" }}>
                    {parts.map((part, index) => (
                      <span
                        key={index}
                        style={{
                          fontWeight: part.highlight ? 700 : 400,
                          color: part.highlight ? "#42a5f5" : "inherit",
                        }}
                      >
                        {part.text}
                      </span>
                    ))}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Medikament suchen"
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "25px",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(8px)",
                    transition: "transform 0.2s ease-in-out",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px",
                      "&:hover fieldset": { borderColor: "#42a5f5" },
                      "&.Mui-focused fieldset": {
                        borderColor: "#42a5f5",
                        boxShadow: "0px 0px 8px rgba(66, 165, 245, 0.6)",
                      },
                    },
                    "&:focus-within": {
                      transform: "scale(1.05)",
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "#42a5f5", mr: 1, fontSize: "1.6rem" }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              sx={{ width: "100%", transition: "all 0.3s ease-in-out" }}
              clearOnEscape
              disableClearable
            />
          </Grid>

          {/* Angepasster Suchen-Button */}
          <Grid item sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{
                borderRadius: "25px",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                transition: "transform 0.2s ease-in-out, background-color 0.3s ease-in-out",
                color: "#42a5f5",
                paddingX: 2,
                paddingY: 1.5,
                minHeight: "56px", // Gleiche Höhe wie das TextField (Standardhöhe)
                boxShadow: "0px 0px 8px rgba(66, 165, 245, 0.6)",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Suchen
            </Button>
          </Grid>
        </Grid>

        {/* Liste der gefilterten Medikamente */}
        <Grid container spacing={2}>
          {gefilterteMedikamente.map((medikament, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  transition: "box-shadow 0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {medikament.arzneimittelbezeichnung}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>PZN:</strong> {medikament.pzn}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Wirkstoffe:</strong> {medikament.wirkstoff}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Beginn:</strong> {medikament.beginn}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Ende:</strong> {medikament.ende}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default Suchfeld;
