import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes } from 'firebase/storage'
import { db, storage } from './config'

// Create a new document
const create = async (collectionRef: any, data: object) => {
  const docRef = await addDoc(collectionRef, data)
  return docRef.id
}
// Read a single document
const read = async (collectionName: string, id: string) => {
  const docRef = doc(collection(db, collectionName), id)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() }
  } else {
    return null
  }
}

// Read all documents in a collection
const readAll = async (collectionRef: any) => {
  const querySnapshot = await getDocs(collectionRef)
  const documents = []
  querySnapshot.docs.forEach((doc: any) => {
    documents.push({ id: doc.id, ...doc.data() })
  })
  return documents
}

// Update a document
const update = async (collectionRef: any, id: string, data: object) => {
  await updateDoc(doc(collectionRef, id), data)
}

// Delete a document
const deleteItem = async (collectionRef: any, id: string) => {
  await deleteDoc(doc(db, collectionRef, id))
}

const addImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return snapshot.metadata.fullPath
}

export { create, deleteItem, read, readAll, update, addImage }
