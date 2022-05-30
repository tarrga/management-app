import { createContext, useReducer, useContext, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/confing';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'LOGIN_FIRST_TIME':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

const AuthProvider = (props) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, authIsReady: false });
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: 'LOGIN_FIRST_TIME', payload: user });
      } else {
        dispatch({ type: 'LOGIN_FIRST_TIME', payload: null });
      }
    });
  }, []);

  return <AuthContext.Provider {...props} value={{ ...state, dispatch }} />;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Not inside of provider');
  return context;
};

export { AuthProvider, useAuth };
