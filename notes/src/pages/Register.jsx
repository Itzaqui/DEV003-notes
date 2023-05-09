import Image from 'next/image'
import styles from '../styles/Register.module.css'
import { useState } from 'react'
import registerUser from '@/functions/registerUser'
import GoogleLoginButton from '@/functions/loginWithGoogle'
import { useRouter } from 'next/router'



export default function Register() {
  const router = useRouter()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  // console.log([email, password, userName])

  const submitRegister = (e) => {
    e.preventDefault();
    registerUser(email, password);
  };

  return (
    <>
  <div>
    
      <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh',
      backgroundColor: '#FBF4E5'
     
    }}>
      <Image
              src='/images/note-top.png'
              alt='Flower Top'
              className={styles.flowerTop}
              width={260}
              height={260}
              />
      
      <form className='flex flex-col' onSubmit={submitRegister} >
      <h1 className={styles.mainTitle}>MY NOTES</h1>
      <GoogleLoginButton/>
      <input type='email' className={styles.correo} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo electrónico' />
      <input type='text'className={styles.correo} value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Nombre de usuario' />
      <input type='password' className={styles.correo} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
      <h1 className={styles.termino}>Al crear una cuenta de Note me, aceptas nuestros</h1>
      <h1 className={styles.terminos}>Términos de servicio y Política de Privacidad.</h1>
      
      <button type="submit" className={styles.registro} onClick={()=>router.push('/')}  >REGISTRARTE</button>
    
      </form>
      <Image
    src="/images/note-bottom.png"
    alt="Flower Bottom"
    className={styles.flowerBottom}
    width={300}
    height={300}
    />
      </div>
      </div>
  </>
  )
}