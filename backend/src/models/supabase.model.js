const supabase = require('../config/supabase.config');

class SupabaseModel {
    /**
     * Fetches key columns from all songs for chart visualizations.
     */
    async getSongsForTrends() {
        const { data, error } = await supabase
            .from('songs')
            .select('song_popularity, danceability, energy, audio_valence');

        if (error) throw error;
        return data || [];
    }

    /**
     * Inserts a new prediction record into the 'predictions' table.
     * @param {object} predictionData - The prediction data to log.
     */
    async createPredictionLog(predictionData) {
        const { data, error } = await supabase
            .from('predictions')
            .insert([predictionData]);
            
        if (error) throw error;
        return data;
    }

    /**
     * Fetches a paginated history of predictions.
     */
    async getPredictionHistory(limit = 30) {
        const { data, error } = await supabase
            .from('predictions')
            .select('created_at, predicted_rating, features_used')
            .order('created_at', { ascending: false })
            .limit(limit);
            
        if (error) throw error;
        return data || [];
    }

    /**
     * Calls a database function to calculate distribution statistics for key features.
     */
    async getFeatureDistribution() {
        // This method calls an RPC function for efficiency.
        const { data, error } = await supabase.rpc('get_feature_distribution');

        if (error) throw error;
        // The RPC returns an array with one object, so we return the first element.
        return data[0];
    }
}

module.exports = new SupabaseModel();