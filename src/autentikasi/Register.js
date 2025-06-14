import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  return (
    <div className="auth-container">
      <div className="auth-image">
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
          alt="Register"
        />
      </div>
      <div className="auth-form">
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Full name . . . ." required />
          <input type="email" placeholder="Email . . . ." required />
          <input type="password" placeholder="Password . . . ." required />
          <input
            type="password"
            placeholder="Confirm Password . . . ."
            required
          />

          <label className="terms">
            <input type="checkbox" /> Dengan mendaftar, saya menyetujui Ketentuan Layanan dan Kebijakan Privasi yang berlaku.
          </label>

          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
