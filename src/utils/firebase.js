// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: "blogpage-4f066.firebaseapp.com",
  projectId: "blogpage-4f066",
  storageBucket: "blogpage-4f066.firebasestorage.app",
  messagingSenderId: "574882232614",
  appId: "1:574882232614:web:9d64dd52a9c8510d28a9e7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
