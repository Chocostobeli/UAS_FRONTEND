import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import registerImage from '../assets/Dokumenty.jpeg';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }

    if (!agreed) {
      alert('Anda harus menyetujui syarat dan ketentuan.');
      return;
    }

    localStorage.setItem('user', JSON.stringify({ fullName, email }));
    alert('Registrasi berhasil!');
    navigate('/login');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <div className="auth-left">
          <img className="auth-image" src={registerImage} alt="Register" />
        </div>
        <div className="auth-right">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <input
                type="text"
                placeholder="Full name . . . ."
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
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
            <div className="input-group">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password . . . ."
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
            <label className="checkbox">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              {' '}
              Dengan mendaftar, saya menyetujui Ketentuan Layanan dan Kebijakan Privasi yang berlaku.
            </label>
            <button type="submit" className="auth-button">Register</button>
          </form>
          <p className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
