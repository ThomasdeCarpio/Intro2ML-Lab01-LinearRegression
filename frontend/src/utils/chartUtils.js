/**
 * Chart utility functions for data visualization
 */

/**
 * Formats chart data for Recharts
 * @param {Array} data - Raw data array
 * @param {string} xKey - Key for x-axis
 * @param {string} yKey - Key for y-axis
 * @returns {Array} - Formatted data for charts
 */
export const formatChartData = (data, xKey, yKey) => {
  return data.map(item => ({
    [xKey]: item[xKey],
    [yKey]: item[yKey]
  }));
};

/**
 * Generates color palette for charts
 * @param {number} count - Number of colors needed
 * @returns {Array} - Array of color hex codes
 */
export const generateColorPalette = (count) => {
  const baseColors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // purple
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#f97316', // orange
  ];

  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }

  // Generate additional colors if needed
  const colors = [...baseColors];
  while (colors.length < count) {
    const hue = (colors.length * 137.5) % 360;
    colors.push(`hsl(${hue}, 70%, 50%)`);
  }

  return colors;
};

/**
 * Calculates trend line for scatter plot
 * @param {Array} data - Array of {x, y} points
 * @returns {Object} - Slope and intercept for trend line
 */
export const calculateTrendLine = (data) => {
  const n = data.length;
  
  if (n === 0) return { slope: 0, intercept: 0 };

  let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;

  data.forEach(point => {
    const x = Object.values(point)[0];
    const y = Object.values(point)[1];
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumXX += x * x;
  });

  const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};

/**
 * Formats percentage value for display
 * @param {number} value - Decimal value (0-1)
 * @returns {string} - Formatted percentage string
 */
export const formatPercentage = (value) => {
  return `${(value * 100).toFixed(1)}%`;
};

/**
 * Formats axis tick values
 * @param {number} value - Tick value
 * @param {string} type - Type of formatting ('decimal', 'percentage', 'integer')
 * @returns {string} - Formatted tick label
 */
export const formatAxisTick = (value, type = 'decimal') => {
  switch (type) {
    case 'percentage':
      return `${(value * 100).toFixed(0)}%`;
    case 'integer':
      return Math.round(value).toString();
    case 'decimal':
    default:
      return value.toFixed(2);
  }
};

/**
 * Gets min and max values from dataset
 * @param {Array} data - Dataset array
 * @param {string} key - Key to extract values from
 * @returns {Object} - Object with min and max values
 */
export const getDataRange = (data, key) => {
  if (!data || data.length === 0) {
    return { min: 0, max: 100 };
  }

  const values = data.map(item => item[key]);
  return {
    min: Math.min(...values),
    max: Math.max(...values)
  };
};

/**
 * Generates tooltip content formatter
 * @param {string} label - Label for the data
 * @param {string} unit - Unit of measurement
 * @returns {Function} - Formatter function for tooltip
 */
export const createTooltipFormatter = (label, unit = '') => {
  return (value) => {
    const formattedValue = typeof value === 'number' ? value.toFixed(2) : value;
    return unit ? `${formattedValue} ${unit}` : formattedValue;
  };
};
