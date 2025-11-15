import React, { useState, useEffect } from 'react';
import InputForm from '../components/InputForm';
import PredictionResult from '../components/PredictionResult';
import StaticCharts from '../components/StaticCharts';
import ModelInsights from '../components/ModelInsights';
// Removed DataVisualizations import
import { predictSongPopularity, getModelStats } from '../api/predictionApi';

const Home = () => {
  const [prediction, setPrediction] = useState(null);
  const [modelStats, setModelStats] = useState(null);
  // Removed trendData state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simplified to only load model stats
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const statsResponse = await getModelStats();
        if (statsResponse.success) {
          setModelStats(statsResponse.stats);
        }
      } catch (err) {
        console.error('Error loading initial data:', err);
        setError('Failed to load model data. Please refresh the page.');
      }
    };
    loadInitialData();
  }, []);

  const handlePrediction = async (features) => {
    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const response = await predictSongPopularity(features);
      if (response.success) {
        // Simplified prediction object, no more confidence score
        const newPrediction = {
          popularity: response.data.predicted_rating,
        };
        setPrediction(newPrediction);
        
        setTimeout(() => {
          const resultsElement = document.getElementById('prediction-results');
          if (resultsElement) {
            resultsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);

      } else {
        setError(response.error || 'An unknown prediction error occurred.');
      }
    } catch (err) {
      console.error('Error making prediction:', err);
      const errorMessage = err.response?.data?.error || 'An error occurred. Please check the connection to the backend.';
      setError(errorMessage);
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
            {/* ... error svg and text ... */}
          </div>
        )}

        {/* SIMPLIFIED Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input Form */}
          <div>
            <InputForm onSubmit={handlePrediction} isLoading={isLoading} />
          </div>

          {/* Right Column - Results */}
          <div id="prediction-results">
            <PredictionResult prediction={prediction} modelStats={modelStats} />
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
                <li>Visual analysis of feature impacts</li>
                <li>Feature importance rankings</li>
                <li>Model performance metrics (R², RMSE, MAE)</li>
              </ul>
            </div>
          </div>
        </div>

        <StaticCharts />
        <ModelInsights />
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