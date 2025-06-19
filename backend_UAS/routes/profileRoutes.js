const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const profileController = require('../controllers/profileController');

router.get('/profile', authenticateToken, profileController.getProfile); // Ambil data awal
router.put('/profile', authenticateToken, upload.single('foto'), profileController.updateProfile); // Update data
router.put('/profile', authenticateToken, upload.single('foto'), profileController.updateProfileAdmin); // Update data

router.get('/profile', authenticateToken, (req, res) => {
  console.log('✅ Route /api/users/profile ter-trigger');
  profileController.getProfile(req, res);
});


module.exports = router;
