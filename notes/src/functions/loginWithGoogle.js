import { auth } from '../firebase/firebase-app';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from '../styles/Login.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router'


export default function GoogleLoginButton() {
  const router = useRouter()
  async function loginWithGoogle(e) {
    e.preventDefault();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      router.push('/Wall')
    }  catch(error) {
      console.log(error);
    }
  }
  return(
    <button type="button" onClick={loginWithGoogle} className={styles.buttonGoogle} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    <div className={styles.containerGoogle}>
    <Image
              src="/images/logo-google.png"
              alt="Google Logo"
              className={styles.googleLogo}
              width={35}
              height={35}
            />
    <h1 className={styles.google}>Inicia sesión con Google</h1>
    </div>
    </button>
  )
}
