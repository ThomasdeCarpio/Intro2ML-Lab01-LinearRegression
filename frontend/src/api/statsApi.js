/**
 * Mock API for Statistics and Analytics
 * Provides additional statistical endpoints
 */

/**
 * Gets detailed model performance breakdown
 * @returns {Promise<Object>} - Detailed performance metrics
 */
export const getModelPerformance = async () => {
  await new Promise(resolve => setTimeout(resolve, 350));

  return {
    success: true,
    performance: {
      overall: {
        accuracy: 72.34,
        precision: 68.91,
        recall: 71.45
      },
      byRange: [
        { range: '0-20', samples: 450, accuracy: 65.2 },
        { range: '20-40', samples: 1250, accuracy: 71.8 },
        { range: '40-60', samples: 2100, accuracy: 75.3 },
        { range: '60-80', samples: 1850, accuracy: 73.1 },
        { range: '80-100', samples: 475, accuracy: 68.9 }
      ],
      crossValidation: {
        folds: 5,
        meanScore: 0.7156,
        stdDev: 0.0342
      }
    }
  };
};

/**
 * Gets historical prediction data
 * @returns {Promise<Object>} - Historical predictions for analysis
 */
export const getHistoricalPredictions = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));

  const predictions = Array.from({ length: 30 }, (_, i) => {
    const actual = Math.random() * 100;
    const predicted = actual + (Math.random() * 20 - 10);
    return {
      id: i + 1,
      actual: Math.round(actual * 10) / 10,
      predicted: Math.round(predicted * 10) / 10,
      error: Math.round(Math.abs(actual - predicted) * 10) / 10,
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString()
    };
  });

  return {
    success: true,
    predictions: predictions
  };
};

/**
 * Gets data distribution statistics
 * @returns {Promise<Object>} - Distribution data for features
 */
export const getDataDistribution = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));

  return {
    success: true,
    distribution: {
      popularity: {
        mean: 42.7,
        median: 44.2,
        std: 18.3,
        min: 0,
        max: 100,
        q1: 28.5,
        q3: 58.9
      },
      features: {
        danceability: { mean: 0.65, std: 0.18 },
        energy: { mean: 0.58, std: 0.22 },
        valence: { mean: 0.52, std: 0.24 },
        acousticness: { mean: 0.31, std: 0.28 },
        instrumentalness: { mean: 0.12, std: 0.21 },
        speechiness: { mean: 0.09, std: 0.11 },
        liveness: { mean: 0.19, std: 0.16 }
      }
    }
  };
};
