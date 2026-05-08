// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "bitebuddy-19e53.firebaseapp.com",
  projectId: "bitebuddy-19e53",
  storageBucket: "bitebuddy-19e53.firebasestorage.app",
  messagingSenderId: "418196517283",
  appId: "1:418196517283:web:46859336addfa853a0aa16",
  measurementId: "G-XTC2N7M1W0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {app,auth}