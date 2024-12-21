// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD75whGW5AzrT71g3lPcuS7k9O3-9QHrNE",
  authDomain: "hostelmate-18b5d.firebaseapp.com",
  projectId: "hostelmate-18b5d",
  storageBucket: "hostelmate-18b5d.firebasestorage.app",
  messagingSenderId: "320452676799",
  appId: "1:320452676799:web:f651abbedb03af5c7a8a0a",
  measurementId: "G-J4V79PJM0J"
};

const app = initializeApp(firebaseConfig);
export const googleProvider=new GoogleAuthProvider();
export const auth=getAuth(app);