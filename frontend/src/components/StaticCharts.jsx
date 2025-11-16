import React from 'react';

const StaticCharts = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Feature Correlation Analysis</h2>
      <p className="text-gray-600 mb-6">
        This chart shows the absolute linear correlation of each raw feature with song popularity. A higher bar indicates a stronger relationship, but it does not capture the more complex, non-linear patterns the final model learned.
      </p>

      {/* Section for the new Correlation Bar Chart */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Absolute Feature Correlation with Target</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-4">
          <img 
            src="/feature_correlation.png" 
            alt="Bar chart showing the absolute correlation of each feature with song popularity"
            className="min-w-[800px] w-full"
          />
        </div>
      </div>

       <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-blue-800 mb-2">
            💡 Key Takeaway
          </h4>
          <p className="text-sm text-blue-700">
            As shown in the chart, the raw features like `is_instrumental`, `danceability`, and `loudness` have the strongest direct correlation with popularity. However, all correlations are very weak (less than 0.1), which confirms that a simple linear model would not be effective. This is why a more complex Polynomial model was necessary to find predictive patterns.
          </p>
        </div>
    </div>
  );
};

export default StaticCharts;