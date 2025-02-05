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

      {/* Autocomplete-Feld */}
      <Grid container justifyContent="center" sx={{ my: 2 }}>
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
            />
          )}
          onChange={(event, value) => {
            if (value) {
              console.log("Ausgewähltes Medikament:", value);
            }
          }}
          sx={{ width: "100%", maxWidth: 400 }}
          clearOnEscape
          disableClearable
        />
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
  );
};

export default Suchfeld;
