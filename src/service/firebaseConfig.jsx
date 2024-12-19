// Import Firebase and Firestore functions
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDm_TjdMR-tQ2bAHelvf72w4K67Es2tCjo",
  authDomain: "jnvjonjovno.firebaseapp.com",
  projectId: "jnvjonjovno",
  storageBucket: "jnvjonjovno.firebasestorage.app",
  messagingSenderId: "1090902413341",
<<<<<<< HEAD
  appId: "1:1090902413341:web:25669102a4f1b8444b36f4",
=======
  appId: "1:1090902413341:web:25669102a4f1b8444b36f4"
>>>>>>> 30bcd85c710919ae86cecd01205d0ca8d0c5edc7
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
