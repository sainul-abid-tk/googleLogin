
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getDatabase} from "firebase/database"

const firebaseConfig = {
  apiKey: "AIzaSyAPmntB0Po3S7T5PnolePlpCqfOeylny5E",
  authDomain: "authentication-4ba69.firebaseapp.com",
  databaseURL: "https://authentication-4ba69-default-rtdb.firebaseio.com",
  projectId: "authentication-4ba69",
  storageBucket: "authentication-4ba69.appspot.com",
  messagingSenderId: "1091894405720",
  appId: "1:1091894405720:web:2eb42b231c1e40a88bf82d",
  measurementId: "G-HTYYVMZTNS"
};

// Initialize Firebase
const app=initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const db=getDatabase(app)
