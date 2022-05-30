import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAzWoOouG-bMMF0p4avxEFlPHcFrjficEs',
  authDomain: 'management-c52e7.firebaseapp.com',
  projectId: 'management-c52e7',
  storageBucket: 'management-c52e7.appspot.com',
  messagingSenderId: '955331981063',
  appId: '1:955331981063:web:993fede85dd62762dcdfa2',
};

// init firebase
const app = initializeApp(firebaseConfig);

//init firestore
const db = getFirestore(app);
//inint auth
const auth = getAuth(app);
//init storage
const storage = getStorage(app);

export { db, auth, storage };
