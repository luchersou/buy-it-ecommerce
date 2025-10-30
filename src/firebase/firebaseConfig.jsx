// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvnCvsBqLJyQdYwx3lqsE0IZWoHi6TKt0",
  authDomain: "buyit-authentication.firebaseapp.com",
  projectId: "buyit-authentication",
  storageBucket: "buyit-authentication.firebasestorage.app",
  messagingSenderId: "232216035627",
  appId: "1:232216035627:web:125e45a984db82f185056e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);