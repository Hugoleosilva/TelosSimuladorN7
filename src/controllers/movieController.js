import Movie from '../models/Movie.js'; // Importa o Schema que você criou 

// GET /movies - Listar todos os filmes do banco 
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); // Aguarda a busca no MongoDB 
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar filmes", error: error.message });
    }
};

// POST /movies - Salvar novo filme no banco 
export const createMovie = async (req, res) => {
    try {
        const newMovie = new Movie(req.body); // Cria o documento baseado no Schema 
        await newMovie.save(); // Salva permanentemente no MongoDB 
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(400).json({ message: "Erro ao salvar filme", error: error.message });
    }
};

// GET /movies/:id - Listar um filme específico por ID 
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id); // Busca via ID do MongoDB 
        if (!movie) return res.status(404).json({ message: "Filme não encontrado" });
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ message: "ID inválido ou erro na busca", error: error.message });
    }
};

// PUT /movies/:id - Atualizar o documento ID no banco [cite: 32]
export const updateMovie = async (req, res) => {
    try {
        // findByIdAndUpdate busca e atualiza em um único passo no MongoDB [cite: 32]
        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } // Retorna o filme já com as alterações
        );
        if (!updatedMovie) return res.status(404).json({ message: "Filme não encontrado" });
        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(400).json({ message: "Erro ao atualizar", error: error.message });
    }
};

// DELETE /movies/:id - Remover via ID do MongoDB [cite: 34]
export const deleteMovie = async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) return res.status(404).json({ message: "Filme não encontrado" });
        res.status(204).send(); // Sucesso sem conteúdo [cite: 34]
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar", error: error.message });
    }
};