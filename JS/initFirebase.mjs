/*
*  Init Firebase Application and export application object
*/
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";

// Web app's Firebase configuration
  const firebaseConfig = {
  apiKey: "AIzaSyCWNReM8TfsIwYKNC493A3_B8oIwVopVCs",
  authDomain: "monopoly-2022.firebaseapp.com",
  projectId: "monopoly-2022",
  storageBucket: "monopoly-2022.appspot.com",
  messagingSenderId: "188708481993",
  appId: "1:188708481993:web:bccb8dbca4d86afb8a5618"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };