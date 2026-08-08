import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA5itsJbDwYo_fLnXWrJoCZSfVCqbyVscM',
  authDomain: 'serauto-bbd05.firebaseapp.com',
  projectId: 'serauto-bbd05',
  storageBucket: 'serauto-bbd05.firebasestorage.app',
  messagingSenderId: '1022170629598',
  appId: '1:1022170629598:web:fe13020c2b627d7a69c94f',
}

export const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
