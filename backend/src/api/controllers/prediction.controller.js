const predictionService = require('../../services/prediction.service');

class PredictionController {
  async predict(req, res) {
    try {
      // In a real app, you would validate the features in req.body first
      const features = req.body;

      // Call the service to get the prediction
      const predictedRating = await predictionService.getRatingPrediction(features);

      // Send the successful response
      return res.status(200).json({
        success: true,
        data: {
          predicted_rating: predictedRating,
        },
      });
    } catch (error) {
      // Handle errors from the service
      return res.status(503).json({ // 503 Service Unavailable is a good code here
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new PredictionController();