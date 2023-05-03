import Image from 'next/image'
import styles from '../styles/Register.module.css'
import { useState } from 'react'
import registerUser from '@/functions/registerUser'
import GoogleLoginButton from '@/functions/loginWithGoogle'
import { useRouter } from 'next/router'



export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  console.log([email, password, userName])

  const submitRegister = (e) => {
    e.preventDefault();
    registerUser(email, password);
  };

  return (
    <>
    <Image alt="Fondo de Login"
      src='/images/notes-login.png'
      width={700}
      height={480}
      sizes="100vw"
      style={{
        zIndex: -1,
        position: 'fixed',
        width: '100%',
        height: '100vh',
      }}></Image>
  <div>
    
      <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100vh'
     
    }}>
      
      <form className='flex flex-col' class='form' onSubmit={submitRegister} >
      <GoogleLoginButton/>
      <input type='email' className={styles.correo} value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Correo electrónico' />
      <input type='text'className={styles.correo} value={userName} onChange={(e) => setUserName(e.target.value)} placeholder='Nombre de usuario' />
      <input type='password' className={styles.correo} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Contraseña' />
      <h1 className={styles.termino}>Al crear una cuenta de Note me, aceptas nuestros</h1>
      <h1 className={styles.terminos}>Términos de servicio y Política de Privacidad.</h1>
      
      <button type="submit" className={styles.registro} >REGISTRARTE</button>
    
      </form>
      </div>
      </div>
  </>
  )
}