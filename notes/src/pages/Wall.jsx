import logoutUser from "@/functions/logoutUser"
import styles from '../styles/Wall.module.css'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Wall() {
    return <div>
      <header className={styles.header} style={{
         display: 'grid',
         alignItems: 'center',
         gridAutoColumns: '98%',
         height: '100%'
        }}>
        <div className={styles.heading} >
          <h1 className={styles.nameUser}>Hola User</h1>
          <button onClick={ logoutUser } className= {styles.logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
          </div>
      </header>
      <div className={styles.containerNote} style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
      
    }}>
      
    <form className='flex flex-col' >
       <h1 className={styles.title}>Agrega una nota</h1>
        <div > 
          <textarea className={styles.titulo} placeholder="Título"  maxlength='2000'></textarea>
          <textarea className={styles.notas} placeholder="Nota"  maxlength='2000'></textarea>
        </div>
    </form>
  
    </div>
      
      
      </div>
  }