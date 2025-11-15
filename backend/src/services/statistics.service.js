const axios = require('axios');
const mlApiUrl = process.env.ML_API_URL;

class StatisticsService {
  /**
   * Fetches the core performance metrics from the ML API.
   */
  async getModelStats() {
    try {
      const response = await axios.get(`${mlApiUrl}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching model stats from ML API:', error.message);
      throw new Error('The model statistics service is currently unavailable.');
    }
  }

  /**
   * Fetches detailed performance metrics from the ML API.
   */
  async getModelPerformance() {
    try {
      const response = await axios.get(`${mlApiUrl}/performance`);
      return response.data;
    } catch (error) {
      console.error('Error fetching model performance from ML API:', error.message);
      throw new Error('The model performance service is currently unavailable.');
    }
  }

  // NOTE: getTrendData, getHistoricalPredictions, and getDataDistribution have been removed
  // as they all depended on the database.
}

module.exports = new StatisticsService();