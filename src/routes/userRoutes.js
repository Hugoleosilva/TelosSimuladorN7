import express from 'express';
import { 
    getAllUsers, 
    createUser, 
    getUserById 
} from '../controllers/userController.js';

const router = express.Router();

// Endpoints de Usuários (Persistência no MongoDB)
router.get('/', getAllUsers);      // Listar todos os usuários
router.post('/', createUser);      // Criar novo usuário (Sign-up)
router.get('/:id', getUserById);   // Buscar um usuário específico por ID

export default router;