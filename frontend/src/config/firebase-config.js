// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import env from '../../env'

const firebaseConfig = {
  apiKey: 'AIzaSyD75whGW5AzrT71g3lPcuS7k9O3-9QHrNE',
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.PROJECT_ID,
  storageBucket: env.STORAGE_BUCKET,
  messagingSenderId: env.MESSAGING_SENDER_ID,
  appId: env.APP_ID,
  measurementId: env.MEASUREMENT_ID
};


const app = initializeApp(firebaseConfig);
export const googleProvider=new GoogleAuthProvider();
export const auth=getAuth(app);