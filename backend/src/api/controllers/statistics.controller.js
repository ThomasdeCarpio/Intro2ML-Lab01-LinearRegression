const statisticsService = require('../../services/statistics.service');

class StatisticsController {
  /**
   * Corresponds to GET /api/statistics/model-stats
   * Fetches basic performance metrics of the ML model.
   */
  async getModelStats(req, res) {
    try {
      const stats = await statisticsService.getModelStats();
      return res.status(200).json({ success: true, stats: stats });
    } catch (error) {
      return res.status(503).json({ success: false, error: error.message });
    }
  }

  /**
   * Corresponds to GET /api/statistics/trends
   * Fetches data needed for frontend charts and visualizations.
   */
  async getTrendData(req, res) {
    try {
      const trendData = await statisticsService.getTrendData();
      return res.status(200).json({ success: true, trends: trendData });
    } catch (error) {
      console.error('Error fetching trend data:', error.message);
      return res.status(500).json({ success: false, error: 'Failed to retrieve trend data.' });
    }
  }

  /**
   * Corresponds to GET /api/statistics/performance
   * Fetches a detailed performance breakdown of the ML model.
   */
  async getModelPerformance(req, res) {
    try {
      const performanceData = await statisticsService.getModelPerformance();
      return res.status(200).json({ success: true, performance: performanceData });
    } catch (error) {
      return res.status(503).json({ success: false, error: error.message });
    }
  }

  /**
   * Corresponds to GET /api/statistics/history
   * Fetches a history of past predictions made by the application.
   */
  async getHistoricalPredictions(req, res) {
    try {
      // You can add pagination here via req.query if needed in the future
      const predictions = await statisticsService.getHistoricalPredictions();
      return res.status(200).json({ success: true, predictions: predictions });
    } catch (error) {
      console.error('Error fetching historical predictions:', error.message);
      return res.status(500).json({ success: false, error: 'Failed to retrieve prediction history.' });
    }
  }

  /**
   * Corresponds to GET /api/statistics/distribution
   * Fetches statistical distribution data for the features in the dataset.
   */
  async getDataDistribution(req, res) {
    try {
      const distribution = await statisticsService.getDataDistribution();
      return res.status(200).json({ success: true, distribution: distribution });
    } catch (error) {
      console.error('Error fetching data distribution:', error.message);
      return res.status(500).json({ success: false, error: 'Failed to retrieve data distribution.' });
    }
  }
}

module.exports = new StatisticsController();