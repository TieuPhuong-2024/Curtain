const express = require('express');
const router = express.Router();
const colorController = require('../controllers/color.controller');

// GET all colors
router.get('/', colorController.getAllColors);

// POST a new color (optional, if you want to manage colors via API)
router.post('/', colorController.createColor);

// Add other routes for GET by ID, PUT, DELETE as needed

module.exports = router;
