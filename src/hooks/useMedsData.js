import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { doc, setDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'
import csvData from '../data/lieferengpaesse.csv?raw'

function useMedsData() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const result = Papa.parse(csvData, {
          header: true,
          delimiter: ';',
          skipEmptyLines: true
        })

        const medsRef = collection(db, 'meds')

        const processedData = result.data
          .filter(row => row.Bearbeitungsnummer)
          .map(async (row) => {
            const docRef = doc(medsRef, row.Bearbeitungsnummer)

            const docData = {
              pzn: row.PZN || 'N/A',
              enr: row.ENR || 'N/A',
              bearbeitungsnummer: row.Bearbeitungsnummer || 'N/A',
              referenzierteErstmeldung: row['Referenzierte Erstmeldung'] || 'N/A',
              meldungsart: row.Meldungsart || 'N/A',
              beginn: row.Beginn || 'N/A',
              ende: row.Ende || 'N/A',
              datumLetzteMeldung: row['Datum der letzten Meldung'] || 'N/A',
              artDesGrundes: row['Art des Grundes'] || 'N/A',
              arzneimittelbezeichnung: row.Arzneimittlbezeichnung || 'N/A',
              atcCode: row['Atc Code'] || 'N/A',
              wirkstoff: row.Wirkstoffe || 'N/A',
              krankenhausrelevant: row.Krankenhausrelevant || 'N/A',
              zulassungsinhaber: row.Zulassungsinhaber || 'N/A',
              telefon: row.Telefon || 'N/A',
              email: row['E-Mail'] || 'N/A',
              grund: row.Grund || 'N/A',
              anmerkungZumGrund: row['Anm. zum Grund'] || 'N/A',
              alternativpraeparat: row.Alternativpraeparat || 'N/A',
              datumErstmeldung: row['Datum der Erstmeldung'] || 'N/A',
              infoAnFachkreise: row['Info an Fachkreise'] || 'N/A',
              darreichungsform: row.Darreichungsform || 'N/A',
              timestamp: new Date().toISOString()
            }

            await setDoc(docRef, docData)
            return docData
          })

        const results = await Promise.all(processedData) // evt. nicht mit promise arbeiten, sondern mit async await; später werden nur veränderte daten in DB geschrieben

        setData(results)
        setLastUpdate(new Date().toISOString())
        console.log(`${results.length} Datensätze geladen`)
      } catch (err) {
        console.error('Fehler beim Laden:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return { loading, error, lastUpdate, data }
}

export default useMedsData
