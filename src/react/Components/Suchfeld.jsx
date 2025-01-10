// Import React, useState und useEffect
import React, { useState, useEffect } from "react";
import Papa from "papaparse"; // Für CSV-Verarbeitung

// Suchfeld-Komponente
const Suchfeld = () => {
  const [suchText, setSuchText] = useState(""); // Suchtextzustand
  const [medikamente, setMedikamente] = useState([]); // Medikamenten-Daten
  const [gefilterteMedikamente, setGefilterteMedikamente] = useState([]); // Gefilterte Ergebnisse

  // CSV-Daten laden und parsen
  useEffect(() => {
    const fetchCSVData = async () => {
      try {
        const response = await fetch("/data/lieferengpässe.csv");
        const csvText = await response.text();

        // CSV mit PapaParse parsen
        const parsedData = Papa.parse(csvText, { header: true });
        setMedikamente(parsedData.data);
      } catch (error) {
        console.error("Fehler beim Laden der CSV-Daten:", error);
      }
    };

    fetchCSVData();
  }, []);

  // Handler für Suchtextänderungen
  const handleSuchTextÄnderung = (event) => {
    const wert = event.target.value;
    setSuchText(wert);

    // Filtere die Medikamentenliste basierend auf dem Suchtext
    const gefiltert = medikamente.filter((medikament) =>
      medikament.Arzneimittelbezeichnung?.toLowerCase().includes(wert.toLowerCase())
    );
    setGefilterteMedikamente(gefiltert);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Medikamente-Suche</h1>
      <input
        type="text"
        placeholder="Medikament suchen..."
        value={suchText}
        onChange={handleSuchTextÄnderung}
        style={{ padding: "10px", width: "300px", borderRadius: "5px" }}
      />
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
            <strong>{medikament.Arzneimittelbezeichnung}</strong>
            <p>PZN: {medikament.PZN}</p>
            <p>Wirkstoffe: {medikament.Wirkstoffe}</p>
            <p>Beginn: {medikament.Beginn}</p>
            <p>Ende: {medikament.Ende}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Suchfeld;