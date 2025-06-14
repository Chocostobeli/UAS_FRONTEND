import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link dari react-router-dom
import '../styles/Navbar.css'; // sudah dipindahkan

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">WARISTA</div>
      <ul className="navbar-menu">
        <li><a href="#home">Home</a></li>
        <li><a href="#blog">Blog</a></li>
        <li><a href="#pengajuan">Pengajuan</a></li>
      </ul>
      <div className="navbar-auth">
        <Link to="/login" className="btn login">Login</Link>
       <Link to="/register" className="btn register">Register</Link>
      </div>
    </nav>
  );
};

export default Navbar;
