import styles from '../styles/Login.module.css'
import Image from 'next/image'
import GoogleLoginButton from '../functions/loginWithGoogle'
import loginUser from '@/functions/loginUser'
import { useState } from 'react'
import { useRouter } from 'next/router'


export default function Login() {
  const router = useRouter()
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  async function submitHandler(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);
      await loginUser(email, password);
      router.push('/Wall')
  }
  
  return (
    <>
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
              
    <form className='flex flex-col' onSubmit={submitHandler}>
    <h1 className={styles.mainTitle}>MY NOTES</h1>
      <input type='text' className={styles.correo} id='email' placeholder='Correo' />
      <input type='password' className={styles.correo} id='password' placeholder='Contraseña' />
      <button type='submit' onClick={() => setIsLoggingIn(true)} className={styles.inicio}>INICIAR SESIÓN</button>
      <button type='button' onClick={()=>router.push('/Register')} className={styles.registro}>REGISTRARSE</button>
     
      
      <GoogleLoginButton />

      
    </form>

    <Image
    src="/images/note-bottom.png"
    alt="Flower Bottom"
    className={styles.flowerBottom}
    width={300}
    height={300}
    />
    
    </div> 
    
    </>
   

    
  )
}
  
