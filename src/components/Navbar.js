import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    navigate('/'); // <-- diarahkan ke halaman utama ("/"), bukan login
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">WARISTA</div>
      <ul className="navbar-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#pengajuan">Pengajuan</a></li>
      </ul>

      <div className="navbar-auth">
        {!user ? (
          <>
            <Link to="/login" className="btn login">Login</Link>
            <Link to="/register" className="btn register">Register</Link>
          </>
        ) : (
          <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
              👤 {user.email.split('@')[0]} ⌄
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/dashboard/profile">Dashboard</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
