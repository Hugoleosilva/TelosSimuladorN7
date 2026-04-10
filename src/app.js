import express from 'express';
import cors from 'cors';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import movieRoutes from './routes/movieRoutes.js';

const swaggerFile = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

const app = express();

app.use(cors());
app.use(express.json());

// 1. Rota principal redirecionando para o Swagger
app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

// 2. Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// 3. Rotas da API
app.use(movieRoutes);

export default app;