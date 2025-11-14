const supabase = require('../config/supabase.config');

class SupabaseModel {
    /**
     * Fetches all songs from the database for visualization purposes.
     * NOTE: This is a placeholder. You will need to create a 'songs' table
     * in Supabase and adjust the query as needed.
     * @returns {Promise<Array>} A list of songs.
     */
    async getAllSongsForViz() {
        // In a real application, you would probably select specific columns
        // and add pagination for performance.
        const { data, error } = await supabase
            .from('songs') // Assuming you have a table named 'songs'
            .select('song_name, song_popularity, danceability, energy, acousticness'); // Select a few key columns

        if (error) {
            // Throw the error so the controller can catch it
            throw error;
        }

        return data || [];
    }
}

module.exports = new SupabaseModel();