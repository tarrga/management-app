import { useEffect, useRef, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '../firebase/confing';

export const useCollection = (coll, _queryString, _orderBy) => {
  const [documents, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const queryString = useRef(_queryString).current;
  const orderByRef = useRef(_orderBy).current;

  useEffect(() => {
    // const q = query(collection(db, coll), where('state', '==', 'CA'));
    let q;
    if (queryString && orderByRef) {
      q = query(collection(db, coll), where(...queryString), orderBy(...orderByRef));
    } else if (queryString && !orderByRef) {
      q = query(collection(db, coll), where(...queryString));
    } else {
      q = collection(db, coll);
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        // console.log(querySnapshot);
        const arr = [];
        querySnapshot.forEach((doc) => {
          arr.push({ ...doc.data(), id: doc.id });
          // console.log(doc.data());
        });
        //update states
        setDocument(arr);
        setError(null);
      },
      (err) => {
        console.log(err.message);
        setError('could not fetch the data');
      }
    );
    // console.log(documents);

    //unsub unmount
    return () => unsubscribe();
  }, [coll, queryString, orderByRef]);

  return { documents, error };
};
