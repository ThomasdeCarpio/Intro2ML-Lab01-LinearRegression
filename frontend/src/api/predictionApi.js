import apiClient from './apiClient';

/**
 * Predicts song popularity by calling the backend.
 */
export const predictSongPopularity = async (inputFeatures) => {
  const { data } = await apiClient.post('/predictions', inputFeatures);
  return data;
};

/**
 * Gets regression model statistics from the backend.
 */
export const getModelStats = async () => {
  // This now points to the correct endpoint.
  // We keep this function as the result component uses it.
  const { data } = await apiClient.get('/statistics/model-stats');
  return data;
};

// NOTE: getExampleTrends has been removed.