import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css'; // pastikan file ini ada dan diimport

const Login = () => {
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
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email..." 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
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
