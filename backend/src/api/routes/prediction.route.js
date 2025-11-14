const express = require('express');
const router = express.Router();
const PredictionController = require('../controllers/prediction.controller');
const predictionValidator = require('../validators/prediction.validator');

// Defines the route: POST /api/predictions
// This route now uses the validator middleware before calling the controller.
router.post('/', predictionValidator.validateFeatures, PredictionController.predict);

// Defines the route: GET /api/predictions/visualization
router.get('/visualization', PredictionController.getVisualizationData);

module.exports = router;