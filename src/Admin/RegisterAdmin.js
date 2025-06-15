import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Autentikasi/Auth.css';
import registerImage from '../assets/Dokumenty.jpeg';

const RegisterAdmin = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    if (adminCode !== 'NOTARIS2025') {
      alert('Kode admin salah. Hubungi pengelola sistem.');
      return;
    }

    // Simulasi penyimpanan data admin
    localStorage.setItem('admin', JSON.stringify({ fullName, email }));
    alert('Registrasi Admin berhasil!');
    navigate('/login-admin');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-left">
          <img className="auth-image" src={registerImage} alt="Register Admin" />
        </div>
        <div className="auth-right">
          <h2>Registrasi Notaris / Admin</h2>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Nama lengkap"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
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
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Konfirmasi Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </span>
            </div>
            <div className="input-group">
              <input
                type="text"
                placeholder="Kode Admin (rahasia)"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="auth-button">Daftar sebagai Admin</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterAdmin;
