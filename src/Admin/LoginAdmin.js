import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../autentikasi/Auth.css';
import loginImage from '../assets/Dokumenty.jpeg';

const LoginAdmin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      const { token, admin } = res.data;

      // Simpan token dan user ke localStorage (atau sessionStorage)
      localStorage.setItem('token', token);
      localStorage.setItem('admin', JSON.stringify(admin));

    alert('Login admin berhasil!');
    navigate('/admin/pengajuan'); // Arahkan ke halaman dashboard admin
  }catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error Mencoba Login Admin');
      }
    }
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
            <button type="submit" className="auth-button">Login</button>
          </form>
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          <p className="auth-link">
            Daftar Admin Baru <Link to="../admin/register">Register</Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
