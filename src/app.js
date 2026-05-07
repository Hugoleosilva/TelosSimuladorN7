import express from 'express';
import connectDB from './config/db.js';
import movieRoutes from './routes/movieRoutes.js';
import userRoutes from './routes/userRoutes.js'; // Importação das rotas de usuários
import swaggerUi from 'swagger-ui-express';
import { readFileSync } from 'fs';

// Carrega o arquivo do Swagger para documentação
const swaggerFile = JSON.parse(readFileSync('./swagger.json', 'utf8'));

const app = express();

// 1. Conecta ao Banco de Dados (Requisito #1 do Nível 8)
connectDB();

// 2. Middlewares
app.use(express.json()); // Permite que a API receba dados em formato JSON

// 3. Rotas da API (Endpoints de Persistência)
app.use('/movies', movieRoutes); // Prefixo para filmes
app.use('/users', userRoutes);   // Prefixo para usuários

// 4. Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 5. Inicialização do Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`- Documentação: http://localhost:${PORT}/api-docs`);
});

export default app;