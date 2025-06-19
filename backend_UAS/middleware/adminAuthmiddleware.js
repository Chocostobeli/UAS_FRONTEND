const jwt = require('jsonwebtoken');

const authenticateAdminToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401); // No token

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Invalid token

    // Crucial: Check if the user has an 'admin' role
    if (user.role !== 'admin') { // Assuming your token payload includes a 'role'
      return res.status(403).json({ message: 'Akses ditolak: Hanya admin yang diizinkan.' });
    }

    req.user = user; // Attach user payload to request
    next();
  });
};

module.exports = authenticateAdminToken;