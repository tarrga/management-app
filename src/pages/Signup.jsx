import React, { useState } from 'react';
import { useSignup } from '../hooks/useSignup';
import './signup.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signUp, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    if (!selected) {
      setThumbnailError('Please select a file');
      return;
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image');
      return;
    }
    if (selected.size > 100000) {
      setThumbnail('Image file size must be less than 100kb');
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
  };
  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <label>
        <span>email:</span>
        <input type='email' required onChange={(e) => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>password:</span>
        <input type='password' required onChange={(e) => setPassword(e.target.value)} value={password} />
      </label>
      <label>
        <span>display name:</span>
        <input type='text' required onChange={(e) => setDisplayName(e.target.value)} value={displayName} />
      </label>
      <label>
        <span>profile thumbnail:</span>
        <input type='file' required onChange={handleFileChange} />
        {thumbnailError && <div className='error'>{thumbnailError}</div>}
      </label>
      {!isPending && (
        <button type='submit' className='btn'>
          Sign up
        </button>
      )}
      {isPending && (
        <button disabled type='submit' className='btn'>
          Loading
        </button>
      )}
    </form>
  );
}
