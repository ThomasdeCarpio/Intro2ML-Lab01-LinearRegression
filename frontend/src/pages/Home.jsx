import React, { useState, useEffect } from 'react';
import InputForm from '../components/InputForm';
import PredictionResult from '../components/PredictionResult';
import DataVisualizations from '../components/DataVisualizations';
import { predictSongPopularity, getModelStats, getExampleTrends } from '../api/predictionApi';

/**
 * Home Page Component
 * Main dashboard that combines all components
 */
const Home = () => {
  const [prediction, setPrediction] = useState(null);
  const [modelStats, setModelStats] = useState(null);
  const [trendData, setTrendData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load model stats and trend data on component mount
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [statsResponse, trendsResponse] = await Promise.all([
          getModelStats(),
          getExampleTrends()
        ]);

        if (statsResponse.success) {
          setModelStats(statsResponse.stats);
        }

        if (trendsResponse.success) {
          setTrendData(trendsResponse.trends);
        }
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Failed to load model data. Please refresh the page.');
      }
    };

    loadInitialData();
  }, []);

  // Handle prediction submission
  const handlePrediction = async (features) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await predictSongPopularity(features);

      if (response.success) {
        setPrediction(response.prediction);
        
        // Scroll to results
        setTimeout(() => {
          const resultsElement = document.getElementById('prediction-results');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        setError('Prediction failed. Please try again.');
      }
    } catch (err) {
      console.error('Error making prediction:', err);
      setError('An error occurred while making the prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl md:text-4xl font-bold">🎵 Song Popularity Predictor</h1>
          <p className="mt-2 text-blue-100">
            AI-powered regression model to predict song popularity based on audio features
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg
                className="h-5 w-5 text-red-400 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-1">
            <InputForm onSubmit={handlePrediction} isLoading={isLoading} />
          </div>

          {/* Right Column - Results and Visualizations */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prediction Results */}
            <div id="prediction-results">
              <PredictionResult prediction={prediction} modelStats={modelStats} />
            </div>

            {/* Data Visualizations */}
            <DataVisualizations trendData={trendData} />
          </div>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Tool</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">How It Works</h3>
              <p className="mb-2">
                This tool uses a linear regression model trained on thousands of songs to
                predict popularity based on 13 audio features provided by Spotify's API.
              </p>
              <p>
                The model analyzes characteristics like danceability, energy, valence, and
                more to estimate how popular a song might become.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Key Features</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Real-time popularity prediction</li>
                <li>Confidence score for each prediction</li>
                <li>Visual analysis of feature impacts</li>
                <li>Feature importance rankings</li>
                <li>Model performance metrics (R², RMSE, MAE)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Audio Features Explained</h3>
              <ul className="space-y-1 text-xs">
                <li><strong>Danceability:</strong> How suitable for dancing (rhythm, tempo, beat)</li>
                <li><strong>Energy:</strong> Intensity and activity measure</li>
                <li><strong>Valence:</strong> Musical positiveness (happy vs sad)</li>
                <li><strong>Acousticness:</strong> Likelihood of being acoustic</li>
                <li><strong>Instrumentalness:</strong> Predicts if track contains no vocals</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Model Performance</h3>
              <p className="mb-2">
                The regression model has been evaluated on a test dataset with the
                following metrics:
              </p>
              <ul className="space-y-1 text-xs">
                <li><strong>R² Score:</strong> ~0.72 (72% variance explained)</li>
                <li><strong>RMSE:</strong> ~12.5 popularity points</li>
                <li><strong>MAE:</strong> ~9.8 popularity points</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm">
            Song Popularity Predictor | Built with React, Vite, and Recharts
          </p>
          <p className="text-xs mt-2 text-gray-400">
            Demo project for machine learning regression model visualization
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
