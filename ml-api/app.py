from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import traceback

# 1. Initialize the Flask Application
app = Flask(__name__)

# 2. Load BOTH the model and the scaler at startup
try:
    model = joblib.load('song_popularity_model.pkl')
    scaler = joblib.load('robust_scaler.pkl') # <-- LOAD THE SCALER
    print("Model and scaler loaded successfully!")
except Exception as e:
    print(f"Error loading model or scaler: {e}")
    model = None
    scaler = None

# --- API ENDPOINTS ---

@app.route("/")
def home():
    return "<h1>Song Popularity ML API</h1><p>Use the /predict endpoint to get a rating.</p>"

@app.route('/predict', methods=['POST'])
def predict():
    if not model or not scaler:
        return jsonify({"error": "Model or scaler is not loaded properly."}), 500

    try:
        json_data = request.get_json()
        features_df = pd.DataFrame(json_data, index=[0])

        # --- START OF MANUAL PREPROCESSING ---
        
        # 1. Apply Log Transformations
        for col in ['song_duration_ms', 'liveness']:
            features_df[col] = np.log(features_df[col] + 1e-9)
        features_df['speechiness'] = np.log1p(features_df['speechiness'])

        # 2. Create 'is_instrumental' and drop original
        features_df['is_instrumental'] = (features_df['instrumentalness'] > 0.5).astype(int)
        features_df.drop('instrumentalness', axis=1, inplace=True)

        # 3. One-Hot Encode 'key' and 'time_signature'
        for i in range(1, 12):
            features_df[f'key_{i}'] = 1 if features_df['key'][0] == i else 0
        for i in [3, 4, 5]:
            features_df[f'time_signature_{i}'] = 1 if features_df['time_signature'][0] == i else 0
        features_df.drop(['key', 'time_signature'], axis=1, inplace=True)

        # 4. Ensure column order before scaling
        pre_scaling_order = [
            'song_duration_ms', 'acousticness', 'danceability', 'energy', 
            'liveness', 'loudness', 'audio_mode', 'speechiness', 'tempo',
            'audio_valence', 'is_instrumental', 'key_1', 'key_2', 'key_3',
            'key_4', 'key_5', 'key_6', 'key_7', 'key_8', 'key_9', 'key_10',
            'key_11', 'time_signature_3', 'time_signature_4', 'time_signature_5'
        ]
        features_reordered = features_df.reindex(columns=pre_scaling_order, fill_value=0)

        # 5. Apply the external Robust Scaler
        cols_to_scale = [
            'song_duration_ms', 'acousticness', 'danceability', 'energy', 
            'liveness', 'loudness', 'speechiness', 'tempo', 'audio_valence'
        ]
        features_reordered[cols_to_scale] = scaler.transform(features_reordered[cols_to_scale])

        # --- END OF PREPROCESSING ---

        # The model pipeline still expects the pre-scaled data
        prediction = model.predict(features_reordered)
        predicted_rating = prediction[0]
        
        final_prediction = max(0, min(100, predicted_rating))

        return jsonify({
            "predicted_rating": round(final_prediction, 2)
        })

    except Exception as e:
        print(traceback.format_exc())
        return jsonify({
            "error": "An error occurred during prediction.",
            "details": str(e)
        }), 400

@app.route('/stats', methods=['GET'])
def get_stats():
    # PASTE THE JSON output from your notebook here
    stats = {
        "r2": 0.04514072930611879,
        "rmse": 19.95594367698313,
        "mae": 15.689354955538354,
        "mse": 398.23968803892285,
        "trainingSize": 10774,
        "testSize": 2237,
        "features": 13,
        "lastTrained": "2025-11-16T17:46:52.065784Z",
        "featureImportance": [
            {
                "feature": "Loudness",
                "importance": 0.2783
            },
            {
                "feature": "Acousticness",
                "importance": 0.1919
            },
            {
                "feature": "Energy",
                "importance": 0.1599
            },
            {
                "feature": "Audio",
                "importance": 0.13
            },
            {
                "feature": "Danceability",
                "importance": 0.0748
            },
            {
                "feature": "Is",
                "importance": 0.0544
            },
            {
                "feature": "Song",
                "importance": 0.0404
            },
            {
                "feature": "Speechiness",
                "importance": 0.0393
            },
            {
                "feature": "Liveness",
                "importance": 0.0223
            },
            {
                "feature": "Tempo",
                "importance": 0.0079
            },
            {
                "feature": "Key",
                "importance": 0.0008
            }
        ]
    }

    return jsonify(stats)

if __name__ == '__main__':
    app.run(debug=True, port=5000)