import { useEffect, useState, useRef } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/confing';
import { signOut } from 'firebase/auth';

import { useAuth } from '../context/AuthContext';

export const useLogout = () => {
  const isCan = useRef(false);
  // const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuth();

  const logout = async () => {
    console.log(auth.currentUser);
    setError(null);
    setIsPending(true);

    //sign user out
    try {
      const { uid } = user;
      await updateDoc(doc(db, 'users', uid), { online: false });
      await signOut(auth);
      console.log(auth.currentUser);
      dispatch({ type: 'LOGOUT' });

      //update state
      if (!isCan.current) {
        setIsPending(false);
        setError(null);
      }
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
    };
  }, []);

  return { error, isPending, logout };
};
