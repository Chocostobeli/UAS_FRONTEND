const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const authenticateToken = require('../middleware/authmiddleware'); // Middleware for general users
const upload = require('../middleware/upload'); // Assuming this multer/fileupload setup is shared
=======
const authenticateToken = require('../middleware/authmiddleware');
const upload = require('../middleware/upload');
>>>>>>> 7ae4d61b808098af7fdfe806eeddc5f2f299a100
const profileController = require('../controllers/profileController');

// --- User Profile Routes ---
// This route will be accessible at /api/users/profile (GET)
router.get('/profile', authenticateToken, (req, res) => {
  console.log('✅ Route /api/users/profile (GET) ter-trigger');
  profileController.getProfile(req, res); // Calls the user-specific getProfile method
});

// This route will be accessible at /api/users/profile (PUT)
router.put('/profile', authenticateToken, upload.single('foto'), (req, res) => {
  console.log('✅ Route /api/users/profile (PUT) ter-trigger');
  profileController.updateProfile(req, res); // Calls the user-specific updateProfile method
});

module.exports = router;
