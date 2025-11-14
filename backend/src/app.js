const express = require('express');
const cors = require('cors');
const app = express();

// --- Routers ---
const predictionRouter = require('./api/routes/prediction.route');
const statisticsRouter = require('./api/routes/statistics.route'); // <-- ADD THIS

// --- Global Middlewares ---
app.use(cors()); // Allow requests from other origins
app.use(express.json()); // Parse JSON request bodies

// --- Routes ---
app.get('/', (req, res) => {
  res.send('<h1>Song Rating Predictor API</h1>');
});

// Main API routes
app.use('/api/predictions', predictionRouter);
app.use('/api/statistics', statisticsRouter); // <-- ADD THIS

// --- Error Handling ---
// Catch-all for 404 Not Found errors
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

module.exports = app;