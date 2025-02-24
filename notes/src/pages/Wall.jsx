import styles from '../styles/Wall.module.css'
import logoutUser from "@/functions/logoutUser"
import { faArrowRightFromBracket, faFloppyDisk, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router'
import {useState, useEffect} from 'react'
import { db, auth, orderedNote } from "@/firebase/firebase-app";
import { collection, doc, getDocs, deleteDoc, getDoc, addDoc, setDoc, Timestamp } from 'firebase/firestore'




export default function Wall() {
  const router = useRouter()
  
  const objNote = {
    title:'',
    content:'',
    time: Timestamp.fromDate(new Date())
  }

  const [nota, setNota] = useState(objNote)
  const [notas, setNotas] = useState([])
  const [noteId, setNoteId] = useState('')
  const [userName, setUserName] = useState('');

// capturar los inputs
  const ValueTextArea = (e) => {
    const {name, value} = e.target;
    setNota({...nota, [name]:value})
  }
// guardar y actualizar info en firebase
  const createNote = async(e) => {
    e.preventDefault()
    // console.log(nota)
    if(noteId ==='') {
      try {
        await addDoc(collection(db, 'notes'), {
          ...nota
        })
      } catch(error) {
        console.log(error)
      }
    } else {
      await setDoc(doc(db, 'notes', noteId), {
        ...nota
      })
    }
    setNota({...objNote})
    setNoteId('')
  }
// funcion para renderizar las notas
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
    getNote(orderedNote)
  }, [notas]);
 
  const handleLogout = async (e) => {
    await logoutUser()
    router.push('/')
  }

  const deleteNote = async(id) => {
    await deleteDoc(doc(db, 'notes', id))
  }

  const editNote = async(id) => {
    try {
      const docRef = doc(db, 'notes', id)
      const docSnap = await getDoc(docRef)
      setNota(docSnap.data())
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if(noteId !== '') {
      editNote(noteId)
    }
  }, [noteId])

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if(user) {
        setUserName(auth.currentUser.displayName)
      }
    })
  }, [])

    return(
      <>
     <div >
          <div className={styles.header} >
            <div className={styles.heading}>
            <h1 className={styles.nameUser}>Hola {userName}</h1>
            <button onClick={ handleLogout } className= {styles.logout}><FontAwesomeIcon icon={faArrowRightFromBracket} /></button>
            </div>
          </div>
         <div className={styles.containerNote}>
          <div className={styles.note}>
         <form className='flex flex-col' onSubmit={createNote}>
       <h1 className={styles.title}>Agrega una nota</h1>
        
          <textarea name='title' value={nota.title} onChange={ValueTextArea} className={styles.titulo} placeholder="Título"  maxLength='50'></textarea>
          <textarea name='content' value={nota.content} onChange={ValueTextArea} className={styles.notas} placeholder="Nota"  maxLength='2000'></textarea>
          <button type="submit"  className= {styles.save}><FontAwesomeIcon icon={faFloppyDisk} /></button>  
        
    </form>
    </div>
        </div>
        <div className={styles.containerMain}>
        <div className={styles.containerSavedNote}>
          {
            notas.map((note) => (
              <div className={styles.savedNota} key={note.id}>
              <div className='flex flex-col'>
              <div className={styles.savedTitle}>{note.title}</div>
              <div className={styles.savedContent}>{note.content}</div>
              <p className={styles.time} >{note.time.toDate().toLocaleString()}</p>
              <button className={styles.savedButton} ><FontAwesomeIcon icon={faPenToSquare} onClick={()=>setNoteId(note.id)} /></button>
              <button className={styles.delete} ><FontAwesomeIcon icon={faTrash} onClick={()=>deleteNote(note.id)}/></button>
              
              </div>
              </div>
            ))
          }
          </div>
          </div>
        </div>
      </>
    )
  }