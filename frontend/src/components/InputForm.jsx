import React, { useState } from 'react';
import { getDefaultFeatures, validateFeatures } from '../utils/validation';
import InfoModal from './InfoModal'; // Import the modal component

/**
 * InputForm Component
 * Provides input fields for all 13 song features and contextual info modals.
 */
const InputForm = ({ onSubmit, isLoading }) => {
  const [features, setFeatures] = useState(getDefaultFeatures());
  const [errors, setErrors] = useState([]);

  // State for handling the modal pop-up
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChart, setCurrentChart] = useState({ title: '', imageUrl: '' });

  // Functions to open and close the modal
  const openModal = (featureName, featureLabel) => {
    setCurrentChart({
      title: `Distribution of ${featureLabel}`,
      imageUrl: `/dist_charts/dist_${featureName}.png` // Assumes images are named like 'dist_danceability.png'
    });
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  // Feature configurations for rendering the form fields
  const featureConfigs = [
    { name: 'song_duration_ms', label: 'Song Duration (ms)', type: 'number', min: 0, max: 600000, step: 1000, description: '0 - 600,000 ms (0-10 minutes)' },
    { name: 'acousticness', label: 'Acousticness', type: 'slider', min: 0, max: 1, step: 0.01, description: '0 (not acoustic) - 1 (very acoustic)' },
    { name: 'danceability', label: 'Danceability', type: 'slider', min: 0, max: 1, step: 0.01, description: '0 (not danceable) - 1 (very danceable)' },
    { name: 'energy', label: 'Energy', type: 'slider', min: 0, max: 1, step: 0.01, description: '0 (low energy) - 1 (high energy)' },
    { name: 'instrumentalness', label: 'Instrumentalness', type: 'slider', min: 0, max: 1, step: 0.01, description: '0 (vocals) - 1 (instrumental)' },
    { name: 'key', label: 'Key', type: 'number', min: 0, max: 11, step: 1, description: '0-11 (C, C#, D, ...)' },
    { name: 'liveness', label: 'Liveness', type: 'slider', min: 0, max: 1, step: 0.01, description: '0 (studio) - 1 (live performance)' },
    { name: 'loudness', label: 'Loudness (dB)', type: 'slider', min: -60, max: 0, step: 0.5, description: '-60 to 0 dB' },
    { name: 'audio_mode', label: 'Audio Mode', type: 'select', options: [{ value: 0, label: 'Minor (0)' }, { value: 1, label: 'Major (1)' }], description: 'Major or Minor modality' },
    { name: 'speechiness', label: 'Speechiness', type: 'slider', min: 0, max: 1, step: 0.01, description: '0 (no speech) - 1 (speech-like)' },
    { name: 'tempo', label: 'Tempo (BPM)', type: 'number', min: 0, max: 250, step: 1, description: '0-250 beats per minute' },
    { name: 'time_signature', label: 'Time Signature', type: 'number', min: 3, max: 5, step: 1, description: '3-7 beats per bar' },
    { name: 'audio_valence', label: 'Valence', type: 'slider', min: 0, max: 1, step: 0.01, description: '0 (sad/negative) - 1 (happy/positive)' }
  ];

  // Handle input changes
  const handleChange = (name, value) => {
    setFeatures(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
    if (errors.length > 0) {
      setErrors([]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validateFeatures(features);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    setErrors([]);
    onSubmit(features);
  };

  // Reset form to default values
  const handleReset = () => {
    setFeatures(getDefaultFeatures());
    setErrors([]);
  };

  return (
    <>
      <InfoModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        title={currentChart.title}
        imageUrl={currentChart.imageUrl}
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Song Features</h2>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            Reset to Defaults
          </button>
        </div>

        {errors.length > 0 && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</h3>
            <ul className="list-disc list-inside text-sm text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureConfigs.map((config) => (
              <div key={config.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium text-gray-700">
                    {config.label}
                  </label>
                  <button 
                    type="button" 
                    onClick={() => openModal(config.name, config.label)}
                    className="text-gray-400 hover:text-blue-600"
                    title={`View distribution chart for ${config.label}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </button>
                </div>
                
                {config.type === 'slider' ? (
                  <div className="space-y-1">
                    <input
                      type="range"
                      min={config.min}
                      max={config.max}
                      step={config.step}
                      value={features[config.name]}
                      onChange={(e) => handleChange(config.name, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{config.min}</span>
                      <span className="font-semibold text-gray-700">
                        {features[config.name].toFixed(2)}
                      </span>
                      <span>{config.max}</span>
                    </div>
                  </div>
                ) : config.type === 'select' ? (
                  <select
                    value={features[config.name]}
                    onChange={(e) => handleChange(config.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {config.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="number"
                    min={config.min}
                    max={config.max}
                    step={config.step}
                    value={features[config.name]}
                    onChange={(e) => handleChange(config.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                )}
                
                <p className="text-xs text-gray-500">{config.description}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full px-6 py-3 text-white font-semibold rounded-lg transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Predicting...
                </span>
              ) : (
                'Predict Popularity'
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InputForm;