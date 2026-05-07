import express from 'express';
import { 
    getAllMovies, 
    createMovie, 
    getMovieById, 
    updateMovie, 
    deleteMovie 
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getAllMovies); // Listar todos 
router.post('/', createMovie); // Salvar novo 
router.get('/:id', getMovieById); // Listar por ID 
router.put('/:id', updateMovie); // Atualizar por ID 
router.delete('/:id', deleteMovie); // Remover por ID 

export default router;