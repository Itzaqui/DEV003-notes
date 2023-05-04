import logoutUser from "@/functions/logoutUser"
import styles from '../styles/Wall.module.css'
import { faArrowRightFromBracket, faFloppyDisk, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useState, useEffect} from 'react'
import { auth, createNote, updateNote, db } from "@/firebase/firebase-app";
import { Timestamp, collection, doc, getDocs, deleteDoc } from 'firebase/firestore'



export default function Wall() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [notas, setNotas] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const note = {title, content}
    await createNote(note)
    setTitle('')
    setContent('')
  }

  useEffect(() => {
    const getNote = async() => {
      try {
        const loadNote = await getDocs(collection(db, 'notes'))
        const docs = []
        loadNote.forEach((doc) => {
          docs.push({...doc.data(), id: doc.id})
        })
        setNotas(docs)

      } catch(error) {
        console.log(error)
      }
    } 
    getNote()
  }, [notas]);

  const deleteNote = async(id) => {
    await deleteDoc(doc(db, 'notes', id))
  }

    return(
      <>
      <div >
          <div className={styles.header} >
            <div className={styles.heading}>
            <h1 className={styles.nameUser}>Hola User</h1>
            <button onClick={ logoutUser } className= {styles.logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
            </div>
          </div>
         <div className={styles.containerNote}>
          <div className={styles.note}>
         <form className='flex flex-col' onSubmit={handleSubmit}>
       <h1 className={styles.title}>Agrega una nota</h1>
        <div > 
          <textarea id='title' value={title} onChange={(e) => setTitle(e.target.value)} className={styles.titulo} placeholder="Título"  maxLength='50'></textarea>
          <textarea id='content' value={content} onChange={(e) => setContent(e.target.value)} className={styles.notas} placeholder="Nota"  maxLength='2000'></textarea>
          <button type="submit"  className= {styles.save}><FontAwesomeIcon icon={faFloppyDisk} /></button>  
        </div>
    </form>
    </div>
        </div>
        <div className={styles.containerMain}>
        <div className={styles.containerSavedNote}>
          
          {notas.map((note) => (
               <div key={note.id} className={styles.savedNota} >
                <div className='flex flex-col'>
                <div className={styles.savedTitle}>{note.title}</div>
                <div className={styles.savedContent}>{note.content}</div>
                <button className={styles.savedButton} ><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button className={styles.delete} ><FontAwesomeIcon icon={faTrash} onClick={()=>deleteNote(note.id)}/></button>
                </div> 
               </div> 
               
            ))}

          
          </div>
          </div>
      
         
      </div>

      </>
    )
  }