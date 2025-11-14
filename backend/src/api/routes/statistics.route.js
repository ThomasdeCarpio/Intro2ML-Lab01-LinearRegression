const express = require('express');
const router = express.Router();
const StatisticsController = require('../controllers/statistics.controller');
// We can add a statistics.validator.js later if we need to validate query params.

// Route to get core model performance stats (R², RMSE, etc.)
// Corresponds to getModelStats() in the frontend
router.get('/model-stats', StatisticsController.getModelStats);

// Route to get data for trend charts (e.g., energy vs. popularity)
// Corresponds to getExampleTrends() in the frontend
router.get('/trends', StatisticsController.getTrendData);

// Route to get detailed model performance breakdown
// Corresponds to getModelPerformance() in the frontend
router.get('/performance', StatisticsController.getModelPerformance);

// Route to get a log of historical predictions
// Corresponds to getHistoricalPredictions() in the frontend
router.get('/history', StatisticsController.getHistoricalPredictions);

// Route to get statistical distribution of the dataset features
// Corresponds to getDataDistribution() in the frontend
router.get('/distribution', StatisticsController.getDataDistribution);

module.exports = router;