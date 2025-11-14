/**
 * Validation utilities for song feature inputs
 */

/**
 * Validates a numeric value is within specified range
 * @param {number} value - The value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {boolean} - True if valid, false otherwise
 */
export const isInRange = (value, min, max) => {
  const num = parseFloat(value);
  return !isNaN(num) && num >= min && num <= max;
};

/**
 * Validates all song features
 * @param {Object} features - Object containing all song features
 * @returns {Object} - Validation result with isValid flag and errors array
 */
export const validateFeatures = (features) => {
  const errors = [];

  // Define validation rules for each feature
  const rules = {
    song_duration_ms: { min: 0, max: 600000, label: 'Song Duration' }, // 0-10 minutes
    acousticness: { min: 0, max: 1, label: 'Acousticness' },
    danceability: { min: 0, max: 1, label: 'Danceability' },
    energy: { min: 0, max: 1, label: 'Energy' },
    instrumentalness: { min: 0, max: 1, label: 'Instrumentalness' },
    key: { min: 0, max: 11, label: 'Key' }, // 0-11 for musical keys
    liveness: { min: 0, max: 1, label: 'Liveness' },
    loudness: { min: -60, max: 0, label: 'Loudness' }, // dB range
    audio_mode: { min: 0, max: 1, label: 'Audio Mode' }, // 0 or 1
    speechiness: { min: 0, max: 1, label: 'Speechiness' },
    tempo: { min: 0, max: 250, label: 'Tempo' }, // BPM
    time_signature: { min: 3, max: 7, label: 'Time Signature' },
    audio_valence: { min: 0, max: 1, label: 'Valence' }
  };

  // Validate each feature
  Object.entries(rules).forEach(([key, rule]) => {
    if (features[key] === undefined || features[key] === null || features[key] === '') {
      errors.push(`${rule.label} is required`);
    } else if (!isInRange(features[key], rule.min, rule.max)) {
      errors.push(`${rule.label} must be between ${rule.min} and ${rule.max}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

/**
 * Clamps a value between min and max
 * @param {number} value - Value to clamp
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} - Clamped value
 */
export const clamp = (value, min, max) => {
  return Math.min(Math.max(parseFloat(value) || 0, min), max);
};

/**
 * Formats a number to specified decimal places
 * @param {number} value - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} - Formatted string
 */
export const formatNumber = (value, decimals = 2) => {
  return parseFloat(value).toFixed(decimals);
};

/**
 * Gets default feature values
 * @returns {Object} - Object with default values for all features
 */
export const getDefaultFeatures = () => ({
  song_duration_ms: 180000, // 3 minutes
  acousticness: 0.5,
  danceability: 0.7,
  energy: 0.6,
  instrumentalness: 0.0,
  key: 5,
  liveness: 0.15,
  loudness: -6,
  audio_mode: 1,
  speechiness: 0.05,
  tempo: 120,
  time_signature: 4,
  audio_valence: 0.6
});
