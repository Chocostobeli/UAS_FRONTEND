const express = require('express');
const router = express.Router();
const pengajuanWNAController = require('../controllers/pengajuanWNAController');
const uploadWNA = require('../middleware/uploadWNA'); // Import the WNA-specific upload middleware
const upload = require('../middleware/upload'); // Import the general upload middleware (keep if used elsewhere)

// Apply the uploadWNA middleware BEFORE your controller function
router.post('/', uploadWNA, pengajuanWNAController.createPengajuanWNA); // <-- Added uploadWNA middleware
router.get('/', pengajuanWNAController.getPengajuanWNA);

module.exports = router;