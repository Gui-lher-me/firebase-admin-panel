import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAGcEzjqO0vNPHQr0ZjTlTRMaYgwiETThg',
  authDomain: 'frontly-acb60.firebaseapp.com',
  databaseURL: 'https://frontly-acb60-default-rtdb.firebaseio.com',
  projectId: 'frontly-acb60',
  storageBucket: 'frontly-acb60.appspot.com',
  messagingSenderId: '972967902286',
  appId: '1:972967902286:web:355f9b1fcd3d74a439d71f',
  measurementId: 'G-BZKGRQCVG6',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
