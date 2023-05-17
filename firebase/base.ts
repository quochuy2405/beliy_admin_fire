import { db } from './config'

// Create a new document
const create = async (collection, data) => {
  const docRef = await db.collection(collection).add(data)
  return docRef.id
}

// Read a single document
const read = async (collection, id) => {
  const docRef = await db.collection(collection).doc(id).get()
  if (docRef.exists) {
    return { id: docRef.id, ...docRef.data() }
  } else {
    return null
  }
}

// Read all documents in a collection
const readAll = async (collection) => {
  const querySnapshot = await db.collection(collection).get()
  const documents = []
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() })
  })
  return documents
}

// Update a document
const update = async (collection, id, data) => {
  await db.collection(collection).doc(id).update(data)
}

// Delete a document
const deleteDoc = async (collection, id) => {
  await db.collection(collection).doc(id).delete()
}

export { create, deleteDoc, read, readAll, update }
