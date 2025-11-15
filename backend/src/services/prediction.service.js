const axios = require('axios');
const supabaseModel = require('../models/supabase.model'); // For logging predictions
const mlApiUrl = process.env.ML_API_URL;

class PredictionService {
  /**
   * FINAL VERSION
   * Calls the Python ML API to get a song rating prediction and logs the result.
   * @param {object} features - The song features to send for prediction.
   * @returns {Promise<number>} The predicted rating.
   */
  async getRatingAndLog(features) {
    let predictedRating;
    
    // --- UNCOMMENT THE REAL API CALL ---
    try {
      console.log(`--- Calling ML API at ${mlApiUrl}/predict ---`);
      // Make a POST request to the ML API's /predict endpoint
      const response = await axios.post(`${mlApiUrl}/predict`, features);
      
      predictedRating = response.data.predicted_rating;
      console.log(`--- Received prediction from ML API: ${predictedRating} ---`);

    } catch (error) {
      console.error('Error calling ML API:', error.message);
      throw new Error('The prediction service is currently unavailable.');
    }
    // --- MOCK LOGIC IS NOW REMOVED ---

    // Log the prediction to the database. This part remains the same.
    try {
      await supabaseModel.createPredictionLog({
        features_used: features,
        predicted_rating: predictedRating,
      });
      console.log('--- Prediction successfully logged to Supabase ---');
    } catch (logError) {
      console.error('Failed to log prediction to database:', logError.message);
      // We don't re-throw the error, as logging is non-critical.
    }

    return predictedRating;
  }
}

module.exports = new PredictionService();