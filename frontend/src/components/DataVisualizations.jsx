import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { generateColorPalette } from '../utils/chartUtils';

/**
 * DataVisualizations Component
 * Displays various charts showing trends and feature importance
 */
const DataVisualizations = ({ trendData }) => {
  if (!trendData) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Visualizations</h2>
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
              d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            />
          </svg>
          <p className="mt-4 text-gray-500">Loading visualizations...</p>
        </div>
      </div>
    );
  }

  const colors = generateColorPalette(10);

  return (
    <div className="space-y-6">
      {/* Feature Trends Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Feature Impact Analysis</h2>

        {/* Energy vs Popularity */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Energy vs Popularity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="energy"
                type="number"
                domain={[0, 1]}
                name="Energy"
                label={{ value: 'Energy', position: 'insideBottom', offset: -10 }}
              />
              <YAxis
                dataKey="popularity"
                type="number"
                name="Popularity"
                label={{ value: 'Popularity', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                cursor={{ strokeDasharray: '3 3' }}
                formatter={(value, name) => {
                  if (name === 'energy') return value.toFixed(2);
                  return value.toFixed(1);
                }}
              />
              <Legend />
              <Scatter
                name="Songs"
                data={trendData.energyVsPopularity}
                fill={colors[0]}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Danceability vs Popularity */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Danceability vs Popularity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trendData.danceabilityVsPopularity}
              margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="danceability"
                label={{ value: 'Danceability', position: 'insideBottom', offset: -10 }}
              />
              <YAxis
                label={{ value: 'Popularity', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'danceability') return value.toFixed(2);
                  return value.toFixed(1);
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="popularity"
                stroke={colors[1]}
                strokeWidth={2}
                dot={{ fill: colors[1], r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Valence vs Popularity */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Valence (Positivity) vs Popularity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trendData.valenceVsPopularity}
              margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="valence"
                label={{ value: 'Valence (Musical Positivity)', position: 'insideBottom', offset: -10 }}
              />
              <YAxis
                label={{ value: 'Popularity', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                formatter={(value, name) => {
                  if (name === 'valence') return value.toFixed(2);
                  return value.toFixed(1);
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="popularity"
                stroke={colors[2]}
                strokeWidth={2}
                dot={{ fill: colors[2], r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Feature Importance Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Feature Importance</h2>
        <p className="text-sm text-gray-600 mb-4">
          Relative importance of each feature in predicting song popularity
        </p>
        
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={trendData.featureImportance}
            layout="vertical"
            margin={{ top: 20, right: 30, bottom: 20, left: 100 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              domain={[0, 0.3]}
              label={{ value: 'Importance Score', position: 'insideBottom', offset: -10 }}
            />
            <YAxis
              type="category"
              dataKey="feature"
            />
            <Tooltip
              formatter={(value) => value.toFixed(3)}
            />
            <Bar dataKey="importance" radius={[0, 8, 8, 0]}>
              {trendData.featureImportance.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Feature Importance Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {trendData.featureImportance.slice(0, 6).map((item, index) => (
            <div
              key={item.feature}
              className="flex items-center space-x-2 text-sm"
            >
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-gray-700">
                {item.feature}: <strong>{(item.importance * 100).toFixed(1)}%</strong>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg shadow-md p-6 border border-purple-200">
        <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Key Insights</h2>
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-bold">✓</span>
            <p>
              <strong>Danceability</strong> shows the strongest correlation with popularity,
              suggesting that danceable songs tend to perform better.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-bold">✓</span>
            <p>
              <strong>Energy</strong> is the second most important feature, indicating that
              energetic tracks are more likely to gain popularity.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-green-600 font-bold">✓</span>
            <p>
              <strong>Valence</strong> (musical positivity) also plays a significant role,
              with more positive songs generally performing better.
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-blue-600 font-bold">ℹ</span>
            <p>
              The model achieves an R² score of ~0.72, meaning it explains about 72% of the
              variance in song popularity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataVisualizations;
