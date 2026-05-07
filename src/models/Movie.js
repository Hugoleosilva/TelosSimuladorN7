import mongoose from 'mongoose';

// Definindo o Schema conforme os campos do catálogo
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    year: { type: Number, required: true },
    genres: { type: [String], required: true },
    image: { type: String, required: true },
    video: { type: String, required: true }
}, { 
    timestamps: true // Adiciona automaticamente createdAt e updatedAt
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;