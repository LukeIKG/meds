import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import für Lupe
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Suchfeld = () => {
  const [suchText, setSuchText] = useState("");
  const [medikamente, setMedikamente] = useState([]);
  const [gefilterteMedikamente, setGefilterteMedikamente] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        background: "linear-gradient(45deg, #2196f3 30%, #4caf50 90%)", // Sanfter Farbverlauf (blau zu grün)
        minHeight: "100vh", // Hintergrund über die gesamte Seite
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Container maxWidth="md" sx={{ paddingY: 4 }}>
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

        {/* Suchfeld mit Lupe, abgerundeten Ecken und Fokus-Effekt */}
        <Grid
          container
          justifyContent="center"
          sx={{
            my: 2,
            background: "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)", // Hintergrundfarbe Verlauf
            padding: 3,
            borderRadius: "12px",
          }}
        >
          <Grid item xs={12} sm={8} md={6}>
            <Autocomplete
              options={gefilterteMedikamente}
              getOptionLabel={(option) => option.arzneimittelbezeichnung || ""}
              onInputChange={(event, newInputValue) => setSuchText(newInputValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Medikament suchen..."
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "25px",
                    backgroundColor: "#fff",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px",
                      "&:hover fieldset": { borderColor: "primary.main" },
                      "&.Mui-focused fieldset": {
                        borderColor: "#1976d2",
                        boxShadow: "0px 0px 5px #1976d2",
                      },
                    },
                  }}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: <SearchIcon color="disabled" sx={{ mr: 1 }} />, // Such-Icon links
                  }}
                />
              )}
              sx={{ width: "100%" }}
              clearOnEscape
              disableClearable
            />
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
                    <strong>Wirkstoffe:</strong> {medikament.wirkstoffe}
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
