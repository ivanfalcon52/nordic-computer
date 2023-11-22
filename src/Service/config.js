import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "tienda--nordic.firebaseapp.com",
    projectId: "tienda--nordic",
    storageBucket: "tienda--nordic.appspot.com",
    messagingSenderId: "512557301545",
    appId: "1:512557301545:web:b248596a13535fe2104138"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//"AIzaSyBAbodRF3NtbkAMJlNXg_cmtLGfZ80QMPc"