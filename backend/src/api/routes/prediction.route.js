const express = require('express');
const router = express.Router();
const PredictionController = require('../controllers/prediction.controller');

// Defines the route: POST /api/predict
router.post('/', PredictionController.predict);

module.exports = router;