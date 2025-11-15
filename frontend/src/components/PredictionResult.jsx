import React from 'react';

/**
 * PredictionResult Component
 * Displays the prediction results including popularity score and confidence
 */
const PredictionResult = ({ prediction, modelStats }) => {
  if (!prediction) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Prediction Results</h2>
        <div className="text-center py-12">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="mt-4 text-gray-500">
            Enter song features and click "Predict Popularity" to see results
          </p>
        </div>
      </div>
    );
  }

  // Determine color based on popularity score
  const getPopularityColor = (score) => {
    if (score >= 80) return 'text-green-600';    // Hit Potential
    if (score >= 60) return 'text-lime-600';     // High Popularity
    if (score >= 30) return 'text-yellow-600';   // Moderate Appeal
    return 'text-red-600';                      // Niche Appeal
  };

  // Determine background color for confidence badge
  const getConfidenceBadgeColor = (level) => {
    switch (level) {
      case 'High':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate popularity percentage for progress bar
  const popularityPercentage = Math.min(100, Math.max(0, prediction.popularity));

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Prediction Results</h2>

      {/* Main Prediction Display */}
      <div className="text-center mb-8">
        <div className="inline-block">
          <div className="text-sm text-gray-500 mb-2">Predicted Popularity Score</div>
          <div className={`text-6xl font-bold ${getPopularityColor(prediction.popularity)}`}>
            {prediction.popularity}
          </div>
          <div className="text-sm text-gray-500 mt-2">out of 100</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div
            className="h-4 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-500"
            style={{ width: `${popularityPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Conditionally render the confidence section */}
      <div className={`grid grid-cols-1 ${prediction.confidence ? 'md:grid-cols-2' : ''} gap-4 mb-6`}>
        {prediction.confidence && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Confidence Level</div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-semibold text-gray-800">
                {prediction.confidence.toFixed(1)}%
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getConfidenceBadgeColor(
                  prediction.confidenceLevel
                )}`}
              >
                {prediction.confidenceLevel}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 mb-6">
          {/* The confidence section can be added back here later if needed */}

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Popularity Category</div>
            <div className="text-2xl font-semibold text-gray-800">
              {(() => {
                if (prediction.popularity >= 80) return 'Hit Potential';
                if (prediction.popularity >= 60) return 'High Popularity';
                if (prediction.popularity >= 30) return 'Moderate Appeal';
                return 'Niche Appeal';
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Model Statistics */}
      {modelStats && (
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Model Performance</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">R² Score</div>
              <div className="text-lg font-semibold text-gray-800">
                {modelStats.r2.toFixed(3)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">RMSE</div>
              <div className="text-lg font-semibold text-gray-800">
                {modelStats.rmse.toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">MAE</div>
              <div className="text-lg font-semibold text-gray-800">
                {modelStats.mae.toFixed(2)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Training Size</div>
              <div className="text-lg font-semibold text-gray-800">
                {modelStats.trainingSize.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interpretation Guide */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">
          💡 How to Interpret
        </h4>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>
            <strong>0-30:</strong> Niche or underground appeal - may be experimental or genre-specific
          </li>
          <li>
            <strong>30-59:</strong> Moderate popularity - solid fanbase potential
          </li>
          <li>
            <strong>60-79:</strong> High popularity - strong mainstream appeal
          </li>
          <li>
            <strong>80-100:</strong> Hit potential - likely to chart and gain widespread attention
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PredictionResult;
