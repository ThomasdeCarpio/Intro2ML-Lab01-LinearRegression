const predictionService = require('../../services/prediction.service');
// supabaseModel is no longer needed here, the service handles it.

// Define default feature values. These represent an "average" or "neutral" song.
const defaultFeatures = {
    song_duration_ms: 240000, // 4 minutes
    acousticness: 0.5,
    danceability: 0.5,
    energy: 0.5,
    instrumentalness: 0.0,
    key: 6,
    liveness: 0.2,
    loudness: -10.0,
    audio_mode: 1, // Major
    speechiness: 0.05,
    tempo: 120.0,
    time_signature: 4,
    audio_valence: 0.5,
};

class PredictionController {
  async predict(req, res) {
    try {
      // Merge the user's provided features over the default values.
      const features = { ...defaultFeatures, ...req.body };

      // Call the service to get the prediction and log the result
      const predictedRating = await predictionService.getRatingAndLog(features);

      // Send the successful response
      return res.status(200).json({
        success: true,
        data: {
          predicted_rating: predictedRating,
          features_used: features, // Also return the full set of features used for clarity
        },
      });
    } catch (error) {
      // Handle errors from the service (e.g., ML API is down)
      return res.status(503).json({ // 503 Service Unavailable is a good status code here
        success: false,
        error: error.message,
      });
    }
  }

  // The getVisualizationData method is no longer needed here.
  // It has been moved to the new statistics.controller.js
}

module.exports = new PredictionController();