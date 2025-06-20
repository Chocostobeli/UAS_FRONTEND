// routes/profileRoutes.js
const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeAdmin } = require('../middleware/authmiddleware'); // Ini yang benar
const upload = require('../middleware/upload'); // Assuming this multer/fileupload setup is shared

const profileController = require('../controllers/profileController');

// Debugging logs - Tambahkan ini
console.log('DEBUG (profileRoutes): Value of authenticateToken:', authenticateToken);
console.log('DEBUG (profileRoutes): Type of authenticateToken:', typeof authenticateToken);
console.log('DEBUG (profileRoutes): Value of profileController:', profileController);
console.log('DEBUG (profileRoutes): Type of profileController.getProfile:', typeof profileController.getProfile);

router.get('/profile', authenticateToken, (req, res) => { // Ini baris 10
  console.log('✅ Route /api/users/profile (GET) ter-trigger');
  profileController.getProfile(req, res); // Calls the user-specific getProfile method
});

router.put('/profile', authenticateToken, upload.single('foto'), (req, res) => {
  console.log('✅ Route /api/users/profile (PUT) ter-trigger');
  profileController.updateProfile(req, res); // Calls the user-specific updateProfile method
});

module.exports = router;