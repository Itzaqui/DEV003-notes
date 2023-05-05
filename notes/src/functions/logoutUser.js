import { auth } from '../firebase/firebase-app';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/router'

export default async function logoutUser() {
    
    try {
        await signOut(auth);
    } catch(error) {
        console.log(error);
    }
    
}
