const axios = require('axios');
const mlApiUrl = process.env.ML_API_URL;

class PredictionService {
  /**
   * Calls the Python ML API to get a song rating prediction.
   * @param {object} features - The song features to send for prediction.
   * @returns {Promise<number>} The predicted rating.
   */
  async getRatingPrediction(features) {
    try {
      // Make a POST request to the ML API's /predict endpoint
      const response = await axios.post(`${mlApiUrl}/predict`, features);

      // Assuming the ML API returns { "predicted_rating": 4.5 }
      return response.data.predicted_rating;

    } catch (error) {
      console.error('Error calling ML API:', error.message);
      // Depending on the error, you might want to throw a specific error
      // that your controller can catch and format nicely.
      throw new Error('The prediction service is currently unavailable.');
    }
  }

  // You would add other methods here, e.g., to get visualization data from Supabase
  // async getVisualizationData() { ... }
}

module.exports = new PredictionService();