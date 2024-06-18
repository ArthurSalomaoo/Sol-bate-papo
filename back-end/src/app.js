import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();

// Aplica o middleware do cors para todas as rotas
app.use(cors());

// Permite apenas a origem específica do seu frontend
// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

app.use(express.json());
app.use(routes);

export default app;