import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_APP_NAME,
  FIREBASE_SENDER_ID,
} from '@/config/env'

// Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_APP_NAME}.firebaseapp.com`,
  projectId: FIREBASE_APP_NAME,
  storageBucket: `${FIREBASE_APP_NAME}.appspot.com`,
  messagingSenderId: FIREBASE_SENDER_ID,
  appId: FIREBASE_APP_ID,
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize database
export const db = getFirestore(app)
