// Import Firebase and Firestore functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYSai2kOjiYy-DQqnV5g527N5E4RBSWU0",
  authDomain: "aitripgenerator-deda0.firebaseapp.com",
  projectId: "aitripgenerator-deda0",
  storageBucket: "aitripgenerator-deda0.appspot.com",
  messagingSenderId: "1055480369815",
  appId: "1:1055480369815:web:a08518043cbc5529a88fd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
