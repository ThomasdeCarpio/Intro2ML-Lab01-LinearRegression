// const axios = require('axios');
// const supabaseModel = require('../models/supabase.model');
// const mlApiUrl = process.env.ML_API_URL;

// class StatisticsService {
//   /**
//    * Fetches the core performance metrics from the ML API.
//    */
//   async getModelStats() {
//     try {
//       // Assumes the Python ML API has a '/stats' endpoint
//       const response = await axios.get(`${mlApiUrl}/stats`);
//       // The frontend mock combines stats and feature importance, so we do too.
//       return {
//         r2: response.data.r2,
//         rmse: response.data.rmse,
//         mae: response.data.mae,
//         mse: response.data.mse,
//         trainingSize: response.data.trainingSize,
//         testSize: response.data.testSize,
//         features: response.data.features,
//         lastTrained: response.data.lastTrained,
//       };
//     } catch (error) {
//       console.error('Error fetching model stats from ML API:', error.message);
//       throw new Error('The model statistics service is currently unavailable.');
//     }
//   }

//   /**
//    * Fetches data for visualizations.
//    * Some data comes from the database (trends), some from the ML API (importance).
//    */
//   async getTrendData() {
//     try {
//       // 1. Fetch trend data from our Supabase database
//       const songs = await supabaseModel.getSongsForTrends();

//       // 2. Fetch feature importance from the ML API
//       const { data: mlData } = await axios.get(`${mlApiUrl}/stats`);
//       const featureImportance = mlData.featureImportance || [];

//       // 3. Format the data to match the frontend's expectations
//       const energyVsPopularity = songs.map(s => ({ energy: s.energy, popularity: s.song_popularity }));
//       const danceabilityVsPopularity = songs.map(s => ({ danceability: s.danceability, popularity: s.song_popularity }));
//       const valenceVsPopularity = songs.map(s => ({ valence: s.audio_valence, popularity: s.song_popularity }));

//       return {
//         energyVsPopularity,
//         danceabilityVsPopularity,
//         valenceVsPopularity,
//         featureImportance,
//       };
//     } catch (error) {
//       console.error('Error assembling trend data:', error.message);
//       throw new Error('Could not retrieve trend data.');
//     }
//   }

//   /**
//    * Fetches detailed performance metrics from the ML API.
//    */
//   async getModelPerformance() {
//     try {
//       // Assumes the Python ML API has a '/performance' endpoint
//       const response = await axios.get(`${mlApiUrl}/performance`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching model performance from ML API:', error.message);
//       throw new Error('The model performance service is currently unavailable.');
//     }
//   }

//   /**
//    * Fetches historical predictions from the Supabase database.
//    */
//   async getHistoricalPredictions() {
//     return await supabaseModel.getPredictionHistory();
//   }

//   /**
//    * Fetches feature distribution statistics from the Supabase database.
//    */
//   async getDataDistribution() {
//     return await supabaseModel.getFeatureDistribution();
//   }
// }

// module.exports = new StatisticsService();

const axios = require('axios');
const supabaseModel = require('../models/supabase.model');
const mlApiUrl = process.env.ML_API_URL;

class StatisticsService {
  /**
   * MOCK VERSION
   * Fetches the core performance metrics.
   */
  async getModelStats() {
    console.log('--- SIMULATING ML API CALL for getModelStats ---');
    // This mock data matches the frontend's `getModelStats` mock.
    return {
      r2: 0.7234,
      rmse: 12.456,
      mae: 9.823,
      mse: 155.15,
      trainingSize: 8500,
      testSize: 2125,
      features: 13,
      lastTrained: '2024-11-10T14:30:00Z'
    };
  }

  /**
   * Fetches data for visualizations.
   * This version gets trend data from Supabase but mocks the feature importance.
   */
  async getTrendData() {
    try {
      // 1. Fetch REAL trend data from our Supabase database. This will still work.
      const songs = await supabaseModel.getSongsForTrends();
      console.log(`--- Fetched ${songs.length} songs from Supabase for trends ---`);

      // 2. MOCK the feature importance from the ML API
      console.log('--- SIMULATING ML API CALL for featureImportance ---');
      const featureImportance = [
        { feature: 'Danceability', importance: 0.25 },
        { feature: 'Energy', importance: 0.20 },
        { feature: 'Valence', importance: 0.15 },
        { feature: 'Loudness', importance: 0.12 },
        { feature: 'Tempo', importance: 0.08 },
        { feature: 'Acousticness', importance: 0.07 },
        { feature: 'Speechiness', importance: 0.05 },
        { feature: 'Instrumentalness', importance: 0.04 },
        { feature: 'Liveness', importance: 0.02 },
        { feature: 'Duration', importance: 0.02 }
      ];

      // 3. Format the data to match the frontend's expectations
      const energyVsPopularity = songs.map(s => ({ energy: s.energy, popularity: s.song_popularity }));
      const danceabilityVsPopularity = songs.map(s => ({ danceability: s.danceability, popularity: s.song_popularity }));
      const valenceVsPopularity = songs.map(s => ({ valence: s.audio_valence, popularity: s.song_popularity }));

      return {
        energyVsPopularity,
        danceabilityVsPopularity,
        valenceVsPopularity,
        featureImportance,
      };
    } catch (error) {
      console.error('Error assembling trend data:', error.message);
      throw new Error('Could not retrieve trend data from the database.');
    }
  }

  /**
   * MOCK VERSION
   * Fetches detailed performance metrics.
   */
  async getModelPerformance() {
    console.log('--- SIMULATING ML API CALL for getModelPerformance ---');
    // This mock data matches the frontend's `statsApi.js` mock.
    return {
      overall: { accuracy: 72.34, precision: 68.91, recall: 71.45 },
      byRange: [
        { range: '0-20', samples: 450, accuracy: 65.2 },
        { range: '20-40', samples: 1250, accuracy: 71.8 },
        { range: '40-60', samples: 2100, accuracy: 75.3 },
        { range: '60-80', samples: 1850, accuracy: 73.1 },
        { range: '80-100', samples: 475, accuracy: 68.9 }
      ],
      crossValidation: { folds: 5, meanScore: 0.7156, stdDev: 0.0342 }
    };
  }

  /**
   * Fetches historical predictions from the Supabase database.
   * This will still use the real database.
   */
  async getHistoricalPredictions() {
    console.log('--- Fetching real prediction history from Supabase ---');
    return await supabaseModel.getPredictionHistory();
  }

  /**
   * Fetches feature distribution statistics from the Supabase database.
   * This will still use the real database.
   */
  async getDataDistribution() {
    console.log('--- Fetching real feature distribution from Supabase ---');
    return await supabaseModel.getFeatureDistribution();
  }
}

module.exports = new StatisticsService();