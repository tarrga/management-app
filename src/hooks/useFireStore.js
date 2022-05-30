import { useReducer, useState, useEffect, useRef } from 'react';
import { collection, doc, serverTimestamp, addDoc, deleteDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/confing';

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_PENDING':
      return { isPending: true, document: null, success: null, error: null };
    case 'ADDED_DOCUMENT':
      return { isPending: false, document: action.payload, success: true, error: null };
    case 'UPDATED_DOCUMENT':
      return { isPending: false, documment: action.payload, success: true, error: null };
    case 'ERROR':
      return { isPending: false, document: null, success: false, error: action.payload };
    default:
      return state;
  }
};

export const useFirestore = (collec) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const isCancelled = useRef(false);
  const [isCan, setIsCan] = useState(false);

  //collection ref

  //add document
  const addDocument = async (addedDoc) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      const addedDocument = await addDoc(collection(db, collec), { ...addedDoc, createdAt: serverTimestamp() });
      if (!isCancelled.current) {
        console.log(isCancelled.current);
        console.log('useState:', isCan);
        dispatch({ type: 'ADDED_DOCUMENT', payload: addedDocument });
      }
    } catch (error) {
      if (!isCancelled.current) {
        console.log(error.message);
        dispatch({ type: 'ERROR', paylaod: error.message });
      }
    }
  };

  //delete a document
  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, collec, id));
  };

  //update document
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PANDING' });
    try {
      const updatedDoc = await updateDoc(doc(db, collec, id), {
        comment: updates,
      });
      if (!isCancelled) {
        dispatch({ type: 'UPDATED_DOCUMENT', payload: updatedDoc });
      }
    } catch (error) {
      if (!isCancelled.current) {
        console.log(error.message);
        dispatch({ type: 'ERROR', paylaod: error.message });
      }
    }
  };

  useEffect(() => {
    return () => {
      isCancelled.current = true;
      setIsCan(true);
    };
  }, []);

  return { addDocument, deleteDocument, response, updateDocument };
};
