const axios = require('axios');
const supabaseModel = require('../models/supabase.model');
const mlApiUrl = process.env.ML_API_URL;

class StatisticsService {
  /**
   * FINAL VERSION
   * Fetches the core performance metrics from the ML API.
   */
  async getModelStats() {
    try {
      // This is now a real API call
      const response = await axios.get(`${mlApiUrl}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching model stats from ML API:', error.message);
      throw new Error('The model statistics service is currently unavailable.');
    }
  }

  /**
   * FINAL VERSION
   * Fetches data for visualizations.
   */
  async getTrendData() {
    try {
      // 1. Fetch REAL trend data from our Supabase database.
      const songs = await supabaseModel.getSongsForTrends();
      console.log(`--- Fetched ${songs.length} songs from Supabase for trends ---`);

      // 2. Fetch REAL feature importance from the ML API.
      const { data: mlData } = await axios.get(`${mlApiUrl}/stats`);
      const featureImportance = mlData.featureImportance || [];

      // 3. Format the data (no change here).
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
      throw new Error('Could not retrieve trend data.');
    }
  }

  /**
   * FINAL VERSION
   * Fetches detailed performance metrics from the ML API.
   */
  async getModelPerformance() {
    try {
      // Assumes the Python ML API has a '/performance' endpoint
      const response = await axios.get(`${mlApiUrl}/performance`);
      return response.data;
    } catch (error) {
      console.error('Error fetching model performance from ML API:', error.message);
      throw new Error('The model performance service is currently unavailable.');
    }
  }

  /**
   * Fetches historical predictions from the Supabase database.
   */
  async getHistoricalPredictions() {
    return await supabaseModel.getPredictionHistory();
  }

  /**
   * Fetches feature distribution statistics from the Supabase database.
   */
  async getDataDistribution() {
    return await supabaseModel.getFeatureDistribution();
  }
}

module.exports = new StatisticsService();