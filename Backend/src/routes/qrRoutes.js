const express = require('express');
const qrController = require('../controllers/qrController');

const router = express.Router();

router.post('/create', qrController.createQR);

router.get('/read/:id', qrController.readQR);

router.put('/update/:id', qrController.updateQR);


module.exports = router;
