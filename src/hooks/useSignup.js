import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase/confing';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

import { useAuth } from '../context/AuthContext';

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const { dispatch } = useAuth();

  const signUp = async (email, passowrd, userName, thumbnail) => {
    setError(null);
    setIsPending(true);
    try {
      //signup user
      const res = await createUserWithEmailAndPassword(auth, email, passowrd);

      if (!res) {
        throw new Error('Could not complete signup');
      }

      // upload user thumbnail
      const uploadPath = `thumbnail/${res.user.uid}/${thumbnail.name}`;
      const storageRef = ref(storage, uploadPath);
      const img = await uploadBytes(storageRef, thumbnail);

      const imgUrl = await getDownloadURL(img.ref);

      //add username to user
      await updateProfile(res.user, { displayName: userName, photoURL: imgUrl });

      //create a user document
      await setDoc(doc(db, 'users', res.user.uid), {
        online: true,
        displayName: userName,
        photoURL: imgUrl,
      });

      //dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }

      // console.log(res.user);
      // console.log(auth.currentUser);
    } catch (error) {
      if (!isCancelled) {
        console.log(error.message);
        setIsPending(false);
        setError(error.message);
      }
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signUp };
};
