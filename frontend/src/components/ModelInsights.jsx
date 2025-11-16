import React from 'react';

const ModelInsights = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Deeper Model Insights</h2>
      <p className="text-gray-600 mb-6">
        While individual features show weak correlations on their own, the model's power comes from understanding non-linear trends and how features interact. Here are the most influential factors identified by the trained model.
      </p>

      {/* Section for Top Features Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Top Influential Features (from Lasso Polynomial Model)</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <img 
            src="/top_features.png" 
            alt="Bar chart of the most important features"
            className="min-w-[800px] w-full"
          />
        </div>
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
          <h4 className="font-semibold text-gray-800 mb-2">Key Observations:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Non-Linearity is Key:</strong> Many of the most important features are squared terms (e.g., `loudness^2`) or interactions between features (e.g., `acousticness` and `audio_mode`).</li>
            <li><strong>Interactions Matter:</strong> The model's strength comes from learning how features work *together*, not just in isolation.</li>
            <li><strong>Core Features are Still Strong:</strong> A few original features like `loudness` and `is_instrumental` still have a very powerful influence on the prediction.</li>
          </ul>
        </div>
      </div>

      {/* Section for Partial Dependence Plots */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">How Top Features Influence Popularity</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          {/* Use the new image file */}
          <img 
            src="/partial_dependence_plots.png" 
            alt="Partial dependence plots for top 4 features"
            className="min-w-[800px] w-full"
          />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {/* NEW DESCRIPTIONS BASED ON THE AI TEAM'S ANALYSIS */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">1. Instrumentalness (Linear Trend)</h4>
                <p className="text-blue-700">As `is_instrumental` goes from 0 (vocals present) to 1 (no vocals), predicted popularity drops sharply. This suggests that songs with vocals are significantly more likely to be popular.</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">2. Loudness (Non-Linear Trend)</h4>
                <p className="text-green-700">As a song gets louder, its predicted popularity rises in a curve, similar to a logarithmic function. The biggest gains in popularity come from moving from quiet to moderately loud.</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">3. Energy (Non-Linear Parabolic Trend)</h4>
                <p className="text-purple-700">Popularity peaks at a moderate energy level. Songs with very low energy (boring) or extremely high energy (too intense for mainstream) are predicted to be less popular. This indicates a "sweet spot" for energy.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">4. Danceability (Linear Trend)</h4>
                <p className="text-red-700">As a song becomes easier to dance to, its predicted popularity consistently increases. The relationship is clearly linear and positive.</p>
            </div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-800 mb-2">Overall Conclusion</h3>
        <p className="text-yellow-700">
          The relationship between a song's features and its popularity is highly complex and does not follow simple linear rules. The model's predictive power comes not from individual features, but from understanding the combinations (interactions) and non-linear relationships (curves) between them.
        </p>
      </div>

    </div>
  );
};

export default ModelInsights;