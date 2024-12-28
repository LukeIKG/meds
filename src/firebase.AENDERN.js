// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Luke: hier müsst ihr die config eintragen, die ich euch gegeben habe und die datei umbenennen in firebase.js
const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
}

// initialisieren
const app = initializeApp(firebaseConfig)

// instanzen für verwedung in app
export const db = getFirestore(app)
export const auth = getAuth(app)
