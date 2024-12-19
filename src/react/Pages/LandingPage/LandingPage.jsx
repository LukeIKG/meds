import React, { useEffect } from 'react'
import { Container } from '@mui/material'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../../firebase'

const LandingPage = () => {
  useEffect(() => {
    const testUpload = async () => { // async um auf antwort von await zu warten
      const referenz = doc(db, 'meds', '00822819') // pzn als eindeutiger identifier
      await setDoc(referenz, {
        pzn: '00822819',
        enr: '2152997',
        bearbeitungsnummer: 'LE2024004233',
        referenzierteErstmeldung: 'N/A',
        meldungsart: 'Erstmeldung',
        beginn: '21.11.2024',
        ende: '31.01.2025',
        datumLetzteMeldung: '21.11.2024',
        artDesGrundes: 'Sonstige',
        arzneimittelbezeichnung: 'RISPERDAL CONSTA 50 mg',
        atcCode: 'N05AX08',
        wirkstoff: 'Risperidon',
        krankenhausrelevant: 'nein',
        zulassungsinhaber: 'JANSSEN-CILAG GmbH',
        telefon: '+49 2137 955-2288',
        email: 'QS-DE@its.jnj.com',
        grund: 'Erhöhte Nachfrage',
        anmerkungZumGrund: 'N/A',
        alternativpraeparat: 'N/A',
        datumErstmeldung: '21.11.2024',
        infoAnFachkreise: 'Vorgesehen',
        darreichungsform: 'Pulver zur Herstellung einer Depot-Injektionssuspension, Lösungsmittel',
        timestamp: new Date().toISOString()
      })
      console.log('testdatensatz gespeichert')
    }

    testUpload()
  }, [])

  return (
    <Container>
      FB test
    </Container>
  )
}

export default LandingPage
