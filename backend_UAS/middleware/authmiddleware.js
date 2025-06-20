// middleware/authmiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  console.log('--- Authenticate Token Middleware ---');
  console.log('Received Authorization Header:', authHeader);

  if (!token) {
    console.log('Token is null, returning 401 Unauthorized.');
    return res.status(401).json({ message: 'Token tidak ditemukan.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification error (from authenticateToken):', err.message);
      // Tambahkan logging detail error JWT
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token kedaluwarsa. Mohon login kembali.' });
      } else if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: 'Token tidak valid. Mohon login kembali.' });
      }
      return res.status(403).json({ message: 'Token tidak valid atau kedaluwarsa.' });
    }
    req.user = user; // user payload: { id: ..., role: ... }
    console.log('Token verified. Decoded user payload (req.user):', req.user); // Log payload user
    next();
  });
};

const authorizeAdmin = (req, res, next) => {
    console.log('--- Authorize Admin Middleware ---');
    console.log('req.user for authorization (in authorizeAdmin):', req.user); // Harusnya sudah diisi oleh authenticateToken

    if (!req.user) {
        console.log('req.user is undefined/null in authorizeAdmin. Token might be missing or invalid.');
        return res.status(401).json({ message: 'Tidak terotentikasi.' });
    }

    if (req.user.role === 'admin' || req.user.role === 'notaris') {
        console.log(`User role (${req.user.role}) is authorized.`);
        next();
    } else {
        console.log(`User role (${req.user.role}) is NOT authorized. Returning 403 Forbidden.`);
        return res.status(403).json({ message: 'Tidak diizinkan. Hanya Admin atau Notaris yang dapat mengakses.' });
    }
};

module.exports = { authenticateToken, authorizeAdmin };