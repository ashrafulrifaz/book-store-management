import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvIWodefUMBV4EbYh_AXKuGxKuQ-mq39U",
  authDomain: "book-store-management-10f8e.firebaseapp.com",
  projectId: "book-store-management-10f8e",
  storageBucket: "book-store-management-10f8e.appspot.com",
  messagingSenderId: "770776195010",
  appId: "1:770776195010:web:f12dddba36c8107a0a005b",
  measurementId: "G-7070D03C44"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;