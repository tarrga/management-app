import { useEffect, useRef, useState } from 'react';
import { auth, db } from '../firebase/confing';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useAuth } from '../context/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';

export const useLogin = () => {
  const isCan = useRef(false);
  // const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuth();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    //sign user out
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      //update state
      if (!isCan.current) {
        await dispatch({ type: 'LOGIN', payload: res.user });
        setIsPending(false);
        setError(null);
      }
      await updateDoc(doc(db, 'users', res.user.uid), { online: true });
    } catch (error) {
      if (!isCan.current) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      // setIsCancelled(true);
      isCan.current = true;
      console.log('is cancel:', isCan.current);
    };
  }, []);

  return { login, error, isPending };
};
