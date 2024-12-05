import React from 'react'
import { Container } from '@mui/material'
import meldungen from '../../../LEMeldungen_2024-11-22-11-42-13.csv'
//Luke: Ich habe hier raw-loader benutzt, um die csv-Datei zu importieren. siehe SO
//https://stackoverflow.com/questions/52210467/adding-a-csv-file-to-a-webpack-build
//yarn add -D raw-loader

const LandingPage = () => (
  <Container maxWidth={false} disableGutters>
    <pre>{meldungen}</pre>
  </Container>
)

export default LandingPage