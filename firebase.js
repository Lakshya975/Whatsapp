
import firebase from 'firebase'

  const firebaseConfig = {
    apiKey: "AIzaSyCxhxrlESqsb96xfPNlhIj5rHu5C2XKXbo",
    authDomain: "whatsapp-db343.firebaseapp.com",
    projectId: "whatsapp-db343",
    storageBucket: "whatsapp-db343.appspot.com",
    messagingSenderId: "827124765101",
    appId: "1:827124765101:web:99c0763998afee72fdd124"
  };
  const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();
  
  const db = app.firestore();
  const auth = app.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export { db, auth, provider };
  
