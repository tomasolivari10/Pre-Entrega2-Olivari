import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBvhdQDzrHZIYj5JeEKSiaXtARDv_AxYwk",
  authDomain: "ecommerce-d36b2.firebaseapp.com",
  projectId: "ecommerce-d36b2",
  storageBucket: "ecommerce-d36b2.appspot.com",
  messagingSenderId: "844903816367",
  appId: "1:844903816367:web:eff0f62c1ebe33d16b885a"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);
export const auth = getAuth(appFirebase);


const db = getFirestore()

export default db