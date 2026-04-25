import cors from 'cors';
import express from 'express';
import { env } from '@/config/env';
import { ROUTES } from '@/constants/routes';
import movieRoutes from '@/routes/movie.routes';
import { errorHandler } from '@/middleware/errorHandler';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: env.frontend_url,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  }),
);

app.use(ROUTES.HEALTH, (req, res) => {
  res.send('Server is Healthy...😊');
});

app.use(ROUTES.BASE, movieRoutes);

app.use(errorHandler);

export default app;
