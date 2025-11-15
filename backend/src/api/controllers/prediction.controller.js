const predictionService = require('../../services/prediction.service');

// Default feature values
const defaultFeatures = {
    song_duration_ms: 240000,
    acousticness: 0.5,
    danceability: 0.5,
    energy: 0.5,
    instrumentalness: 0.0,
    key: 6,
    liveness: 0.2,
    loudness: -10.0,
    audio_mode: 1,
    speechiness: 0.05,
    tempo: 120.0,
    time_signature: 4,
    audio_valence: 0.5,
};

class PredictionController {
  async predict(req, res) {
    try {
      const features = { ...defaultFeatures, ...req.body };

      // Renamed service method call
      const predictedRating = await predictionService.getRatingPrediction(features);

      return res.status(200).json({
        success: true,
        data: {
          predicted_rating: predictedRating,
          features_used: features,
        },
      });
    } catch (error) {
      return res.status(503).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new PredictionController();