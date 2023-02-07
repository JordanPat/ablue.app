// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwz5HJ1JU9vU81xqRZ-vvTT01leuxSGcg",
  authDomain: "acadianblue.firebaseapp.com",
  projectId: "acadianblue",
  storageBucket: "acadianblue.appspot.com",
  messagingSenderId: "873774044425",
  appId: "1:873774044425:web:3dcd1d0f14f07fc61dafd8",
  measurementId: "G-5BVPWNY1WP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
