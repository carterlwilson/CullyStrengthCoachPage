import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCfDq2attDqWMrxVXrJxLtFdP3rSXTZFXo',
  authDomain: 'cully-strength.firebaseapp.com',
  projectId: 'cully-strength',
  storageBucket: 'cully-strength.appspot.com',
  messagingSenderId: '374950825055',
  appId: '1:374950825055:web:c6452a92677096d8bd1fea',
  measurementId: 'G-R739SFTWWT'
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
