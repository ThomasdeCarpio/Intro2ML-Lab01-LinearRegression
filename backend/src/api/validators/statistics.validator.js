const { query, validationResult } = require('express-validator');

// Middleware to format validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

const statisticsValidator = {
    // Example for the future if you add pagination to the history endpoint
    // e.g., GET /api/statistics/history?page=1&limit=20
    validateHistoryQuery: [
        query('page').optional().isInt({ min: 1 }).withMessage('Page must be a positive integer.'),
        query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100.'),
        handleValidationErrors
    ]
};

module.exports = statisticsValidator;