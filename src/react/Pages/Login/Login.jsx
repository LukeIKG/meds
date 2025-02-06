// Pages/Login/Login.jsx
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { NavLink, useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Box, Typography } from '@mui/material'
import { auth } from '../../../firebase'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { user } = userCredential
        navigate('/landing') // Landingpage
        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }

  return (
    <Container
      maxWidth="xs"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #42a5f5 30%, #90caf9 90%)', // Schöner Farbverlauf
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: '100%',
          padding: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: '25px',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Medikamenten DB
        </Typography>
        <Box component="form" onSubmit={onLogin} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email-address"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              borderRadius: '25px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              transition: 'transform 0.2s ease-in-out',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                '&:hover fieldset': { borderColor: '#42a5f5' },
                '&.Mui-focused fieldset': {
                  borderColor: '#42a5f5',
                  boxShadow: '0px 0px 8px rgba(66, 165, 245, 0.6)',
                },
              },
              '&:focus-within': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              borderRadius: '25px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(8px)',
              transition: 'transform 0.2s ease-in-out',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                '&:hover fieldset': { borderColor: '#42a5f5' },
                '&.Mui-focused fieldset': {
                  borderColor: '#42a5f5',
                  boxShadow: '0px 0px 8px rgba(66, 165, 245, 0.6)',
                },
              },
              '&:focus-within': {
                transform: 'scale(1.05)',
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              borderRadius: '25px',
              paddingY: 1.5,
              transition: 'background-color 0.3s ease-in-out',
              '&:hover': {
                backgroundColor: '#1e88e5',
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
