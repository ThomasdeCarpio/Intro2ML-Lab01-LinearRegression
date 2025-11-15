const axios = require('axios');
const mlApiUrl = process.env.ML_API_URL;

class PredictionService {
  /**
   * Calls the Python ML API to get a song rating prediction.
   * The logging functionality has been removed.
   * @param {object} features - The song features to send for prediction.
   * @returns {Promise<number>} The predicted rating.
   */
  async getRatingPrediction(features) {
    try {
      console.log(`--- Calling ML API at ${mlApiUrl}/predict ---`);
      const response = await axios.post(`${mlApiUrl}/predict`, features);
      
      const predictedRating = response.data.predicted_rating;
      console.log(`--- Received prediction from ML API: ${predictedRating} ---`);

      return predictedRating;

    } catch (error) {
      console.error('Error calling ML API:', error.message);
      throw new Error('The prediction service is currently unavailable.');
    }
  }
}

module.exports = new PredictionService();