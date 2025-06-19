const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
<<<<<<< HEAD
const authMiddleware = require('../middleware/authmiddleware'); // Import middleware
=======
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware
>>>>>>> 7ae4d61b808098af7fdfe806eeddc5f2f299a100

// Rute untuk mendapatkan pengajuan pengguna yang login
// Gunakan authMiddleware untuk melindungi rute ini
router.get('/submissions', authMiddleware, dashboardController.getUserSubmissions);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 7ae4d61b808098af7fdfe806eeddc5f2f299a100
