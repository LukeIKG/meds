import React, { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; // Firebase-Instanz importieren

const Suchfeld = () => {
  const [suchText, setSuchText] = useState(""); // Suchtext für Filterung
  const [medikamente, setMedikamente] = useState([]); // Alle Medikamente
  const [gefilterteMedikamente, setGefilterteMedikamente] = useState([]); // Gefilterte Medikamente
  const [loading, setLoading] = useState(true); // Ladezustand
  const [error, setError] = useState(null); // Fehlerzustand

  // Daten aus Firestore laden
  useEffect(() => {
    const fetchMedikamente = async () => {
      try {
        const medsRef = collection(db, "meds");
        const querySnapshot = await getDocs(medsRef);
        const medsData = querySnapshot.docs.map((doc) => doc.data());
        setMedikamente(medsData); // Alle Medikamente speichern
        setGefilterteMedikamente(medsData); // Zeige alle Medikamente initial
      } catch (err) {
        setError("Fehler beim Laden der Medikamente");
        console.error("Fehler beim Laden der Medikamente:", err);
      } finally {
        setLoading(false); // Ladeanzeige beenden
      }
    };

    fetchMedikamente();
  }, []);

  // Filtere Medikamente basierend auf dem Suchtext
  useEffect(() => {
    if (suchText === "") {
      setGefilterteMedikamente(medikamente); // Wenn der Suchtext leer ist, alle Medikamente anzeigen
      return;
    }

    const gefiltert = medikamente.filter((medikament) =>
      medikament.arzneimittelbezeichnung
        ?.toLowerCase()
        .includes(suchText.toLowerCase()) // Filtere nach Arzneimittelbezeichnung
    );

    setGefilterteMedikamente(gefiltert); // Gefilterte Daten setzen
  }, [suchText, medikamente]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Medikamente-Suche</h1>

      {loading && <div>Lade Daten...</div>} {/* Ladeanzeige */}
      {error && <div>{error}</div>} {/* Fehleranzeige */}

      {/* Autocomplete Feld */}
      <Autocomplete
        options={gefilterteMedikamente}
        getOptionLabel={(option) => option.arzneimittelbezeichnung || ""}
        onInputChange={(event, newInputValue) => setSuchText(newInputValue)} // Aktualisiere den Suchtext
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
            console.log("Ausgewähltes Medikament:", value); // Gibt das ausgewählte Medikament aus
          }
        }}
        style={{ width: 300 }}
        clearOnEscape // Damit der Text gelöscht wird, wenn ESC gedrückt wird
        disableClearable // Verhindert das Leeren der Eingabe beim Klicken auf das Kreuz (außer mit ESC)
      />

      {/* Liste der gefilterten Medikamente */}
      <ul style={{ marginTop: "20px", listStyleType: "none", padding: 0 }}>
        {gefilterteMedikamente.map((medikament, index) => (
          <li
            key={index}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              marginBottom: "5px",
            }}
          >
            <strong>{medikament.arzneimittelbezeichnung}</strong>
            <p>PZN: {medikament.pzn}</p>
            <p>Wirkstoffe: {medikament.wirkstoffe}</p>
            <p>Beginn: {medikament.beginn}</p>
            <p>Ende: {medikament.ende}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suchfeld;
