import express from 'express';
import * as movieController from '../controllers/movieController.js';

const router = express.Router();

router.post('/movies', movieController.createMovie);         // Criar
router.get('/movies', movieController.getAllMovies);          // Listar
router.put('/movies/:id', movieController.updateMovie);       // Atualizar
router.delete('/movies/:id', movieController.deleteMovie);    // Deletar

export default router;