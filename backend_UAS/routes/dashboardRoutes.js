const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authmiddleware'); // Import middleware

// Rute untuk mendapatkan pengajuan pengguna yang login
// Gunakan authMiddleware untuk melindungi rute ini
router.get('/submissions', authMiddleware, dashboardController.getUserSubmissions);

module.exports = router;