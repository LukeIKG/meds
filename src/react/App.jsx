import React from 'react'
import { createRoot } from 'react-dom/client'

import { CssBaseline } from '@mui/material'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import RootRoutes from './Routes/RootRoutes'

const theme = createTheme({
  typography: {
    fontFamily: [
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif'
    ].join(',')
  },
  palette: {
    primary: { main: '#8BF7C3', gradient: 'linear-gradient(to bottom, #8BF7C3, #06C96B)' },
    secondary: { main: '#EA4A4A' },
    scenidBlue: { main: '#3200BE', gradient: 'linear-gradient(to bottom, #3200BE, #280097)', gradientHorizontal: 'linear-gradient(to left, #3200BE, #280097)' },
    scenidDarkBlue: { main: '#280097' },
    background: {
      default: '#8BF7C3',
      primary: '#8BF7C3'
    },
    text: {
      primary: '#000000',
      secondary: '#EA4A4A'
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        html, body { width: 100%; height: 100%; }
        body { width: 100%; height: 100%; overflow: hidden; }
        #app { display: flex; width: 100%; height: 100%; overflow: hidden; }
      `
    }
  }
})

const container = document.getElementById('app')
const root = createRoot(container)
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <RootRoutes />
  </ThemeProvider>
)
