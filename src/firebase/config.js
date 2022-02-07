import { initializeApp } from "firebase/app";
import { 
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth
} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyBpJ0lsCGJat-a9Wkx2WLxU5NAmt_WIR_c",
  authDomain: "vue-blog-system-53894.firebaseapp.com",
  projectId: "vue-blog-system-53894",
  storageBucket: "vue-blog-system-53894.appspot.com",
  messagingSenderId: "505258635013",
  appId: "1:505258635013:web:1fc4d46a2cd49b7e6ad16c"
};

initializeApp(firebaseConfig)

let db = getFirestore();
let auth = getAuth();


export default (db,auth);


