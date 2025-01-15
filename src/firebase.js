// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'


// Luke: hier müsst ihr die config eintragen, die ich euch gegeben habe und die datei umbenennen in firebase.js
const firebaseConfig = {
 apiKey: 'AIzaSyDWz6vY26iRdK7crThkounWXSq5eZcUEFg',
 authDomain: 'meds-d2e97.firebaseapp.com',
 projectId: 'meds-d2e97',
 storageBucket: 'meds-d2e97.firebasestorage.app',
 messagingSenderId: '168862220729',
 appId: '1:168862220729:web:118cce02e3c82088023668',
 measurementId: 'G-NQ5TX8D3XN'
}



// initialisieren
const app = initializeApp(firebaseConfig)

// instanzen für verwedung in app
export const db = getFirestore(app)
export const auth = getAuth(app)