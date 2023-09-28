const express = require('express');
const profileController = require('../controllers/profileController');

const router = express.Router();

router.post('/create', profileController.createProfile);

router.get('/read/:id', profileController.readProfile);

router.put('/update/:id', profileController.updateProfile);

module.exports = router;
