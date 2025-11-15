from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np  # <-- ADD THIS IMPORT
import traceback

# 1. Initialize the Flask Application
app = Flask(__name__)

# 2. Load the trained model ONCE at startup
try:
    model = joblib.load('song_popularity_model.pkl')
    print("Model loaded successfully!")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# --- API ENDPOINTS ---

@app.route("/")
def home():
    return "<h1>Song Popularity ML API</h1><p>Use the /predict endpoint to get a rating.</p>"

# 3. Define the Prediction Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({"error": "Model is not loaded properly."}), 500

    try:
        json_data = request.get_json()
        features_df = pd.DataFrame(json_data, index=[0])

        # --- START OF FULL PREPROCESSING LOGIC ---
        
        # 1. Apply Log Transformations (THE MISSING STEP)
        for col in ['song_duration_ms', 'liveness', 'acousticness']:
            # Add a small constant to avoid log(0) if input is 0
            features_df[col] = np.log(features_df[col] + 1e-9) 
        
        features_df['speechiness'] = np.log1p(features_df['speechiness'])

        # 2. Replicate 'is_instrumental' feature creation
        features_df['is_instrumental'] = (features_df['instrumentalness'] > 0.5).astype(int)
        features_df.drop('instrumentalness', axis=1, inplace=True)

        # 3. Replicate One-Hot Encoding for 'key' and 'time_signature'
        for i in range(1, 12):
            features_df[f'key_{i}'] = 1 if features_df['key'][0] == i else 0
        for i in [3, 4, 5]:
            features_df[f'time_signature_{i}'] = 1 if features_df['time_signature'][0] == i else 0

        # 4. Drop the original categorical columns
        features_df.drop(['key', 'time_signature'], axis=1, inplace=True)

        # 5. Ensure the final column order matches the model's training data
        final_feature_order = [
            'song_duration_ms', 'acousticness', 'danceability', 'energy', 
            'liveness', 'loudness', 'audio_mode', 'speechiness', 'tempo',
            'audio_valence', 'is_instrumental', 'key_1', 'key_2', 'key_3',
            'key_4', 'key_5', 'key_6', 'key_7', 'key_8', 'key_9', 'key_10',
            'key_11', 'time_signature_3', 'time_signature_4', 'time_signature_5'
        ]
        
        features_final = features_df.reindex(columns=final_feature_order, fill_value=0)

        # --- END OF FULL PREPROCESSING LOGIC ---

        # The model pipeline will handle the scaling and polynomial features automatically
        prediction = model.predict(features_final)
        predicted_rating = prediction[0]

        return jsonify({
            "predicted_rating": round(predicted_rating, 2)
        })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({
            "error": "An error occurred during prediction.",
            "details": str(e)
        }), 400

# 4. Define the Statistics Endpoint
@app.route('/stats', methods=['GET'])
def get_stats():
    # Replace these placeholder values with the actual stats from your model training
    stats = {
        "r2": 0.04319520061687987,
        "rmse": 19.976263480023103,
        "mae": 15.713992263208237,
        "mse": 399.05110262330476,
        "trainingSize": 10774,
        "testSize": 2237,
        "features": 13,
        "lastTrained": "2025-11-15T17:35:46.384901Z",
        "featureImportance": [
            {
                "feature": "Loudness",
                "importance": 0.339
            },
            {
                "feature": "Audio",
                "importance": 0.1638
            },
            {
                "feature": "Energy",
                "importance": 0.1135
            },
            {
                "feature": "Danceability",
                "importance": 0.097
            },
            {
                "feature": "Acousticness",
                "importance": 0.0821
            },
            {
                "feature": "Is",
                "importance": 0.0606
            },
            {
                "feature": "Speechiness",
                "importance": 0.0556
            },
            {
                "feature": "Song",
                "importance": 0.0519
            },
            {
                "feature": "Liveness",
                "importance": 0.0249
            },
            {
                "feature": "Tempo",
                "importance": 0.0089
            },
            {
                "feature": "Key",
                "importance": 0.0024
            },
            {
                "feature": "Time",
                "importance": 0.0004
            }
        ]
    }
    return jsonify(stats)

# (You can add other endpoints like /performance here if needed)

# 5. Run the Application
if __name__ == '__main__':
    # The default port is 5000, which matches your Node.js backend's .env file
    app.run(debug=True, port=5000)