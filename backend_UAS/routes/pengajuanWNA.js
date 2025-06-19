const express = require('express');
const router = express.Router();
const pengajuanWNAController = require('../controllers/pengajuanWNAController');

router.post('/', pengajuanWNAController.createPengajuanWNA);
router.get('/', pengajuanWNAController.getPengajuanWNA);

module.exports = router;