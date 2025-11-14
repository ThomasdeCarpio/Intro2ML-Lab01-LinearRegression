const { body, validationResult } = require('express-validator');

// Middleware to format validation errors
const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

const predictionValidator = {
    validateFeatures: [
        body('song_duration_ms').optional().isFloat({ min: 0 }).withMessage('song_duration_ms must be a non-negative number.'),
        body('acousticness').optional().isFloat({ min: 0, max: 1 }).withMessage('acousticness must be a number between 0 and 1.'),
        body('danceability').optional().isFloat({ min: 0, max: 1 }).withMessage('danceability must be a number between 0 and 1.'),
        body('energy').optional().isFloat({ min: 0, max: 1 }).withMessage('energy must be a number between 0 and 1.'),
        body('instrumentalness').optional().isFloat({ min: 0, max: 1 }).withMessage('instrumentalness must be a number between 0 and 1.'),
        body('key').optional().isInt({ min: 0, max: 11 }).withMessage('key must be an integer between 0 and 11.'),
        body('liveness').optional().isFloat({ min: 0, max: 1 }).withMessage('liveness must be a number between 0 and 1.'),
        body('loudness').optional().isFloat({ max: 0 }).withMessage('loudness must be a number (typically negative).'),
        body('audio_mode').optional().isInt({ min: 0, max: 1 }).withMessage('audio_mode must be 0 or 1.'),
        body('speechiness').optional().isFloat({ min: 0, max: 1 }).withMessage('speechiness must be a number between 0 and 1.'),
        body('tempo').optional().isFloat({ min: 0 }).withMessage('tempo must be a non-negative number.'),
        body('time_signature').optional().isInt({ min: 1, max: 5 }).withMessage('time_signature must be a valid integer (e.g., 3, 4, 5).'),
        body('audio_valence').optional().isFloat({ min: 0, max: 1 }).withMessage('audio_valence must be a number between 0 and 1.'),

        handleValidationErrors,
    ],
};

module.exports = predictionValidator;