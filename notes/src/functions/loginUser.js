import { auth } from '../firebase/firebase-app';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default async function loginUser(email, password) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
    } catch(error) {
        console.log(error);
    }
    
}