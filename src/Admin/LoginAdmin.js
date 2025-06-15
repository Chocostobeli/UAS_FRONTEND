import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../autentikasi/Auth.css';
import loginImage from '../assets/Dokumenty.jpeg';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulasi login admin
    const fakeAdmin = { email, role: 'admin' };
    localStorage.setItem('admin', JSON.stringify(fakeAdmin));
    alert('Login admin berhasil!');
    navigate('/admin/profile'); // Arahkan ke halaman dashboard admin
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-left">
          <img className="auth-image" src={loginImage} alt="Login Admin" />
        </div>
        <div className="auth-right">
          <h2>Login Admin / Notaris</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="email"
                placeholder="Email admin"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
