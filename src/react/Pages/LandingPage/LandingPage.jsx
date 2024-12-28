// LandingPage.jsx
import React from 'react'
import { Container } from '@mui/material'
import useMedsData from '../../../hooks/useMedsData'

const LandingPage = () => {
  const { isLoading, error, lastUpdate } = useMedsData()

  return (
    <Container>
      {isLoading && (
        <div>
          Lade Daten...
        </div>
      )}
      {error && (
        <div>
          Fehler:
          {' '}
          {error}
        </div>
      )}
      {lastUpdate && (
        <div>
          Letztes Update:
          {' '}
          {new Date(lastUpdate).toLocaleString()}
        </div>
      )}
    </Container>
  )
}

export default LandingPage
