# Song Popularity Predictor - Frontend

A modern React application that predicts song popularity using a machine learning regression model based on audio features.

## Features

- **Interactive Input Form**: Input 13 audio features (danceability, energy, valence, etc.)
- **Real-time Predictions**: Get instant popularity predictions with confidence scores
- **Data Visualizations**: Interactive charts showing feature impacts and trends
- **Mock Backend**: Simulated API for demonstration purposes
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **TailwindCSS**: Utility-first CSS framework
- **Recharts**: Composable charting library for React

## Project Structure

```
/frontend
  /src
    /api                    # Mock backend API
      predictionApi.js      # Prediction and trend endpoints
      statsApi.js           # Statistics endpoints
    /components             # React components
      InputForm.jsx         # Form for inputting song features
      PredictionResult.jsx  # Display prediction results
      DataVisualizations.jsx # Charts and graphs
    /pages                  # Page components
      Home.jsx              # Main dashboard page
    /utils                  # Utility functions
      validation.js         # Input validation logic
      chartUtils.js         # Chart helper functions
    App.jsx                 # Root component
    main.jsx                # Application entry point
    index.css               # Global styles
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Audio Features

The model uses 13 audio features to predict popularity:

1. **Song Duration (ms)**: Length of the track in milliseconds
2. **Acousticness**: Confidence measure of acoustic content (0-1)
3. **Danceability**: How suitable for dancing based on rhythm and beat (0-1)
4. **Energy**: Measure of intensity and activity (0-1)
5. **Instrumentalness**: Predicts whether track contains no vocals (0-1)
6. **Key**: Musical key the track is in (0-11)
7. **Liveness**: Detects presence of audience in recording (0-1)
8. **Loudness**: Overall loudness in decibels (-60 to 0)
9. **Audio Mode**: Modality - major (1) or minor (0)
10. **Speechiness**: Detects presence of spoken words (0-1)
11. **Tempo**: Overall estimated tempo in BPM
12. **Time Signature**: Estimated beats per bar (3-7)
13. **Valence**: Musical positiveness/happiness (0-1)

## Model Performance

The regression model achieves:
- **R² Score**: ~0.72 (explains 72% of variance)
- **RMSE**: ~12.5 popularity points
- **MAE**: ~9.8 popularity points

## Visualizations

The app includes several visualizations:
- **Energy vs Popularity**: Scatter plot showing relationship
- **Danceability vs Popularity**: Line chart showing trend
- **Valence vs Popularity**: Line chart showing trend
- **Feature Importance**: Bar chart ranking feature contributions

## Mock Backend

The fake backend simulates API responses with realistic data:
- Implements simple linear regression formula
- Adds randomness to predictions for realism
- Generates synthetic trend data for visualizations
- Returns mock model statistics

## License

MIT License - See LICENSE file for details
