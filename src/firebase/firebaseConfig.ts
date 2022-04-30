import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyByMZ4t1_zP03xNd7eJeuIlI5tXl3c9FgU',
  authDomain: 'bonsa-io.firebaseapp.com',
  projectId: 'bonsa-io',
  storageBucket: 'bonsa-io.appspot.com',
  messagingSenderId: '248875711278',
  appId: '1:248875711278:web:1850d30ee34e14c807d8bf',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
