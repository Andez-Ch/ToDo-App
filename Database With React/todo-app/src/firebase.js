// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAh6HBfuBpo2mSBfS06mL4ZzR4btU8d2nw",
  authDomain: "todo-app-b3185.firebaseapp.com",
  projectId: "todo-app-b3185",
  storageBucket: "todo-app-b3185.appspot.com",
  messagingSenderId: "342475128274",
  appId: "1:342475128274:web:08c7df1478ebcf99dc5c0b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Storage
export const storage = getStorage(app);

//export { db, storage };
