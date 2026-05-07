import express from 'express';
import { getAllMovies, createMovie, deleteMovie, updateMovie, getMovieById } from '../controllers/movieController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js'; // Importe o que acabamos de criar

const router = express.Router();

// Rota pública: qualquer um pode listar filmes
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

// ROTAS PROTEGIDAS: Note que o authMiddleware vem antes do controller
router.post('/', authMiddleware, createMovie); 
router.put('/:id', authMiddleware, updateMovie);
router.delete('/:id', authMiddleware, deleteMovie);

export default router;