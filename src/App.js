import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Create from './pages/Create';
import Project from './pages/Project';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import OnlineUsers from './components/OnlineUsers';

function App() {
  const { authIsReady, user } = useAuth();
  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          {user && <Sidebar />}
          <div className='container'>
            <Navbar />
            <Routes>
              <Route path='/' element={<PrivateRoute user={user} navigatePath='/login' />}>
                <Route path='/' element={<Dashboard />} />
              </Route>
              <Route path='/create' element={<PrivateRoute user={user} navigatePath='/login' />}>
                <Route path='/create' element={<Create />} />
              </Route>
              <Route path='/projects/:id' element={<PrivateRoute user={user} navigatePath='/login' />}>
                <Route path='/projects/:id' element={<Project />} />
              </Route>
              <Route path='/login' element={<PrivateRoute user={!user} navigatePath='/' />}>
                <Route path='/login' element={<Login />} />
              </Route>
              <Route path='/signup' element={<PrivateRoute user={!user} navigatePath='/' />}>
                <Route path='/signup' element={<Signup />} />
              </Route>
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
