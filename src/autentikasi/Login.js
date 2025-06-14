import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulasi login sukses
    const fakeUser = { email }; // bisa ditambahkan role/nama/ID, dst

    // Simpan ke localStorage
    localStorage.setItem('user', JSON.stringify(fakeUser));

    // Redirect ke halaman utama
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
          alt="Login Illustration"
        />
      </div>
      <div className="auth-form">
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..." 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..." 
              required 
            />
          </div>

          <div className="form-group remember-me">
            <label>
              <input type="checkbox" /> Remember me
            </label>
          </div>

          <button type="submit" className="btn-submit">Login</button>
        </form>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
