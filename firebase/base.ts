import { db, storageRef } from './config'

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

// Upload a file to Firebase Storage
const uploadImage = async (file, folderName, fileName) => {
  // Create a new storage location for the file
  const fileRef = storageRef.child(`${folderName}/${fileName}`)

  // Upload the file to the storage location
  const snapshot = await fileRef.put(file)

  // Get the download URL for the file
  const downloadURL = await snapshot.ref.getDownloadURL()

  // Return the download URL
  return downloadURL
}
export { create, deleteDoc, read, readAll, update, uploadImage }
