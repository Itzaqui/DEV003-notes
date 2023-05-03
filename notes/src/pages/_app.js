import '@/styles/globals.css'
import '../../public/fonts.css';
import { useState } from 'react'
import Wall from './Wall'
import Login from '.'
import Register from './Register';
import { auth } from '../firebase/firebase-app'
import { onAuthStateChanged } from 'firebase/auth'


// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

 export default function App() {
  
  const [user, setUser] = useState(null);
  onAuthStateChanged(auth, firebaseUser => {
    if(firebaseUser) {
      setUser(firebaseUser)
    } else {
      setUser(null)
    }
  })
  return user ? <Wall user={user} /> : <Login/>
 
}

