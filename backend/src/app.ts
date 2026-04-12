import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import movieRoutes from './routes/movie.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { ROUTES } from './constants/routes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }),
);

app.use('/health', (req, res) => {
  res.send('Healthy');
});

app.use(ROUTES.BASE, movieRoutes);

app.use(errorHandler);

export default app;
