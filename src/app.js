import express from 'express';
import fs from 'fs';
import swaggerUi from 'swagger-ui-express';
import movieRoutes from './routes/movieRoutes.js';

// Lendo o arquivo JSON do Swagger
const swaggerFile = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

const app = express();
app.use(express.json());

// Documentação
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Rotas
app.use(movieRoutes);

export default app;