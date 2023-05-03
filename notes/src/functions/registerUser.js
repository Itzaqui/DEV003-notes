import { auth } from '../firebase/firebase-app';
import { createUserWithEmailAndPassword } from 'firebase/auth';


   export default async function registerUser(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User registered successfully!', user);
      } catch (error) {
        console.error(error);
      }
    }



