
import { useState, useEffect } from "react";
import Papa from "papaparse";
import { doc, setDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import csvData from "../data/lieferengpaesse.csv?raw";


function useMedsData() {
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const [lastUpdate, setLastUpdate] = useState(null);
 const [data, setData] = useState([]);


 useEffect(() => {
   async function loadData() {
     try {
       const result = Papa.parse(csvData, {
         header: true,
         delimiter: ";",
         skipEmptyLines: true,
       });


       const medsRef = collection(db, "meds");


       const processedData = result.data
         .filter((row) => row.Bearbeitungsnummer)
         .map(async (row) => {
           const docRef = doc(medsRef, row.Bearbeitungsnummer);


           const docData = {
             pzn: row.PZN || "N/A",
             arzneimittelbezeichnung: row.Arzneimittelbezeichnung || "N/A", // ich habe die Zeile aktualisiert
             timestamp: new Date().toISOString(),
           };


           await setDoc(docRef, docData);
           return docData;
         });


       const results = await Promise.all(processedData);    // evt. nicht mit promise arbeiten, sondern mit async await; später werden nur veränderte daten in DB geschrieben
       console.log("Geladene Daten:", results); // ich habe die Zeile aktualisiert
       setData(results);
       setLastUpdate(new Date().toISOString());
     } catch (err) {
       console.error("Fehler beim Laden:", err);
       setError(err.message);
     } finally {
       setLoading(false);
     }
   }


   loadData();
 }, []);


 return { loading, error, lastUpdate, data };
}


export default useMedsData;
