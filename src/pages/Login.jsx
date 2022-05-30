import React from 'react';
import './login.css';
import { useState } from 'react';
import { useLogin } from '../hooks/useLogin';

export default function Login() {
  const [email, setEmail] = useState('guest@gmail.com');
  const [password, setPassword] = useState('qweasd');
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>email:</span>
        <input type='email' required onChange={(e) => setEmail(e.target.value)} value={email} />
      </label>
      <label>
        <span>password:</span>
        <input type='password' required onChange={(e) => setPassword(e.target.value)} value={password} />
      </label>

      {!isPending && (
        <button type='submit' className='btn'>
          Login
        </button>
      )}
      {isPending && (
        <button disabled type='submit' className='btn'>
          Loading
        </button>
      )}
      {error && <div className='error'>{error}</div>}
    </form>
  );
}
