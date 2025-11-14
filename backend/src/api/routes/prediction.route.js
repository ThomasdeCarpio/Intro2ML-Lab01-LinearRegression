const express = require('express');
const router = express.Router();
const PredictionController = require('../controllers/prediction.controller');
const predictionValidator = require('../validators/prediction.validator');

// Defines the route: POST /api/predictions
// This route uses the validator middleware before calling the controller.
router.post('/', predictionValidator.validateFeatures, PredictionController.predict);

module.exports = router;