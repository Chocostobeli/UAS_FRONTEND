const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController'); // Hanya SATU deklarasi ini
const { authenticateToken, authorizeAdmin } = require('../middleware/authmiddleware'); // Impor autentikasi dan otorisasi

// Rute untuk mendapatkan pengajuan pengguna yang login
// Gunakan authenticateToken (yang sudah Anda impor)
router.get('/submissions', authenticateToken, dashboardController.getUserSubmissions); // Gunakan authenticateToken

// Jika ada rute admin yang terkait dengan dashboard, Anda bisa menambahkannya di sini
// Contoh:
// router.get('/admin-dashboard-data', authenticateToken, authorizeAdmin, dashboardController.getAdminDashboardData);


module.exports = router;