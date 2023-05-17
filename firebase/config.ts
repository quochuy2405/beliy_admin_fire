import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyCrVC4qMogDlwnYlRWL2Ajzxg0AmuY9FNg',
  authDomain: 'beliystoreadmin.firebaseapp.com',
  projectId: 'beliystoreadmin',
  storageBucket: 'beliystoreadmin.appspot.com',
  messagingSenderId: '688011164935',
  appId: '1:688011164935:web:6d6a59eba7b6781e5059a2',
  measurementId: 'G-H4ML234RQD'
}
// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()
const storageRef = storage.ref()
// Use these for db & auth
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { auth, db, storageRef }
export default firebase
