const express = require('express');
const router = express.Router();
const pengajuanController = require('../controllers/pengajuanController');

router.post('/', pengajuanController.createPengajuan);
router.get('/', pengajuanController.getPengajuan);

module.exports = router;
