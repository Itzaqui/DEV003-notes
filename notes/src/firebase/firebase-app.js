import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC-_1RFqPUaWGPaCR8gKxMRF8IOB6hxGMQ",
    authDomain: "lab-notes-ebfd7.firebaseapp.com",
    projectId: "lab-notes-ebfd7",
    storageBucket: "lab-notes-ebfd7.appspot.com",
    messagingSenderId: "1089106340595",
    appId: "1:1089106340595:web:1f72c718b5a1b1093da586",
    measurementId: "G-0HQTYJ4VG2"
  };

  // Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp);

export const orderedNote = (callback) => {
  const q = query(collection(db, 'notes'), orderBy('time', 'desc'));
  onSnapshot(q, callback);
};
