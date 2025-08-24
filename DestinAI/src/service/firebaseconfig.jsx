// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmvTJS-3WvbxJE0t1RFmmiGwUmSnxJtkI",
  authDomain: "destinai-70731.firebaseapp.com",
  projectId: "destinai-70731",
  storageBucket: "destinai-70731.firebasestorage.app",
  messagingSenderId: "960642207432",
  appId: "1:960642207432:web:95bf3ebc76b0f946d19ffd",
  measurementId: "G-HBLX0KY8XK"
};

// Initialize Firebase
export  const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
//const analytics = getAnalytics(app);