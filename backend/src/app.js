const express = require('express');
const cors = require('cors');
const app = express();

const predictionRouter = require('./api/routes/prediction.route');

// --- Global Middlewares ---
app.use(cors()); // Allow requests from other origins
app.use(express.json()); // Parse JSON request bodies

// --- Routes ---
app.get('/', (req, res) => {
  res.send('<h1>Song Rating Predictor API</h1>');
});

// Main API routes
// Use the plural '/predictions' for consistency with REST standards
app.use('/api/predictions', predictionRouter);

// --- Error Handling ---
// Catch-all for 404 Not Found errors
app.use((req, res, next) => {
  res.status(404).json({ success: false, error: 'Endpoint not found' });
});

module.exports = app;