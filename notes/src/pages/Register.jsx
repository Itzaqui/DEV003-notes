import Image from 'next/image'
import styles from '../styles/Register.module.css'
import { useState } from 'react'
import registerUser from '@/functions/registerUser'


export default function Register() {
  const [isRegistering, setIsRegistering] = useState(false)

  async function submitRegister(e) {
    e.preventDefault();
    const email = e.target.email.value;
    // const userName = e.target.userName.value;
    const password = e.target.password.value;
    if(isRegistering) {
      await registerUser(email, password);
    }
  }
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
      
      <form className='flex flex-col' onSubmit={submitRegister}>
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
      <input type='text' className={styles.correo} id='email' placeholder='Correo electrónico' />
      <input type='text'className={styles.correo} id='userName'placeholder='Nombre de usuario' />
      <input type='password' className={styles.correo} id='password' placeholder='Contraseña' />
      <h1 className={styles.termino}>Al crear una cuenta de Note me, aceptas nuestros</h1>
      <h1 className={styles.terminos}>Términos de servicio y Política de Privacidad.</h1>
      <button type='submit' className={styles.registro} onClick={() => setIsRegistering(true)}>REGISTRARTE</button>
      </form>
      </div>
      </div>
  </>
  )
}