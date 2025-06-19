// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, registeradmin } = require('../controllers/authController');

// Rute untuk register dan login
router.post('/register', register);
router.post('/admin/register', registeradmin);
router.post('/login', login);

module.exports = router;