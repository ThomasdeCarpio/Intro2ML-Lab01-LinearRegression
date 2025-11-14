import apiClient from './apiClient';

/**
 * Predicts song popularity by calling the REAL backend.
 * @param {Object} inputFeatures - Object containing all 13 song features
 * @returns {Promise<Object>} - The full response object from the backend.
 */
export const predictSongPopularity = async (inputFeatures) => {
  // The 'data' in the response will already be the JSON object.
  const { data } = await apiClient.post('/predictions', inputFeatures);
  return data; // This will look like { success: true, data: { predicted_rating: ... } }
};

/**
 * Gets regression model statistics from the REAL backend.
 * This will fail for now until the ML team provides their stats endpoint.
 * @returns {Promise<Object>} - Model performance metrics
 */
export const getModelStats = async () => {
  try {
    const { data } = await apiClient.get('/statistics/model-stats');
    return data;
  } catch (error) {
    console.warn("Could not fetch model stats (ML API might be down). Returning mock data.");
    // Fallback to mock data if the ML API isn't ready
    return {
      success: true,
      stats: { r2: 0.0, rmse: 0.0, mae: 0.0, mse: 0.0, trainingSize: 0, testSize: 0, features: 13, lastTrained: 'N/A' }
    };
  }
};

/**
 * Gets example trend data for visualization from the REAL backend.
 * @returns {Promise<Object>} - Example datasets for charts
 */
export const getExampleTrends = async () => {
  const { data } = await apiClient.get('/statistics/trends');
  return data;
};