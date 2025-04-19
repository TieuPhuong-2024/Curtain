const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');

// POST upload image from device
router.post('/from-device', uploadController.uploadImage);

// POST save image from URL (cloud)
router.post('/from-url', uploadController.saveImageFromUrl);

module.exports = router;