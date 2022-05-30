import './navbar.css';
import { GiGreekTemple } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user } = useAuth();
  const { logout, isPending } = useLogout();
  return (
    <div className='navbar'>
      <ul>
        <li className='logo'>
          <GiGreekTemple className='fa' />
          <span>Gettign Tasks Done</span>
        </li>
        <li>{!user && <Link to='/login'>Login</Link>}</li>
        <li>{!user && <Link to='/signup'>Signup</Link>}</li>
        <li>
          {!isPending && user && (
            <button className='btn' onClick={logout}>
              Logout
            </button>
          )}
          {isPending && user && (
            <button disabled className='btn' onClick={logout}>
              Logging out...
            </button>
          )}
        </li>
      </ul>
    </div>
  );
}
