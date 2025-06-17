// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Rute untuk register dan login
router.post('/register', register);
router.post('/login', login);

module.exports = router;
