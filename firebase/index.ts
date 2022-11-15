import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import { FIREBASE_API_KEY } from '@/config/env'

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: 'evolution-algorithm-oe.firebaseapp.com',
  projectId: 'evolution-algorithm-oe',
  storageBucket: 'evolution-algorithm-oe.appspot.com',
  messagingSenderId: '196763402196',
  appId: '1:196763402196:web:29b5e7f6690259f2ce6041',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize database
export const db = getFirestore(app)
