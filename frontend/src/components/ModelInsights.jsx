import React from 'react';

const ModelInsights = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Deeper Model Insights</h2>
      <p className="text-gray-600 mb-6">
        While individual features show weak correlations, the model's power comes from understanding non-linear trends and how features interact with each other. Here are the most influential factors identified by the trained Polynomial model.
      </p>

      {/* Section for Top Features Chart */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Top Influential Features (from Lasso Polynomial Model)</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <img 
            src="/top_features.png" 
            alt="Bar chart of the most important features from the Lasso Polynomial model"
            className="min-w-[800px] w-full"
          />
        </div>
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-700">
          <h4 className="font-semibold text-gray-800 mb-2">Key Observations:</h4>
          <ul className="list-disc list-inside space-y-1">
            <li>**Non-Linearity is Key:** Notice that squared terms like `is_instrumental^2` and `loudness^2` are highly important. This confirms that the relationships are not simple straight lines.</li>
            <li>**Feature Interactions:** Many top features are combinations (e.g., `song_duration_ms` interacting with `is_instrumental`). This shows the model learns from how features work *together*.</li>
            <li>**Original Features Still Matter:** While combinations are important, the original `loudness`, `audio_valence`, and `danceability` features are still in the top 5, showing they have a strong independent influence.</li>
          </ul>
        </div>
      </div>

      {/* Section for Partial Dependence Plots */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">How Top Features Influence Popularity</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <img 
            src="/partial_dependence_plots.png" 
            alt="Partial dependence plots for top 4 features"
            className="min-w-[800px] w-full"
          />
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">1. Instrumentalness (Linear Trend)</h4>
                <p className="text-blue-700">As `is_instrumental` goes from 0 (vocals present) to 1 (no vocals), the predicted popularity drops significantly. **Conclusion:** Songs with vocals are much more likely to be popular.</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">2. Loudness (Non-Linear Trend)</h4>
                <p className="text-green-700">As a song gets louder (loudness increases), its predicted popularity rises sharply. The relationship is curved, suggesting the biggest gains happen as songs move from quiet to moderately loud.</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-semibold text-red-800 mb-2">3. Audio Valence (Non-Linear Trend)</h4>
                <p className="text-red-700">Interestingly, as a song becomes happier/more positive (valence increases), its predicted popularity tends to decrease slightly. **Conclusion:** The model learned that slightly less "happy" or more emotionally complex songs have a slight edge in popularity.</p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">4. Danceability (Linear Trend)</h4>
                <p className="text-purple-700">As `danceability` increases, the predicted popularity also trends upward. **Conclusion:** Songs that are easier to dance to are generally predicted to be more popular.</p>
            </div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-300 rounded-lg p-6">
        <h3 className="text-lg font-bold text-yellow-800 mb-2">Overall Conclusion</h3>
        <p className="text-yellow-700">
          The relationship between a song's features and its popularity is highly complex. The model's predictive power does not come from any single feature, but from understanding the **combinations (interactions)** and **non-linear relationships (curves)** between them. This is why a simple linear model performs poorly, and a more complex Polynomial model was required to capture these subtle trends.
        </p>
      </div>

    </div>
  );
};

export default ModelInsights;