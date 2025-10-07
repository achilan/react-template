import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Posts from './pages/Posts';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import PrivateRoute from './utils/PrivateRoute';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, background: '#0ea5e9', color: 'white', display: 'flex', gap: 16 }}>
        <Link to="/" style={{ color: 'white', fontWeight: 500, textDecoration: 'none' }}>Home</Link>
        <Link to="/posts" style={{ color: 'white', fontWeight: 500, textDecoration: 'none' }}>Posts (CRUD)</Link>
        <Link to="/users" style={{ color: 'white', fontWeight: 500, textDecoration: 'none' }}>Usuarios</Link>
        <Link to="/about" style={{ color: 'white', fontWeight: 500, textDecoration: 'none' }}>About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={
          <PrivateRoute>
            <Posts />
          </PrivateRoute>
        } />
        <Route path="/users" element={
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        } />
        <Route path="/users/add" element={
          <PrivateRoute>
            <AddUser />
          </PrivateRoute>
        } />
        <Route path="/users/edit/:id" element={
          <PrivateRoute>
            <EditUser />
          </PrivateRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<h2 style={{ padding: 20 }}>Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  )
}
