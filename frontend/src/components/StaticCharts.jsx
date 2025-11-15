import React from 'react';

const StaticCharts = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Feature Analysis Visualizations</h2>
      <p className="text-gray-600 mb-6">
        These charts show the relationship between different audio features and song popularity from the training dataset. This helps in understanding which factors are more influential.
      </p>

      {/* Section for Numerical Feature Charts */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Numerical Features vs. Popularity</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          {/* We link directly to the image in the public folder */}
          <img 
            src="/charts_numerical.png" 
            alt="Scatter plots of numerical features vs song popularity"
            className="min-w-[800px] w-full"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Scatter plots showing relationships for features like danceability, energy, and loudness.
        </p>
      </div>

      {/* Section for Categorical Feature Charts */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Categorical Features vs. Popularity</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <img 
            src="/charts_categorical.png" 
            alt="Box plots of categorical features vs song popularity"
            className="min-w-[800px] w-full"
          />
        </div>
         <p className="text-xs text-gray-500 mt-2 text-center">
          Box plots showing the distribution of popularity across different keys, modes, and time signatures.
        </p>
      </div>
       <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            💡 Key Takeaway
          </h4>
          <p className="text-sm text-blue-700">
            As seen in the charts, no single attribute appears to be a dominant predictor of song popularity on its own. The model's predictive power comes from learning the complex interplay between all of these features combined.
          </p>
        </div>
    </div>
  );
};

export default StaticCharts;