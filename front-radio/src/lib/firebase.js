// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

{/***************************************************************************************
 *                                     ATENÇÃO:                                         *
 *  O correto é criar um env para proteger esses dados, mas deixarei aqui para agilizar *
 * quando o responsável técnico rodar o projeto localmente.                             *
 ***************************************************************************************/}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDOuDxW1Nr_g2D9yU4b2J4t1bJzwmsnec",
  authDomain: "radio-browser-ed88a.firebaseapp.com",
  projectId: "radio-browser-ed88a",
  storageBucket: "radio-browser-ed88a.appspot.com",
  messagingSenderId: "45137410852",
  appId: "1:45137410852:web:8e867b7d7b941a38f011b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword  };