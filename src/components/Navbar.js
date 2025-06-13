import React from 'react';
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
        <button className="btn login">Login</button>
        <button className="btn register">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
