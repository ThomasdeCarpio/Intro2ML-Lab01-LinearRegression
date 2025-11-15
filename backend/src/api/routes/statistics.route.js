const express = require('express');
const router = express.Router();
const StatisticsController = require('../controllers/statistics.controller');

// Route to get core model performance stats (R², RMSE, etc.)
router.get('/model-stats', StatisticsController.getModelStats);

// Route to get detailed model performance breakdown
router.get('/performance', StatisticsController.getModelPerformance);

// NOTE: /trends, /history, and /distribution routes have been removed.

module.exports = router;