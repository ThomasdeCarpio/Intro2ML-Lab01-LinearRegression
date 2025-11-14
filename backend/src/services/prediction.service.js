// const axios = require('axios');
// const supabaseModel = require('../models/supabase.model'); // For logging predictions
// const mlApiUrl = process.env.ML_API_URL;

// class PredictionService {
//   /**
//    * Calls the Python ML API to get a song rating prediction and logs the result.
//    * @param {object} features - The song features to send for prediction.
//    * @returns {Promise<number>} The predicted rating.
//    */
//   async getRatingAndLog(features) {
//     let predictedRating;
//     try {
//       // Make a POST request to the ML API's /predict endpoint
//       const response = await axios.post(`${mlApiUrl}/predict`, features);
      
//       predictedRating = response.data.predicted_rating;

//     } catch (error) {
//       console.error('Error calling ML API:', error.message);
//       throw new Error('The prediction service is currently unavailable.');
//     }

//     // Log the prediction to the database. We wrap this in a try/catch
//     // so that a failure to log does not prevent the user from getting their result.
//     try {
//       await supabaseModel.createPredictionLog({
//         features_used: features,
//         predicted_rating: predictedRating,
//       });
//     } catch (logError) {
//       console.error('Failed to log prediction to database:', logError.message);
//       // We don't re-throw the error, as logging is a non-critical background task.
//     }

//     return predictedRating;
//   }
// }

// module.exports = new PredictionService();

const axios = require('axios');
const supabaseModel = require('../models/supabase.model');
const mlApiUrl = process.env.ML_API_URL;

class PredictionService {
  /**
   * MOCK VERSION
   * Simulates a call to the Python ML API and logs the result.
   * @param {object} features - The song features to send for prediction.
   * @returns {Promise<number>} A default predicted rating.
   */
  async getRatingAndLog(features) {
    let predictedRating;
    
    // --- START OF MOCK LOGIC ---
    // In a real scenario, this block would be the axios call.
    // For now, we'll just return a default value.
    try {
      console.log('--- SIMULATING ML API CALL ---');
      // Let's create a simple, deterministic "prediction" for testing
      // For example, base it on danceability and energy
      predictedRating = (features.danceability * 50) + (features.energy * 50);
      predictedRating = Math.round(Math.min(100, predictedRating)); // Clamp between 0-100 and round
      
      console.log(`Input Features:`, features);
      console.log(`Simulated Prediction: ${predictedRating}`);
      // --- END OF MOCK LOGIC ---

    } catch (error) {
      // This block will be used when you switch to the real API call.
      console.error('Error calling ML API:', error.message);
      throw new Error('The prediction service is currently unavailable.');
    }

    // The logging part remains the same and will work with the real database.
    try {
      await supabaseModel.createPredictionLog({
        features_used: features,
        predicted_rating: predictedRating,
      });
      console.log('--- Prediction successfully logged to Supabase ---');
    } catch (logError) {
      console.error('Failed to log prediction to database:', logError.message);
    }

    return predictedRating;
  }
}

module.exports = new PredictionService();