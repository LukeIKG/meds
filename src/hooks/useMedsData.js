import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { doc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore'
import { db } from '../firebase'
import csvData from '../data/lieferengpaesse.csv?raw'

const isLieferbar = (endeDatum) => { // hilfsfunktion um einfacher überblick zu ahben,w as lieferbar ist/ wo es engpässe gibt.
  if (!endeDatum || endeDatum === 'N/A') return false
  const ende = new Date(endeDatum)
  const heute = new Date()
  return ende < heute
}

// umgang mit umlauten
const cleanedCsvData = csvData
  .replace(/�/g, 'Ae') // Ä -> Ae
  .replace(/�/g, 'ae') // ä -> ae
  .replace(/�/g, 'Oe') // Ö -> Oe
  .replace(/�/g, 'oe') // ö -> oe
  .replace(/�/g, 'Ue') // Ü -> Ue
  .replace(/�/g, 'ue') // ü -> ue
  .replace(/�/g, 'ss') // ß -> ss

// vereinfachen arzneimittelname
const normalizeMedName = (name) => {
  if (!name) return ''

  return name
    .replace(/\s+\d+([,.]?\d*)?\s*(mg|g|ml|µg|mcg)\/?(ml|h|g|mg)?(\s+|$)/i, ' ') // mengenangaben löschen, da wir gesagt haben, größen lassen wir erstmal außenvor
    .replace(/\s+hartkapseln\b/i, '')
    .replace(/\s+filmtabletten\b/i, '')
    .replace(/\s+tabletten\b/i, '')
    .replace(/\s+retardtabletten\b/i, '')
    .replace(/\s+retardiert\b/i, '')
    .replace(/\s+depot\b/i, '')
    .replace(/\s+injektionslösung\b/i, '')
    .replace(/\s+infusionslösung\b/i, '')
    .replace(/\s+pulver\b/i, '')
    .replace(/\s+und\s+lösungsmittel\b/i, '')
    .trim()
    .toUpperCase()
}

function useMedsData() { // arrowfunction
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const medsRef = collection(db, 'meds')
        // const snapshot = await getDocs(medsRef)
        // const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref))
        // await Promise.all(deletePromises)
        // console.log('Alle existierenden Dokumente gelöscht')

        const result = Papa.parse(cleanedCsvData, {
          header: true,
          delimiter: ';',
          skipEmptyLines: true
        })

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
              lieferbar: isLieferbar(row.Ende),
              datumLetzteMeldung: row['Datum der letzten Meldung'] || 'N/A',
              artDesGrundes: row['Art des Grundes'] || 'N/A',
              arzneimittelbezeichnung: row.Arzneimittlbezeichnung || 'N/A',
              arzneimittelbezeichnungNormalized: normalizeMedName(row.Arzneimittlbezeichnung),
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

            // await setDoc(docRef, docData)
            return docData
          })

        const results = await Promise.all(processedData)

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
