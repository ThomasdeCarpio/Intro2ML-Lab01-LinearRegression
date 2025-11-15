const statisticsService = require('../../services/statistics.service');

class StatisticsController {
  /**
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

  // NOTE: getTrendData, getHistoricalPredictions, and getDataDistribution have been removed.
}

module.exports = new StatisticsController();