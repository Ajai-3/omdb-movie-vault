import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movie.routes';
import { errorHandler } from './middleware/errorHandler';
import { ROUTES } from './constants/routes';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/health', (req, res) => {
  res.send('Healthy');
});

app.use(ROUTES.BASE, movieRoutes);

app.use(errorHandler);

export default app;
