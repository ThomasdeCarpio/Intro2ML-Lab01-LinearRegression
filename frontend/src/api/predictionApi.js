/**
 * Mock API for Song Popularity Prediction
 * Simulates backend prediction endpoint with fake regression logic
 */

/**
 * Predicts song popularity based on input features
 * @param {Object} inputFeatures - Object containing all 13 song features
 * @returns {Promise<Object>} - Prediction result with popularity score and confidence
 */
export const predictSongPopularity = async (inputFeatures) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Extract features
  const {
    song_duration_ms,
    acousticness,
    danceability,
    energy,
    instrumentalness,
    key,
    liveness,
    loudness,
    audio_mode,
    speechiness,
    tempo,
    time_signature,
    audio_valence
  } = inputFeatures;

  // Simple linear formula to generate fake prediction
  // Weighted combination of features (normalized to 0-100 scale)
  const popularityScore = Math.max(0, Math.min(100,
    (danceability * 25) +
    (energy * 20) +
    (audio_valence * 15) +
    (loudness / -60 * 10) + // loudness is typically negative
    (acousticness * -5) + // inverse relationship
    (instrumentalness * -8) + // inverse relationship
    (speechiness * 5) +
    (liveness * 3) +
    (tempo / 200 * 7) + // normalized tempo
    (song_duration_ms / 300000 * 5) + // normalized duration
    Math.random() * 10 // add some randomness
  ));

  // Calculate fake confidence based on feature variance
  const featureVariance = Math.abs(danceability - energy) + 
                          Math.abs(audio_valence - 0.5) +
                          Math.random() * 0.2;
  const confidence = Math.max(65, Math.min(95, 85 - (featureVariance * 20)));

  return {
    success: true,
    prediction: {
      popularity: Math.round(popularityScore * 10) / 10, // round to 1 decimal
      confidence: Math.round(confidence * 10) / 10,
      confidenceLevel: confidence > 80 ? 'High' : confidence > 70 ? 'Medium' : 'Low'
    },
    timestamp: new Date().toISOString()
  };
};

/**
 * Gets regression model statistics
 * @returns {Promise<Object>} - Model performance metrics
 */
export const getModelStats = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    success: true,
    stats: {
      r2: 0.7234,
      rmse: 12.456,
      mae: 9.823,
      mse: 155.15,
      trainingSize: 8500,
      testSize: 2125,
      features: 13,
      lastTrained: '2024-11-10T14:30:00Z'
    }
  };
};

/**
 * Gets example trend data for visualization
 * @returns {Promise<Object>} - Example datasets for charts
 */
export const getExampleTrends = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));

  // Generate fake data points for energy vs popularity
  const energyTrend = Array.from({ length: 20 }, (_, i) => {
    const energy = i / 19; // 0 to 1
    const popularity = 20 + (energy * 50) + (Math.random() * 15 - 7.5);
    return {
      energy: Math.round(energy * 100) / 100,
      popularity: Math.round(popularity * 10) / 10
    };
  });

  // Generate fake data points for danceability vs popularity
  const danceabilityTrend = Array.from({ length: 20 }, (_, i) => {
    const danceability = i / 19; // 0 to 1
    const popularity = 15 + (danceability * 60) + (Math.random() * 15 - 7.5);
    return {
      danceability: Math.round(danceability * 100) / 100,
      popularity: Math.round(popularity * 10) / 10
    };
  });

  // Generate fake data points for valence vs popularity
  const valenceTrend = Array.from({ length: 20 }, (_, i) => {
    const valence = i / 19; // 0 to 1
    const popularity = 25 + (valence * 45) + (Math.random() * 15 - 7.5);
    return {
      valence: Math.round(valence * 100) / 100,
      popularity: Math.round(popularity * 10) / 10
    };
  });

  // Feature importance data
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

  return {
    success: true,
    trends: {
      energyVsPopularity: energyTrend,
      danceabilityVsPopularity: danceabilityTrend,
      valenceVsPopularity: valenceTrend,
      featureImportance: featureImportance
    }
  };
};
