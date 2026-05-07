import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js'; // Importando a nova rota
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';

// 1. Carrega as variáveis de ambiente antes de tudo
dotenv.config();

// 2. Conecta ao Banco de Dados
connectDB();

// 3. Inicializa o APP (Isso deve vir ANTES de qualquer app.use)
const app = express();

// 4. Middlewares Globais
app.use(express.json());

// 5. Definição das Rotas
app.use('/auth', authRoutes);   // Rota de Login (Nível 9)
app.use('/movies', movieRoutes); 
app.use('/users', userRoutes);

// 6. Configuração do Swagger
const swaggerFile = JSON.parse(readFileSync('./swagger.json', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 7. Exporta o app para o server.js
export default app;