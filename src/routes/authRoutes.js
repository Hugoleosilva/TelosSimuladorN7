import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// Rota: POST http://localhost:3000/auth/login
router.post('/login', login);

export default router;