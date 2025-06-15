import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import loginImage from '../assets/Dokumenty.jpeg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const fakeUser = { email };
    localStorage.setItem('user', JSON.stringify(fakeUser));
    alert('Login sukses!');
    navigate('/');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-left">
          <img className="auth-image" src={loginImage} alt="Login" />
        </div>
        <div className="auth-right">
          <h2>Log in</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email . . . ."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password . . . ."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
            <label className="checkbox">
              <input type="checkbox" /> Remember me
            </label>
            <button type="submit" className="auth-button">Login</button>
          </form>
          <p className="auth-link">
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
