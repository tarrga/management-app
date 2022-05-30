import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/confing';

export const useDocument = (collection, id) => {
  const [document, setDocument] = useState();
  const [error, setError] = useState(null);

  //realtime data for document

  useEffect(() => {
    let onMount = true;
    const unsub = onSnapshot(
      doc(db, collection, id),
      (doc) => {
        if (onMount) {
          setError(null);
          setDocument({ ...doc.data(), id: doc.id });
        }
      },
      (error) => {
        console.log(error);
        setError(error.message);
      }
    );

    return () => {
      onMount = false;
      unsub();
      // console.log('usubscibed from useDocument');
    };
  }, [collection, id]);

  return { document, error };
};
