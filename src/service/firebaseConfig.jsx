// Import Firebase and Firestore functions
import { initializeApp , getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJq2cqUxqkXWx7eLmlMglp2ijt6y0FnnM",
  authDomain: "personal-402e1.firebaseapp.com",
  projectId: "personal-402e1",
  storageBucket: "personal-402e1.firebasestorage.app",
  messagingSenderId: "607903508051",
  appId: "1:607903508051:web:cc12ff2f767defe94748a6",
  measurementId: "G-SSQPZC3VZG"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
