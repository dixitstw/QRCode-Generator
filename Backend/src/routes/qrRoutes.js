const express = require('express');
const qrController = require('../controllers/qrController');

const router = express.Router();

router.get('/read/:id', qrController.readQR);

module.exports = router;
